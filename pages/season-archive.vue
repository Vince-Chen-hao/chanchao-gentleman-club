<script setup lang="ts">
const medalSection = ref<HTMLElement | null>(null)
const dragonArrived = ref(false)
const dragonRun = ref(0)
const dragonRoaring = ref(false)
let dragonObserver: IntersectionObserver | undefined
let impactTimer: ReturnType<typeof setTimeout> | undefined
const startDragon = () => {
  dragonRoaring.value = false
  if (impactTimer) clearTimeout(impactTimer)
  dragonRun.value++
  dragonArrived.value = true
}
const onDragonRoar = () => {
  dragonRoaring.value = true
  impactTimer = setTimeout(() => { dragonRoaring.value = false }, 1300)
}

const categories = ['FG%', 'FT%', '3PTM', 'PTS', 'REB', 'AST', 'ST', 'BLK', 'TO']
const seasonFacts = [
  { label: '例行賽勝率王', value: '思得卓識博聞之士', detail: '103 勝 · 66 負 · 2 和｜勝率 .608' },
  { label: '換人最勤快', value: '卡店老闆獨自升級', detail: '整季累積 135 次球員異動' },
]
const seasonStandings = [
  { rank: 1, team: 'VICTOR🍋', record: '85–86–0', pct: '.497', moves: 126 },
  { rank: 2, team: '阿肥幹大事', record: '90–77–4', pct: '.538', moves: 124 },
  { rank: 3, team: 'Gyuumao', record: '95–75–1', pct: '.558', moves: 128 },
  { rank: 4, team: '思得卓識博聞之士', record: '103–66–2', pct: '.608', moves: 117 },
  { rank: 5, team: 'Jeffrey', record: '97–68–6', pct: '.585', moves: 86 },
  { rank: 6, team: 'Sean', record: '93–78–0', pct: '.544', moves: 79 },
  { rank: 7, team: 'CK', record: '82–86–3', pct: '.488', moves: 134 },
  { rank: 8, team: '卡店老闆獨自升級', record: '95–72–4', pct: '.567', moves: 135 },
  { rank: 9, team: 'Wintersoldiers', record: '73–94–4', pct: '.439', moves: 72 },
  { rank: 10, team: "Alan's Team", record: '70–96–5', pct: '.424', moves: 75 },
  { rank: 11, team: 'Jesse prince', record: '65–103–3', pct: '.389', moves: 92, legacy: true },
  { rank: 12, team: 'JT Clash league', record: '60–107–4', pct: '.363', moves: 82 },
]

const rosterMeta: Record<string, { slug: string, nick: string }> = {
  'VICTOR🍋': { slug: 'vic', nick: 'Vic' },
  '阿肥幹大事': { slug: 'vince', nick: 'Vince' },
  'Gyuumao': { slug: 'gyuumao', nick: '牛魔王' },
  '思得卓識博聞之士': { slug: 'leo', nick: '主委' },
  'Jeffrey': { slug: 'jeffrey', nick: 'Jeffery' },
  'Sean': { slug: 'sean', nick: '大叔' },
  'CK': { slug: 'ck', nick: 'CK' },
  '卡店老闆獨自升級': { slug: 'cardshop', nick: '卡店老闆' },
  'Wintersoldiers': { slug: 'li', nick: '李董' },
  "Alan's Team": { slug: 'alan', nick: 'Alan' },
  'Jesse prince': { slug: 'jesse', nick: 'Jesse' },
  'JT Clash league': { slug: 'cao', nick: '小曹' },
}
const rosterBadges: Record<number, string> = { 1: '冠軍', 2: '亞軍', 3: '季軍' }
const roster = [
  ...seasonStandings.map(entry => ({
    ...rosterMeta[entry.team]!,
    team: entry.team,
    no: String(entry.rank).padStart(2, '0'),
    tier: entry.rank <= 3 ? `top-${entry.rank}` : entry.legacy ? 'legacy' : '',
    badge: rosterBadges[entry.rank] || (entry.legacy ? '名人堂' : ''),
    stat: `${entry.record} · ${entry.pct}`,
  })),
  { slug: 'wei', nick: '阿瑋', team: "瑋's Nice Team", no: 'NEW', tier: 'rookie', badge: '新人上場', stat: '2026–27 新加入' },
]

