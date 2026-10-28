<script setup lang="ts">
import FundTracker from '../components/FundTracker.vue'

const podium = [
  { rank: '02', title: '亞軍', team: '阿肥幹大事', name: 'Vince', image: '/members/vince.jpg' },
  { rank: '01', title: '冠軍', team: 'VICTOR🍋', name: 'Vic', image: '/members/vic.jpg' },
  { rank: '03', title: '季軍', team: 'Gyuumao', name: '牛魔王', image: '/members/gyuumao.jpg' },
]

const members = [
  { team: '字母主委', name: '主委', image: '/members/leo-eyes-wide.png' },
  { team: '台北胯下大暖流艦隊', name: '小曹', image: '/members/cao.jpg' },
  { team: '浪子踢球', name: 'Alan', image: '/members/alan.jpg' },
  { team: 'Wintersoldier', name: '李董', image: '/members/li.jpg' },
  { team: '傻逼維特向前衝', name: 'Vic', image: '/members/vic.jpg' },
  { team: 'Gyuumao', name: '牛魔王', image: '/members/gyuumao.jpg' },
  { team: '阿肥加班幹大事', name: 'Vince', image: '/members/vince.jpg' },
  { team: '卡店老闆的斑馬PSA10', name: '卡店老闆', image: '/members/cardshop.jpg' },
  { team: '哈利吸K', name: 'CK', image: '/members/ck.jpg', position: '50% 12%' },
  { team: '蟻人雄兵', name: '大叔', image: '/members/sean.jpg' },
  { team: 'ALOMAR', name: 'Jeffery', image: '/members/jeffrey.jpg' },
  { team: '80年次男性', name: 'Jesse', image: '/members/jesse.jpg' },
  { team: 'Wei Too Strong', name: '阿瑋', image: '/members/wei.png', rookie: true },
  { team: '尬電鮪魚', name: 'Tim', image: '/members/tim.png', rookie: true },
]
const firstRoundPicks = [
  { pick: 1, player: 'Nikola Jokić', meta: 'DEN · C', team: '阿肥加班幹大事', manager: 'Vince', nbaId: '203999' },
  { pick: 2, player: 'Victor Wembanyama', meta: 'SAS · C', team: '卡店老闆的斑馬PSA10', manager: '卡店老闆', nbaId: '1641705' },
  { pick: 3, player: 'Luka Dončić', meta: 'LAL · PG, SG', team: 'ALOMAR', manager: 'Jeffery', nbaId: '1629029' },
  { pick: 4, player: 'Shai Gilgeous-Alexander', meta: 'OKC · PG', team: 'Wintersoldier', manager: '李董', nbaId: '1628983' },
  { pick: 5, player: 'Tyrese Maxey', meta: 'PHI · PG', team: 'Wei Too Strong', manager: '阿瑋', nbaId: '1630178' },
  { pick: 6, player: 'Anthony Edwards', meta: 'MIN · PG, SG', team: '蟻人雄兵', manager: '大叔', nbaId: '1630162' },
  { pick: 7, player: 'Giannis Antetokounmpo', meta: 'MIA · PF, C', team: '字母主委', manager: '主委', nbaId: '203507' },
  { pick: 8, player: 'Cade Cunningham', meta: 'DET · PG, SG', team: '浪子踢球', manager: 'Alan', nbaId: '1630595' },
  { pick: 9, player: 'Jayson Tatum', meta: 'BOS · SF, PF', team: '80年次男性', manager: 'Jesse', nbaId: '1628369' },
  { pick: 10, player: 'Cooper Flagg', meta: 'DAL · SG, SF, PF', team: 'Gyuumao', manager: '牛魔王', nbaId: '1642843' },
  { pick: 11, player: 'Karl-Anthony Towns', meta: 'NYK · PF, C', team: '台北胯下大暖流艦隊', manager: '小曹', nbaId: '1626157' },
  { pick: 12, player: 'Jalen Johnson', meta: 'ATL · SF, PF', team: '尬電鮪魚', manager: 'Tim', nbaId: '1630552' },
  { pick: 13, player: 'Scottie Barnes', meta: 'TOR · SF, PF, C', team: '傻逼維特向前衝', manager: 'Vic', nbaId: '1630567' },
  { pick: 14, player: 'Tyrese Haliburton', meta: 'IND · PG, SG', team: '哈利吸K', manager: 'CK', nbaId: '1630169' },
]
const weekOneStandings = [
  { rank: 1, team: '卡店老闆的斑馬PSA10', record: '7–2–0', pct: '.778' },
  { rank: 2, team: 'Wei Too Strong', record: '7–2–0', pct: '.778' },
  { rank: 3, team: '蟻人雄兵', record: '7–2–0', pct: '.778' },
  { rank: 4, team: '浪子踢球', record: '6–3–0', pct: '.667' },
  { rank: 5, team: '阿肥加班幹大事', record: '5–3–1', pct: '.611' },
  { rank: 6, team: '字母主委', record: '5–4–0', pct: '.556' },
  { rank: 7, team: '哈利吸K', record: '5–4–0', pct: '.556' },
  { rank: 8, team: 'Wintersoldier', record: '4–5–0', pct: '.444' },
  { rank: 9, team: '台北胯下大暖流艦隊', record: '4–5–0', pct: '.444' },
  { rank: 10, team: 'Gyuumao', record: '3–5–1', pct: '.389' },
  { rank: 11, team: '傻逼維特向前衝', record: '3–6–0', pct: '.333' },
  { rank: 12, team: 'ALOMAR', record: '2–7–0', pct: '.222' },
  { rank: 13, team: '80年次男性', record: '2–7–0', pct: '.222' },
  { rank: 14, team: '尬電鮪魚', record: '2–7–0', pct: '.222' },
]
const weekOneMatchups = [
  { left: '阿肥加班幹大事', leftScore: 5, right: 'Gyuumao', rightScore: 3 },
  { left: '字母主委', leftScore: 5, right: '台北胯下大暖流艦隊', rightScore: 4 },
  { left: '浪子踢球', leftScore: 6, right: '傻逼維特向前衝', rightScore: 3 },
  { left: '卡店老闆的斑馬PSA10', leftScore: 7, right: '尬電鮪魚', rightScore: 2 },
  { left: '哈利吸K', leftScore: 5, right: 'Wintersoldier', rightScore: 4 },
  { left: 'ALOMAR', leftScore: 2, right: 'Wei Too Strong', rightScore: 7 },
  { left: '蟻人雄兵', leftScore: 7, right: '80年次男性', rightScore: 2 },
]
const weekOneCategories = ['FG%', 'FT%', '3PTM', 'PTS', 'REB', 'AST', 'ST', 'BLK', 'TO']
const weekOneAverageCategories = ['3PTM(avg)', 'PTS(avg)', 'REB(avg)', 'AST(avg)', 'ST(avg)', 'BLK(avg)', 'TO(avg)']
const weekOneTeamStats = [
  { team: '阿肥加班幹大事', gp: 41, fgm: '214/447', ftm: '121/161', stats: ['.479', '.752', '47', '596', '195', '138', '41', '26', '81'] },
  { team: 'Gyuumao', gp: 39, fgm: '193/413', ftm: '108/142', stats: ['.467', '.761', '47', '541', '180', '111', '46', '18', '73'] },
  { team: '字母主委', gp: 39, fgm: '224/422', ftm: '95/127', stats: ['.531', '.748', '50', '593', '214', '133', '34', '27', '69'] },
  { team: '台北胯下大暖流艦隊', gp: 41, fgm: '166/352', ftm: '94/124', stats: ['.472', '.758', '42', '468', '203', '81', '39', '31', '65'] },
  { team: '浪子踢球', gp: 42, fgm: '170/363', ftm: '78/99', stats: ['.468', '.788', '68', '486', '205', '146', '50', '38', '96'] },
  { team: '傻逼維特向前衝', gp: 42, fgm: '229/522', ftm: '100/127', stats: ['.439', '.787', '64', '622', '249', '149', '49', '24', '111'] },
  { team: '卡店老闆的斑馬PSA10', gp: 42, fgm: '205/453', ftm: '98/133', stats: ['.453', '.737', '59', '567', '217', '117', '33', '28', '68'] },
  { team: '尬電鮪魚', gp: 34, fgm: '174/403', ftm: '112/140', stats: ['.432', '.800', '50', '510', '198', '116', '37', '25', '72'] },
  { team: '哈利吸K', gp: 38, fgm: '197/419', ftm: '98/130', stats: ['.470', '.754', '69', '561', '200', '116', '35', '15', '67'] },
  { team: 'Wintersoldier', gp: 41, fgm: '187/424', ftm: '106/135', stats: ['.441', '.785', '63', '543', '167', '104', '39', '25', '50'] },
  { team: 'ALOMAR', gp: 43, fgm: '208/451', ftm: '99/129', stats: ['.461', '.767', '73', '588', '226', '138', '39', '14', '81'] },
  { team: 'Wei Too Strong', gp: 45, fgm: '232/485', ftm: '106/137', stats: ['.478', '.774', '47', '617', '255', '110', '50', '27', '72'] },
  { team: '蟻人雄兵', gp: 41, fgm: '175/380', ftm: '107/125', stats: ['.461', '.856', '47', '504', '154', '93', '41', '23', '68'] },
  { team: '80年次男性', gp: 35, fgm: '164/367', ftm: '103/129', stats: ['.447', '.798', '44', '475', '172', '171', '35', '15', '74'] },
]
const selectedMember = ref<typeof members[number] | null>(null)
const prizes = [
  { place: 1, tier: 'contender', group: '爭冠組', title: '總冠軍', amount: '3,000' },
  { place: 2, tier: 'contender', group: '爭冠組', title: '亞軍', amount: '2,000' },
  { place: 3, tier: 'contender', group: '爭冠組', title: '季軍', amount: '1,500' },
  { place: 4, tier: 'contender', group: '爭冠組', title: '殿軍', amount: '1,200' },
  { place: 5, tier: 'contender', group: '爭冠組', title: '第 5 名', amount: '1,100' },
  { place: 6, tier: 'contender', group: '爭冠組', title: '第 6 名', amount: '900' },
  { place: 7, tier: 'comfort', group: '安慰組', title: '安慰組冠軍', amount: '1,000' },
  { place: 8, tier: 'comfort', group: '安慰組', title: '安慰組亞軍', amount: '800' },
  { place: 9, tier: 'comfort', group: '安慰組', title: '第 9 名', amount: '600' },
  { place: 10, tier: 'comfort', group: '安慰組', title: '第 10 名', amount: '500' },
  { place: 11, tier: 'comfort', group: '安慰組', title: '第 11 名', amount: '400' },
  { place: 12, tier: 'comfort', group: '安慰組', title: '第 12 名', amount: '300' },
  { place: 13, tier: 'outside', group: '未進季後賽', title: '第 13 名', amount: '200' },
  { place: 14, tier: 'outside', group: '未進季後賽', title: '第 14 名', amount: '100' },
]