const selectedWeek = ref('22')
const weeklyOptions = Array.from({ length: 22 }, (_, index) => {
  const week = index + 1
  const suffix = week === 17 ? ' · 明星週' : week >= 20 ? ' · 季後賽' : ''
  return { value: String(week), label: `WEEK ${week}${suffix}` }
})
const { data: weeklyData, pending: weeklyLoading, error: weeklyError } = await useFetch('/api/season-week', {
  query: { week: selectedWeek },
  watch: [selectedWeek],
})
const { data: medalTotals, pending: medalsLoading, error: medalsError } = useLazyFetch('/api/season-medals', { server: false })

onMounted(() => {
  dragonObserver = new IntersectionObserver(([entry]) => {
    if (entry?.isIntersecting) {
      if (!medalsLoading.value) { startDragon(); dragonObserver?.disconnect() }
    }
  }, { threshold: .12 })
  if (medalSection.value) dragonObserver.observe(medalSection.value)
})
onUnmounted(() => { dragonObserver?.disconnect(); if (impactTimer) clearTimeout(impactTimer) })
watch(medalsLoading, (loading) => {
  if (!loading && medalSection.value && !dragonArrived.value) {
    const rect = medalSection.value.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) { startDragon(); dragonObserver?.disconnect() }
  }
})

const valueToNumber = (value: unknown) => {
  if (typeof value === 'number') return value
  if (typeof value !== 'string' || value.includes('/') || value === '—') return null
  const parsed = Number(value.replace(/,/g, ''))
  return Number.isFinite(parsed) ? parsed : null
}
const statRank = (rowIndex: number, columnIndex: number) => {
  const header = weeklyData.value?.headers[columnIndex] || ''
  const ownValue = valueToNumber(weeklyData.value?.rows[rowIndex]?.[columnIndex])
  if (ownValue === null || !header || columnIndex < 3) return ''
  const values = (weeklyData.value?.rows || []).map(row => valueToNumber(row[columnIndex])).filter((value): value is number => value !== null)
  const ordered = [...new Set(values)].sort((a, b) => header.includes('TO') ? a - b : b - a)
  const place = ordered.indexOf(ownValue) + 1
  return place > 0 && place <= 3 ? `stat-place-${place}` : ''
}
const matchupState = (value: unknown) => {
  if (typeof value !== 'string' || !value.includes(':')) return ''
  const [won, lost] = value.split(':').map(Number)
  if (!Number.isFinite(won) || !Number.isFinite(lost) || won === lost) return 'match-draw'
  return won > lost ? 'match-win' : 'match-loss'
}
</script>

<template>
  <nav class="site-menu" aria-label="上季戰績頁面導覽">
    <div class="wrap site-menu-inner">
      <NuxtLink class="menu-brand" to="/" aria-label="回 Chanchao Gentleman Club 首頁"><img src="/cgc-logo.svg" alt="Chanchao Gentleman Club"><span>2026–27</span></NuxtLink>
      <div class="menu-links"><NuxtLink to="/">回首頁</NuxtLink><a href="#archive">上季戰績</a><a href="#weekly">每週資料</a></div>
    </div>
  </nav>
  <main id="archive" class="archive-page">
    <section class="archive wrap">
      <div class="archive-intro"><div><p class="eyebrow ink">2025–26 SEASON ARCHIVE</p><h2>上季戰績獨立頁</h2></div><p>把上季排名、每週數據與全盟對戰比較集中在這裡；首頁同樣保留原本內容。</p></div>
      <div class="archive-stats"><span><b>19</b> REGULAR WEEKS</span><span><b>3</b> PLAYOFF WEEKS</span><span><b>9</b> CATEGORIES</span></div>
      <div class="season-facts"><article v-for="fact in seasonFacts" :key="fact.label"><p>{{ fact.label }}</p><h3>{{ fact.value }}</h3><span>{{ fact.detail }}</span></article></div>
      <div class="season-track"><div class="regular"><small>WEEK 1</small><span>例行賽</span><small>WEEK 19</small></div><div class="playoffs"><span>季後賽</span><small>WEEK 20–22</small></div></div>
      <div class="category-row"><span v-for="category in categories" :key="category">{{ category }}</span></div>
      <div class="roster-band" aria-labelledby="roster-title">
        <div class="roster-head"><div><p class="eyebrow">2025–26 ROSTER</p><h3 id="roster-title">十三張帥臉，一間沒有社長的傑尼斯</h3></div><p>依上季最終名次排開，名人堂 Jesse 與新上場的阿瑋也在場；球衣背號就是你的名次。</p></div>
        <ul class="roster-grid">
          <li v-for="player in roster" :key="player.slug" class="roster-card" :class="player.tier ? `roster-${player.tier}` : ''">
            <span class="roster-no" aria-hidden="true">{{ player.no }}</span>
            <span v-if="player.badge" class="roster-badge">{{ player.badge }}</span>
            <img :src="`/players/${player.slug}.png`" :alt="`${player.nick} 的灌籃高手風格形象照`" width="720" loading="lazy" decoding="async">
            <div class="roster-plate"><strong>{{ player.nick }}</strong><span>{{ player.team }}</span><em>{{ player.stat }}</em></div>
          </li>
        </ul>
      </div>
      <div class="standings-wrap"><div class="standings-heading"><div><p class="eyebrow ink">YAHOO 2025 FINAL STANDINGS</p><h3>上季戰績，攤開來看</h3></div><p>W–L–T 是九項分類的累積成果；Moves 則是誰最常在半夜動腦換人。</p></div><div class="standings-table"><div class="standings-row standings-label"><span>#</span><span>TEAM</span><span>W–L–T</span><span>PCT</span><span>MOVES</span></div><div v-for="entry in seasonStandings" :key="entry.team" class="standings-row"><span>{{ String(entry.rank).padStart(2, '0') }}</span><strong>{{ entry.team }}</strong><span>{{ entry.record }}</span><span>{{ entry.pct }}</span><span>{{ entry.moves }}</span></div></div></div>
      <div id="weekly" class="weekly-vault">
        <div class="weekly-vault-head"><div><p class="eyebrow ink">WEEKLY DATA VAULT</p><h3>22 週數據，慢慢翻舊帳</h3><p>挑一週回看，12 隊、20 個欄位，誰是大腿誰在挖坑一清二楚。</p></div><label>切換查看週次<select v-model="selectedWeek"><option v-for="week in weeklyOptions" :key="week.value" :value="week.value">{{ week.label }}</option></select></label></div>
        <div class="weekly-table-wrap">
          <p v-if="weeklyLoading" class="weekly-state">正在載入該週資料…</p>
          <p v-else-if="weeklyError" class="weekly-state">資料暫時無法載入，請稍後再試。</p>
          <table v-else-if="weeklyData" class="weekly-table"><caption>{{ weeklyData.label }} · 2025–26 TEAM STATS</caption><thead><tr><th v-for="header in weeklyData.headers" :key="header">{{ header }}</th></tr></thead><tbody><tr v-for="(row, rowIndex) in weeklyData.rows" :key="`${selectedWeek}-${rowIndex}`"><td v-for="(value, valueIndex) in row" :key="valueIndex" :class="statRank(rowIndex, valueIndex)">{{ value === '#DIV/0!' ? '—' : value }}</td></tr></tbody></table>
        </div>
        <div v-if="weeklyData" class="weekly-legend"><span class="legend-first">最佳</span><span class="legend-second">第二</span><span class="legend-third">第三</span><i /> <span class="legend-win">勝</span><span class="legend-loss">敗</span><span class="legend-draw">平手／未出賽</span></div>
        <div v-if="weeklyData" class="matchups-wrap"><div class="matchups-heading"><p class="eyebrow ink">ALL-PLAY COMPARISON</p><h4>{{ weeklyData.label }} · 全盟對戰比較</h4></div>
        <div v-if="!weeklyLoading && weeklyData?.weeklyRanking?.length" class="weekly-podium" aria-label="當週全盟比較前三名">
          <p>{{ weeklyData.label }} · 全盟比較前三名</p>
          <p class="weekly-ranking-note">當週數據與全盟逐一交手，能贏最多對手的前三名登榜。</p>
          <p class="weekly-ranking-motto">能贏十隊，卻偏偏撞上唯一剋星？本週強，不代表本週贏，賽程運氣也很重要。</p>
          <div><article v-for="entry in weeklyData.weeklyRanking" :key="entry.team" :class="`weekly-rank-${entry.rank}`"><span>{{ entry.icon }}</span><div><small>第 {{ entry.rank }} 名</small><strong>{{ entry.team }}</strong></div></article></div>
        </div>
        <div class="matchups-scroll"><table class="matchups-table"><thead><tr><th v-for="(header, index) in weeklyData.matchupHeaders" :key="`${header}-${index}`">{{ header }}</th></tr></thead><tbody><tr v-for="(row, rowIndex) in weeklyData.matchupRows" :key="`match-${rowIndex}`"><th>{{ row[0] }}</th><td v-for="(value, valueIndex) in row.slice(1)" :key="valueIndex" :class="matchupState(value)">{{ value === '--' ? '—' : value }}</td></tr></tbody></table></div></div>
        <p class="weekly-note">資料直接來自聯盟週報：同欄位前三名會上色；季後賽沒出賽的隊伍就讓它安靜顯示「—」。</p>
      </div>
      <div class="archive-footer"><p>這頁專門放上季戰績；首頁版本也會繼續保留。</p><div class="archive-footer-links"><NuxtLink to="/">回首頁</NuxtLink><a href="https://docs.google.com/spreadsheets/d/1GBUHLrH2pGYnfdqfvMKgkv55kb7PnV0IPs6-M3s1C28/edit?gid=1309906405#gid=1309906405" target="_blank" rel="noreferrer">打開上季完整週報</a></div></div>
    </section>
    <section id="medals" ref="medalSection" class="medal-totals dragon-arena" :class="{ 'dragon-arrived': dragonArrived, 'dragon-roaring': dragonRoaring }">
      <div class="dragon-world" aria-hidden="true"><div class="dragon-world-grid" /><div class="dragon-world-stars" /></div>
      <CyberDragon :active="dragonArrived" :run="dragonRun" @roar="onDragonRoar" />
      <div class="dragon-roar-light" aria-hidden="true" />
      <div class="wrap dragon-content">
        <p class="eyebrow ink">2025–26 上季 MEDAL COLLECTION</p><h2>上季累積獎牌榜</h2>
        <div class="dragon-controls"><button type="button" @click="startDragon">↻ 龍王再臨</button></div>
        <p class="medal-totals-note">上季全季 22 週，含季後賽；把每週全盟比較的金、銀、銅牌通通算進來。依金牌、銀牌、銅牌數排序。</p>
        <p v-if="medalsLoading" class="weekly-state">正在清點大家的獎牌…</p>
        <p v-else-if="medalsError" class="weekly-state">獎牌資料暫時無法載入，請稍後重新整理。</p>
        <div v-else-if="medalTotals" class="medal-totals-scroll"><table class="medal-totals-table"><thead><tr><th>成員</th><th>🥇 金牌</th><th>🥈 銀牌</th><th>🥉 銅牌</th><th>總獎牌</th></tr></thead><tbody><tr v-for="entry in medalTotals.rows" :key="entry.team"><th>{{ entry.team }}</th><td>{{ entry.gold }}</td><td>{{ entry.silver }}</td><td>{{ entry.bronze }}</td><td>{{ entry.total }}</td></tr></tbody></table></div>
      </div>
    </section>
    <footer class="site-footer"><div class="wrap"><p>© 2026 Chanchao. All rights reserved.</p></div></footer>
  </main>