const categories = ['FG%', 'FT%', '3PTM', 'PTS', 'REB', 'AST', 'ST', 'BLK', 'TO']
const seasonFacts = [
  { label: '例行賽勝率王', value: '思得卓識博聞之士', detail: '103 勝 · 66 負 · 2 和｜勝率 .608' },
  { label: '換人最勤快', value: '卡店老闆獨自升級', detail: '整季累積 135 次球員異動' },
]
const lastSeasonAlumnus = {
  name: 'Jesse Prince',
  nickname: '展昭最帥',
  team: '80年次男性',
  image: '/members/jesse.jpg',
}
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
const weekOneStatRank = (rowIndex: number, categoryIndex: number) => {
  const ownValue = Number(weekOneTeamStats[rowIndex]?.stats[categoryIndex])
  if (!Number.isFinite(ownValue)) return ''
  const values = weekOneTeamStats.map(entry => Number(entry.stats[categoryIndex])).filter(Number.isFinite)
  const ordered = [...new Set(values)].sort((a, b) => categoryIndex === 8 ? a - b : b - a)
  const place = ordered.indexOf(ownValue) + 1
  return place > 0 && place <= 3 ? `stat-place-${place}` : ''
}
const weekOneAverage = (entry: typeof weekOneTeamStats[number], categoryIndex: number) => {
  const value = Number(entry.stats[categoryIndex])
  return Number.isFinite(value) && entry.gp ? (value / entry.gp).toFixed(2) : '—'
}
const weekOneAverageRank = (rowIndex: number, categoryIndex: number) => {
  const entry = weekOneTeamStats[rowIndex]
  const ownValue = entry ? Number(entry.stats[categoryIndex]) / entry.gp : Number.NaN
  if (!Number.isFinite(ownValue)) return ''
  const values = weekOneTeamStats.map(entry => Number(entry.stats[categoryIndex]) / entry.gp).filter(Number.isFinite)
  const ordered = [...new Set(values)].sort((a, b) => categoryIndex === 8 ? a - b : b - a)
  const place = ordered.indexOf(ownValue) + 1
  return place > 0 && place <= 3 ? `stat-place-${place}` : ''
}
const compareWeekOneStats = (left: typeof weekOneTeamStats[number], right: typeof weekOneTeamStats[number]) => {
  let wins = 0
  let losses = 0
  let ties = 0
  left.stats.forEach((stat, index) => {
    const leftValue = Number(stat)
    const rightValue = Number(right.stats[index])
    if (leftValue === rightValue) ties += 1
    else if (index === 8 ? leftValue < rightValue : leftValue > rightValue) wins += 1
    else losses += 1
  })
  return { wins, losses, ties, result: `${wins}:${losses}${ties ? `:${ties}` : ''}` }
}
// Matrix follows the archive's reading direction: each column is that team's own result against the row opponent.
const weekOneAllPlayRows = weekOneTeamStats.map(opponent => [opponent.team, ...weekOneTeamStats.map(entry => entry.team === opponent.team ? '—' : compareWeekOneStats(entry, opponent).result)])
const weekOneAllPlayRanking = weekOneTeamStats.map(entry => {
  const totals = weekOneTeamStats.filter(opponent => opponent.team !== entry.team).reduce((record, opponent) => {
    const result = compareWeekOneStats(entry, opponent)
    if (result.wins > result.losses) return { wins: record.wins + 1, losses: record.losses, ties: record.ties }
    if (result.wins < result.losses) return { wins: record.wins, losses: record.losses + 1, ties: record.ties }
    return { wins: record.wins, losses: record.losses, ties: record.ties + 1 }
  }, { wins: 0, losses: 0, ties: 0 })
  return { team: entry.team, ...totals, record: `${totals.wins}–${totals.losses}–${totals.ties}` }
}).sort((a, b) => {
  if (b.wins !== a.wins) return b.wins - a.wins
  const directMatchup = compareWeekOneStats(
    weekOneTeamStats.find(entry => entry.team === a.team)!,
    weekOneTeamStats.find(entry => entry.team === b.team)!,
  )
  if (directMatchup.wins !== directMatchup.losses) return directMatchup.wins > directMatchup.losses ? -1 : 1
  return a.losses - b.losses || b.ties - a.ties
}).map((entry, index) => ({ ...entry, rank: index + 1 }))
const weekOneMedalTotals = weekOneAllPlayRanking.map(entry => ({
  ...entry,
  gold: entry.rank === 1 ? 1 : 0,
  silver: entry.rank === 2 ? 1 : 0,
  bronze: entry.rank === 3 ? 1 : 0,
  total: entry.rank <= 3 ? 1 : 0,
}))
const rankMedal = (rank: number) => ['🥇', '🥈', '🥉'][rank - 1] || ''
const matchupState = (value: unknown) => {
  if (typeof value !== 'string' || !value.includes(':')) return ''
  const [won, lost] = value.split(':').map(Number)
  if (!Number.isFinite(won) || !Number.isFinite(lost) || won === lost) return 'match-draw'
  return won > lost ? 'match-win' : 'match-loss'
}
const tiltHonorCard = (event: PointerEvent) => {
  if (window.matchMedia('(hover: none)').matches) return
  const card = event.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width
  const y = (event.clientY - rect.top) / rect.height
  card.style.setProperty('--tilt-x', `${(0.5 - y) * 11}deg`)
  card.style.setProperty('--tilt-y', `${(x - 0.5) * 13}deg`)
  card.style.setProperty('--shine-x', `${x * 100}%`)
  card.style.setProperty('--shine-y', `${y * 100}%`)
}
const resetHonorCard = (event: PointerEvent) => {
  const card = event.currentTarget as HTMLElement
  card.style.removeProperty('--tilt-x')
  card.style.removeProperty('--tilt-y')
  card.style.removeProperty('--shine-x')
  card.style.removeProperty('--shine-y')
}
</script>