</template>

<style scoped>
.roster-band { position:relative; margin:56px 0; padding:60px 0 68px; background:var(--navy); color:#fff; box-shadow:0 0 0 100vmax var(--navy); clip-path:inset(0 -100vmax); }
.roster-band::before { content:''; position:absolute; inset:0; pointer-events:none; background:repeating-linear-gradient(115deg,transparent 0 46px,rgba(240,184,73,.045) 46px 48px); }
.roster-head { position:relative; display:flex; align-items:end; justify-content:space-between; gap:48px; margin-bottom:34px; }
.roster-head .eyebrow { color:var(--gold); }
.roster-head h3 { margin:0; color:#fff; font-size:clamp(1.7rem,3.2vw,2.6rem); letter-spacing:-.02em; }
.roster-head > p { max-width:360px; margin:0; color:#c2cedd; font-size:.95rem; line-height:1.75; }
.roster-grid { position:relative; display:grid; grid-template-columns:repeat(4,1fr); gap:22px 18px; margin:0; padding:0; list-style:none; }
.roster-card { position:relative; aspect-ratio:4 / 5.1; overflow:hidden; border:3px solid #060b14; background:radial-gradient(circle at 1px 1px,rgba(240,184,73,.2) 1.2px,transparent 1.7px) 0 0 / 10px 10px,linear-gradient(165deg,#1b2f4f,#0a1322 72%); box-shadow:6px 6px 0 rgba(240,184,73,.32); isolation:isolate; transition:transform .25s ease,box-shadow .25s ease; }
.roster-card::before { content:''; position:absolute; inset:0; z-index:-1; background:repeating-conic-gradient(from 0deg at 50% 82%,rgba(255,255,255,.075) 0 2.5deg,transparent 2.5deg 9deg); }
.roster-card:hover { transform:translate(-3px,-3px); box-shadow:9px 9px 0 var(--gold); }
.roster-no { position:absolute; z-index:1; top:4px; left:12px; color:transparent; font:700 clamp(3.6rem,7.4vw,5.6rem)/.9 'Oswald',sans-serif; letter-spacing:-.02em; -webkit-text-stroke:2px rgba(240,184,73,.6); }
.roster-card img { position:absolute; z-index:2; left:50%; bottom:0; width:112%; max-width:none; height:auto; transform:translateX(-50%); filter:drop-shadow(0 6px 0 rgba(0,0,0,.35)); transition:transform .3s ease; }
.roster-card:hover img { transform:translateX(-50%) scale(1.04); }
.roster-badge { position:absolute; z-index:4; top:12px; right:-6px; padding:5px 16px 5px 14px; background:var(--gold); color:var(--ink); font:700 .78rem 'Noto Sans TC',sans-serif; letter-spacing:.08em; transform:skewX(-10deg); box-shadow:3px 3px 0 #060b14; }
.roster-plate { position:absolute; z-index:3; left:0; right:0; bottom:0; display:grid; gap:2px; padding:42px 14px 12px; background:linear-gradient(0deg,rgba(6,11,20,.97) 52%,rgba(6,11,20,.7) 78%,transparent); }
.roster-plate strong { font:700 1.35rem/1.15 'Noto Sans TC',sans-serif; letter-spacing:.02em; }
.roster-plate span { color:#b9c5d6; font-size:.74rem; line-height:1.4; }
.roster-plate em { margin-top:3px; color:var(--gold); font:500 .7rem 'DM Mono',monospace; font-style:normal; letter-spacing:.06em; }
.roster-top-1 { border-color:var(--gold); box-shadow:6px 6px 0 var(--gold); }
.roster-top-1 .roster-no { -webkit-text-stroke-color:var(--gold); }
.roster-top-2 { border-color:#cbd0d7; box-shadow:6px 6px 0 rgba(203,208,215,.55); }
.roster-top-2 .roster-badge { background:#cbd0d7; }
.roster-top-3 { border-color:#d5a073; box-shadow:6px 6px 0 rgba(213,160,115,.55); }
.roster-top-3 .roster-badge { background:#d5a073; }
.roster-legacy .roster-badge { background:#fff; }
.roster-rookie { border-style:dashed; border-color:var(--gold); }
.roster-rookie .roster-no { font-size:clamp(2.6rem,5.4vw,4rem); }
@media (max-width:1000px) { .roster-grid { grid-template-columns:repeat(3,1fr); } }
@media (max-width:760px) {
  .roster-band { margin:40px 0; padding:44px 0 52px; }
  .roster-head { flex-direction:column; align-items:flex-start; gap:12px; }
  .roster-grid { grid-template-columns:repeat(2,1fr); gap:16px 12px; }
  .roster-plate { padding:34px 10px 10px; }
  .roster-plate strong { font-size:1.1rem; }
  .roster-badge { top:8px; right:-5px; padding:4px 12px; font-size:.7rem; }
}
@media (prefers-reduced-motion:reduce) { .roster-card,.roster-card img { transition:none; } .roster-card:hover { transform:none; } .roster-card:hover img { transform:translateX(-50%); } }
</style>