<template>
  <nav class="site-menu" aria-label="頁面導覽">
    <div class="wrap site-menu-inner">
      <a class="menu-brand" href="#top" aria-label="Chanchao Gentleman Club 首頁"><img src="/cgc-logo.svg" alt="Chanchao Gentleman Club"><span>2026–27</span></a>
      <div class="menu-links">
        <a href="#prizes">積分規則</a><a href="#members">選手牆</a><a href="#alumni">名人堂</a><a href="#current-season">本季戰報</a><NuxtLink to="/lastseason">上季回顧</NuxtLink>
      </div>
    </div>
  </nav>
  <main id="top">
    <section id="hero" class="hero">
      <img class="hero-photo" src="/league-night.png" alt="Chanchao Gentleman Club 上季團體照">
      <div class="hero-shade" />
      <div class="hero-content wrap">
        <p class="eyebrow">FANTASY NBA · 2026–27</p>
        <h1>Chanchao<br><em>Gentleman Club</em></h1>
        <p class="hero-copy">十四位經理人，十四條命運線；選秀已經落幕，Gentleman Club 的戰火正式覺醒。</p>
      </div>
    </section>

    <section id="prizes" class="prizes-section">
      <div class="wrap">
        <header class="prizes-head"><div><p class="eyebrow ink">2026–27 LEAGUE POINTS</p><h2>每項攏會算，季末多尊嚴</h2></div><p>14 位經理人；每個分類都是本季戰力的一部分。</p></header>
        <div class="prize-board"><div class="prize-pool"><span>POINT BANK</span><strong>28,000 P</strong><p>私人聯盟年度活動積分：2,000 P × 14 人，整季認真玩到底。</p></div><div class="prize-rules"><article><b>18 + 3</b><span>18 週例行賽，3 週季後賽；撐到最後才算完成任務。</span></article><article><b>10 P</b><span>每拿下一項分類，就收下 10 P 聯盟積分。</span></article><article><b>5 P</b><span>平手也有紀錄，雙方各拿 5 P。</span></article></div><div class="prize-splits"><span>例行賽戰場 11,340 P</span><span>季後賽任務 13,600 P</span><span>聚餐基金 2,800 P · 行政費用 260 P</span></div></div>
        <p class="points-disclaimer">本站僅為私人 Fantasy NBA 聯盟的成績與活動紀錄頁；積分規則限既有成員內部使用，不對外招募、不提供投注、不提供賠率。</p>
        <div class="payouts"><article v-for="prize in prizes" :key="prize.place" :class="[`payout-${prize.place}`, `payout-${prize.tier}`]"><div class="payout-top"><span>{{ prize.group }}</span><small>#{{ String(prize.place).padStart(2, '0') }}</small></div><em>{{ prize.title }}</em><strong>{{ prize.amount }} P</strong></article></div>
        <FundTracker />
      </div>
    </section>

    <section id="members" class="members-section">
      <div class="wrap">
        <header class="members-head"><div><p class="eyebrow">THE LEAGUE</p><h2>14 位經理人，14 套劇本</h2></div><p>Jesse 又跳進來，阿瑋與 Tim 也上桌；本季的新火藥味已經到位。</p></header>
        <div class="members-grid">
          <button v-for="member in members" :key="member.team" type="button" class="member-card" :class="{ rookie: member.rookie }" :aria-label="`放大查看 ${member.name} 的照片`" @click="selectedMember = member">
            <img :src="member.image" :alt="member.name" :style="{ objectPosition: member.position || 'center' }">
            <span v-if="member.rookie" class="rookie-badge">Rookie</span>
            <div class="member-meta"><h3>{{ member.team }}</h3><p>{{ member.name }}</p></div>
          </button>
        </div>
      </div>
    </section>

    <section id="alumni" class="alumnus-section wrap">
      <article class="alumnus-card"><img :src="lastSeasonAlumnus.image" :alt="lastSeasonAlumnus.nickname"><div><p class="eyebrow ink">HALL OF FAME · COMEBACK TOUR</p><h3>那個男人，又回來了</h3><p class="alumnus-team">{{ lastSeasonAlumnus.team }} · {{ lastSeasonAlumnus.name }}</p><p>當大家以為傳說已是歷史，Jesse 選擇再次走上舞台。80年次男性，這不是彩蛋，是本季最大種馬。</p></div></article>
    </section>

    <section id="honors" class="honors wrap">
      <header><p class="eyebrow ink">2025–26 HONORS</p><h2>上季最終前三名</h2></header>
      <div class="podium">
        <article v-for="player in podium" :key="player.rank" class="honor-card" :class="`rank-${player.rank}`" @pointermove="tiltHonorCard" @pointerleave="resetHonorCard">
          <img v-if="player.rank === '01'" class="championship-trophy" src="/championship-trophy.png" alt="NBA 總冠軍獎盃">
          <img :src="player.image" :alt="`${player.name} ${player.title}`">
          <div><span>{{ player.rank }} · {{ player.title }}</span><h3>{{ player.team }}</h3><p>{{ player.name }}</p></div>
        </article>
      </div>
    </section>

    <div v-if="selectedMember" class="photo-dialog" role="dialog" aria-modal="true" :aria-label="`${selectedMember.name} 的照片`" @click.self="selectedMember = null">
      <div class="photo-dialog-card"><button type="button" class="photo-dialog-close" aria-label="關閉照片" @click="selectedMember = null">×</button><img :src="selectedMember.image" :alt="selectedMember.name"></div>
    </div>

    <section id="current-season" class="current-season">
      <div class="wrap">
        <div class="current-season-card"><div><p class="eyebrow">2026–27 SEASON · NOW UNDERWAY</p><h2>本季戰報，正式開打</h2><p>每週對戰、九項分類排名與整季交手紀錄，會從這裡開始逐週累積。</p></div><div class="current-season-status"><span>CURRENT SEASON</span><strong>2026–27</strong><small>每週持續更新</small></div></div>
        <div class="week-one-report">
          <div class="week-one-heading"><div><p class="eyebrow">WEEK 1 · FINAL</p><h3>開幕週結算，先記一筆</h3></div><p>10/20–10/25 · 九項分類 · 14 隊完成首週交手</p></div>
          <div class="week-one-table-wrap"><table class="week-one-stats-table"><caption>WEEK 1 · 2026–27 TEAM STATS</caption><thead><tr><th>Team</th><th>GP</th><th>FGM/A*</th><th>FG%</th><th>FTM/A*</th><th>FT%</th><th v-for="category in weekOneCategories.slice(2)" :key="category">{{ category }}</th><th v-for="category in weekOneAverageCategories" :key="category">{{ category }}</th></tr></thead><tbody><tr v-for="(entry, rowIndex) in weekOneTeamStats" :key="entry.team"><th>{{ entry.team }}</th><td>{{ entry.gp }}</td><td>{{ entry.fgm }}</td><td :class="weekOneStatRank(rowIndex, 0)">{{ entry.stats[0] }}</td><td>{{ entry.ftm }}</td><td :class="weekOneStatRank(rowIndex, 1)">{{ entry.stats[1] }}</td><td v-for="(stat, statOffset) in entry.stats.slice(2)" :key="`${entry.team}-total-${statOffset}`" :class="weekOneStatRank(rowIndex, statOffset + 2)">{{ stat }}</td><td v-for="(category, averageOffset) in weekOneAverageCategories" :key="`${entry.team}-${category}`" :class="weekOneAverageRank(rowIndex, averageOffset + 2)">{{ weekOneAverage(entry, averageOffset + 2) }}</td></tr></tbody></table></div>
          <div class="week-one-legend"><span class="legend-first">最佳</span><span class="legend-second">第二</span><span class="legend-third">第三</span><i /><span>九項數據以全盟排名標色；TO 越低越好。</span></div>
          <div class="week-one-all-play"><div class="week-one-all-play-heading"><div><p class="eyebrow">ALL-PLAY COMPARISON</p><h4>Week 1 · 全盟對戰比較</h4></div><p>上方欄為自己、左側列為對手；九項數據逐隊比較，對 13 隊的勝負數決定排名，同勝場時看直接對戰。</p></div><div class="week-one-podium" aria-label="第一週全盟比較前三名"><article v-for="entry in weekOneAllPlayRanking.slice(0, 3)" :key="entry.rank" :class="`week-one-rank-${entry.rank}`"><span class="week-one-medal">{{ rankMedal(entry.rank) }}</span><div><strong>{{ entry.team }}</strong><em>{{ entry.record }}</em></div></article></div><div class="week-one-all-play-scroll"><table class="week-one-all-play-table"><thead><tr><th>對手 \ 自己</th><th v-for="entry in weekOneTeamStats" :key="entry.team">{{ entry.team }}</th></tr></thead><tbody><tr v-for="row in weekOneAllPlayRows" :key="row[0]"><th>{{ row[0] }}</th><td v-for="(value, valueIndex) in row.slice(1)" :key="valueIndex" :class="matchupState(value)">{{ value }}</td></tr></tbody></table></div><section class="week-one-medal-totals"><p class="eyebrow ink">2026–27 MEDAL COLLECTION</p><h4>本季累積獎牌榜</h4><p>目前累積至 Week 1；每週全盟比較前三名分別獲得金、銀、銅牌。</p><div class="medal-totals-scroll"><table class="medal-totals-table"><thead><tr><th>成員</th><th>🥇 金牌</th><th>🥈 銀牌</th><th>🥉 銅牌</th><th>總獎牌</th></tr></thead><tbody><tr v-for="entry in weekOneMedalTotals" :key="entry.team"><th>{{ entry.team }}</th><td>{{ entry.gold }}</td><td>{{ entry.silver }}</td><td>{{ entry.bronze }}</td><td>{{ entry.total }}</td></tr></tbody></table></div></section></div>
        </div>
        <div class="first-round-draft">
          <div class="first-round-heading"><div><p class="eyebrow">DRAFT RESULTS · ROUND 1</p><h3>首輪選秀，一人一張王牌</h3></div><p>14 位經理人的首輪決定，從這裡開始。</p></div>
          <div class="first-round-grid">
            <article v-for="draftPick in firstRoundPicks" :key="draftPick.pick" class="first-round-pick">
              <span class="draft-pick-number">{{ String(draftPick.pick).padStart(2, '0') }}</span>
              <img :src="`https://cdn.nba.com/headshots/nba/latest/1040x760/${draftPick.nbaId}.png`" :alt="`${draftPick.player} headshot`" class="draft-player-photo">
              <div class="draft-pick-copy"><strong>{{ draftPick.player }}</strong><small>{{ draftPick.meta }}</small><p>{{ draftPick.team }}</p><em>{{ draftPick.manager }}</em></div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="archive" class="archive wrap home-archive">
      <div class="archive-intro"><div><p class="eyebrow ink">2025–26 SEASON ARCHIVE</p><h2>2025–26 上季回顧</h2></div><p>從每週互咬到季後賽，上一季的神操作和崩盤時刻，全都留在這裡。</p></div>
      <details class="archive-details">
        <summary><NuxtLink to="/lastseason">查看完整上季成績</NuxtLink><small>19 週例行賽 · 3 週季後賽 · 9 項分類</small></summary>
        <div class="archive-details-content">
      <div class="archive-stats"><span><b>19</b> REGULAR WEEKS</span><span><b>3</b> PLAYOFF WEEKS</span><span><b>9</b> CATEGORIES</span></div>
      <div class="season-facts"><article v-for="fact in seasonFacts" :key="fact.label"><p>{{ fact.label }}</p><h3>{{ fact.value }}</h3><span>{{ fact.detail }}</span></article></div>
      <div class="season-track"><div class="regular"><small>WEEK 1</small><span>例行賽</span><small>WEEK 19</small></div><div class="playoffs"><span>季後賽</span><small>WEEK 20–22</small></div></div>
      <div class="category-row"><span v-for="category in categories" :key="category">{{ category }}</span></div>
      <div class="standings-wrap"><div class="standings-heading"><div><p class="eyebrow ink">YAHOO 2025 FINAL STANDINGS</p><h3>上季戰績，攤開來看</h3></div><p>W–L–T 是九項分類的累積成果；Moves 則是誰最常在半夜動腦換人。</p></div><div class="standings-table"><div class="standings-row standings-label"><span>#</span><span>TEAM</span><span>W–L–T</span><span>PCT</span><span>MOVES</span></div><div v-for="entry in seasonStandings" :key="entry.team" class="standings-row"><span>{{ String(entry.rank).padStart(2, '0') }}</span><strong>{{ entry.team }}</strong><span>{{ entry.record }}</span><span>{{ entry.pct }}</span><span>{{ entry.moves }}</span></div></div></div>
      <div class="weekly-vault">
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
      <section id="medals" class="medal-totals archive-medal-totals">
        <p class="eyebrow ink">2025–26 上季 MEDAL COLLECTION</p><h3>上季累積獎牌榜</h3>
        <p class="medal-totals-note">上季全季 22 週，含季後賽；把每週全盟比較的金、銀、銅牌通通算進來。依金牌、銀牌、銅牌數排序。</p>
        <p v-if="medalsLoading" class="weekly-state">正在清點大家的獎牌…</p>
        <p v-else-if="medalsError" class="weekly-state">獎牌資料暫時無法載入，請稍後重新整理。</p>
        <div v-else-if="medalTotals" class="medal-totals-scroll"><table class="medal-totals-table"><thead><tr><th>成員</th><th>🥇 金牌</th><th>🥈 銀牌</th><th>🥉 銅牌</th><th>總獎牌</th></tr></thead><tbody><tr v-for="entry in medalTotals.rows" :key="entry.team"><th>{{ entry.team }}</th><td>{{ entry.gold }}</td><td>{{ entry.silver }}</td><td>{{ entry.bronze }}</td><td>{{ entry.total }}</td></tr></tbody></table></div>
      </section>
      <div class="archive-footer"><p>完整的上季戰績、每週數據與累積獎牌已整理到獨立頁。</p><div class="archive-footer-links"><NuxtLink to="/lastseason">查看完整上季成績</NuxtLink><a href="https://docs.google.com/spreadsheets/d/1GBUHLrH2pGYnfdqfvMKgkv55kb7PnV0IPs6-M3s1C28/edit?gid=1309906405#gid=1309906405" target="_blank" rel="noreferrer">打開上季完整週報</a></div></div>
        </div>
      </details>
    </section>
    <footer class="site-footer">
      <div class="wrap"><p>© 2026 Chanchao. All rights reserved.</p></div>
    </footer>
  </main>
</template>
