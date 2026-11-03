<script setup lang="ts">
type TeamWeek = { team: string; gp: number; fgm: string; ftm: string; stats: string[] }

const categories = ['FG%', 'FT%', '3PTM', 'PTS', 'REB', 'AST', 'ST', 'BLK', 'TO']
const weekOne: TeamWeek[] = [
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
  { team: '蟻人快歸來', gp: 41, fgm: '175/380', ftm: '107/125', stats: ['.461', '.856', '47', '504', '154', '93', '41', '23', '68'] },
  { team: '80年次男性', gp: 35, fgm: '164/367', ftm: '103/129', stats: ['.447', '.798', '44', '475', '172', '171', '35', '15', '74'] },
]
const weekTwo: TeamWeek[] = [
  { team: '阿肥加班幹大事', gp: 48, fgm: '234/528', ftm: '128/164', stats: ['.443', '.780', '71', '667', '252', '185', '43', '29', '93'] },
  { team: '浪子踢球', gp: 48, fgm: '192/452', ftm: '97/117', stats: ['.425', '.829', '65', '546', '247', '146', '50', '41', '109'] },
  { team: '字母主委', gp: 46, fgm: '213/441', ftm: '66/96', stats: ['.483', '.688', '49', '541', '224', '158', '43', '22', '77'] },
  { team: '卡店老闆的斑馬PSA10', gp: 47, fgm: '278/579', ftm: '126/160', stats: ['.480', '.787', '85', '767', '258', '135', '36', '31', '82'] },
  { team: '傻逼維特向前衝', gp: 39, fgm: '226/464', ftm: '119/136', stats: ['.487', '.875', '63', '634', '216', '147', '39', '26', '87'] },
  { team: '哈利吸K', gp: 46, fgm: '215/490', ftm: '115/147', stats: ['.439', '.782', '81', '626', '268', '135', '49', '30', '88'] },
  { team: 'Gyuumao', gp: 46, fgm: '246/496', ftm: '106/130', stats: ['.496', '.815', '79', '677', '240', '148', '49', '24', '76'] },
  { team: '尬電鮪魚', gp: 43, fgm: '234/491', ftm: '107/145', stats: ['.477', '.738', '87', '662', '278', '151', '39', '38', '81'] },
  { team: 'ALOMAR', gp: 45, fgm: '211/449', ftm: '90/108', stats: ['.470', '.833', '76', '588', '214', '147', '41', '23', '78'] },
  { team: '台北胯下大暖流艦隊', gp: 37, fgm: '172/336', ftm: '84/101', stats: ['.512', '.832', '58', '486', '180', '77', '30', '19', '61'] },
  { team: 'Wei Too Strong', gp: 45, fgm: '206/458', ftm: '82/106', stats: ['.450', '.774', '63', '557', '213', '127', '47', '13', '45'] },
  { team: '蟻人快歸來', gp: 45, fgm: '192/410', ftm: '74/106', stats: ['.468', '.698', '55', '513', '155', '102', '36', '22', '70'] },
  { team: 'Wintersoldier', gp: 48, fgm: '235/514', ftm: '108/134', stats: ['.457', '.806', '88', '666', '181', '127', '37', '20', '80'] },
  { team: '80年次男性', gp: 51, fgm: '229/525', ftm: '177/213', stats: ['.436', '.831', '67', '702', '241', '201', '40', '20', '97'] },
]

const split = (value: string) => value.split('/').map(Number) as [number, number]
const combined = weekTwo.map(current => {
  const previous = weekOne.find(entry => entry.team === current.team)!
  const [fgm1, fga1] = split(previous.fgm); const [fgm2, fga2] = split(current.fgm)
  const [ftm1, fta1] = split(previous.ftm); const [ftm2, fta2] = split(current.ftm)
  const sums = current.stats.slice(2).map((value, index) => Number(value) + Number(previous.stats[index + 2]))
  return { team: current.team, gp: previous.gp + current.gp, stats: [(fgm1 + fgm2) / (fga1 + fga2), (ftm1 + ftm2) / (fta1 + fta2), ...sums] }
})
const ranks = combined.map(entry => categories.map((_, index) => {
  const sorted = [...combined].sort((a, b) => index === 8 ? a.stats[index] - b.stats[index] : b.stats[index] - a.stats[index])
  return sorted.findIndex(item => item.team === entry.team) + 1
}))
const playerCards = combined.map((entry, entryIndex) => ({
  ...entry,
  ranks: ranks[entryIndex],
  highlights: categories.map((label, index) => ({ label, rank: ranks[entryIndex][index], value: index < 2 ? entry.stats[index].toFixed(3).replace(/^0/, '') : entry.stats[index] })).sort((a, b) => a.rank - b.rank).slice(0, 3),
}))
const playerStrength = (rank: number) => Math.max(8, Math.round(((combined.length - rank) / (combined.length - 1)) * 100))
const point = (index: number, strength: number) => {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / categories.length
  const radius = 72 * strength
  return `${(100 + Math.cos(angle) * radius).toFixed(1)},${(100 + Math.sin(angle) * radius).toFixed(1)}`
}
const radar = (teamIndex: number, scale = 1) => ranks[teamIndex].map((rank, index) => point(index, playerStrength(rank) / 100 * scale)).join(' ')
const guide = (scale: number) => categories.map((_, index) => point(index, scale)).join(' ')
const labelPoint = (index: number) => {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / categories.length
  return { x: 100 + Math.cos(angle) * 91, y: 100 + Math.sin(angle) * 91 }
}
const leftTeam = ref(combined[0].team)
const rightTeam = ref(combined[1].team)
const formatStat = (value: number, index: number) => index < 2 ? value.toFixed(3).replace(/^0/, '') : String(value)
const comparisonRows = computed(() => {
  const left = combined.find(team => team.team === leftTeam.value)!
  const right = combined.find(team => team.team === rightTeam.value)!
  return categories.map((category, index) => {
    const leftValue = left.stats[index]
    const rightValue = right.stats[index]
    const leftAverage = index < 2 ? leftValue : leftValue / left.gp
    const rightAverage = index < 2 ? rightValue : rightValue / right.gp
    const result = index === 8 ? rightAverage - leftAverage : leftAverage - rightAverage
    return {
      category,
      left: formatStat(leftValue, index),
      right: formatStat(rightValue, index),
      leftAverage: index < 2 ? '' : (leftAverage as number).toFixed(2),
      rightAverage: index < 2 ? '' : (rightAverage as number).toFixed(2),
      winner: result === 0 ? 'tie' : result > 0 ? 'left' : 'right',
      note: result === 0 ? '平手' : result > 0 ? '左方優勢' : '右方優勢',
    }
  })
})
const matchupSummary = computed(() => {
  const rows = comparisonRows.value
  const leftWins = rows.filter(row => row.winner === 'left').length
  const rightWins = rows.filter(row => row.winner === 'right').length
  const ties = rows.filter(row => row.winner === 'tie').length
  const winner = leftWins === rightWins ? '平手' : leftWins > rightWins ? leftTeam.value : rightTeam.value
  return { leftWins, rightWins, ties, winner }
})
</script>

<template>
  <nav class="site-menu" aria-label="頁面導覽">
    <div class="wrap site-menu-inner"><NuxtLink class="menu-brand" to="/" aria-label="回 Chanchao Gentleman Club 首頁"><img src="/cgc-logo.svg" alt="Chanchao Gentleman Club"><span>2026–27</span></NuxtLink><div class="menu-links"><NuxtLink to="/">回首頁</NuxtLink><a href="#analysis">深度分析</a><NuxtLink to="/lastseason">上季回顧</NuxtLink></div></div>
  </nav>
  <main id="analysis" class="analysis-page">
    <section class="analysis-hero wrap">
      <p class="eyebrow">2026–27 SEASON · NOW UNDERWAY</p>
      <h1>本季戰報，正式開打</h1>
      <p>每週對戰、九項分類排名與整季交手紀錄，會從這裡開始逐週累積。</p>
    </section>
    <section class="analysis-board wrap">
      <div class="analysis-heading"><div><p class="eyebrow ink">WEEK 1–2 · COMBINED DATA</p><h2>全員九項戰力圖</h2></div><p>兩週原始數據合併後再排名。FG% 與 FT% 以總命中／總出手加權計算；TO 越低越強。</p></div>
      <div class="analysis-method"><span>14 TEAMS</span><span>2 WEEKS</span><span>9 CATEGORIES</span><span>WEIGHTED %</span></div>
      <div class="analysis-grid">
        <article v-for="(player, playerIndex) in playerCards" :key="player.team" class="analysis-card">
          <div class="analysis-card-head"><div><small>TEAM {{ String(playerIndex + 1).padStart(2, '0') }}</small><h3>{{ player.team }}</h3></div><b>{{ player.gp }}<em> GP</em></b></div>
          <div class="analysis-radar"><svg viewBox="0 0 200 200" :aria-label="`${player.team} 九項戰力雷達圖`" role="img"><polygon v-for="scale in [.25, .5, .75, 1]" :key="scale" class="analysis-guide" :points="guide(scale)" /><line v-for="(_, index) in categories" :key="`axis-${index}`" class="analysis-axis" x1="100" y1="100" :x2="point(index, 1).split(',')[0]" :y2="point(index, 1).split(',')[1]" /><polygon class="analysis-shape" :points="radar(playerIndex)" /><text v-for="(category, index) in categories" :key="category" class="analysis-label" :x="labelPoint(index).x" :y="labelPoint(index).y">{{ category }}</text></svg></div>
          <div class="analysis-highlights"><span v-for="item in player.highlights" :key="item.label"><b>{{ item.label }}</b><em>#{{ item.rank }}</em><small>{{ item.value }}</small></span></div>
        </article>
      </div>
      <section class="matchup-lab" aria-labelledby="matchup-title">
        <div class="matchup-heading"><div><p class="eyebrow ink">HEAD TO HEAD · WEEK 1–2</p><h2 id="matchup-title">雙隊九項對位</h2></div><p>FG%、FT% 直接比較命中率；其餘項目同列兩週累計與場均，並以場均判定優勢，TO 越低越好。</p></div>
        <div class="team-selectors">
          <label><span>左方隊伍</span><select v-model="leftTeam"><option v-for="team in combined" :key="`left-${team.team}`" :value="team.team">{{ team.team }}</option></select></label>
          <b>VS</b>
          <label><span>右方隊伍</span><select v-model="rightTeam"><option v-for="team in combined" :key="`right-${team.team}`" :value="team.team">{{ team.team }}</option></select></label>
        </div>
        <div class="matchup-table-wrap"><table class="matchup-table"><colgroup><col class="category-col"><col class="score-col"><col class="score-col"><col class="result-col"></colgroup><thead><tr><th>項目</th><th>{{ leftTeam }}</th><th>{{ rightTeam }}</th><th>單項優勢</th></tr></thead><tbody><tr v-for="row in comparisonRows" :key="row.category"><th class="matchup-category">{{ row.category }}</th><td :class="{ winner: row.winner === 'left' }">{{ row.left }}<small v-if="row.leftAverage">場均 {{ row.leftAverage }}</small></td><td :class="{ winner: row.winner === 'right' }">{{ row.right }}<small v-if="row.rightAverage">場均 {{ row.rightAverage }}</small></td><td><span :class="['matchup-result', row.winner]">{{ row.note }}</span></td></tr></tbody></table></div>
        <div class="matchup-final" :class="{ draw: matchupSummary.winner === '平手' }"><span>對戰結果</span><strong>{{ matchupSummary.leftWins }}</strong><strong>{{ matchupSummary.rightWins }}</strong><em v-if="matchupSummary.winner === '平手'">平手</em><em v-else>{{ matchupSummary.winner }} 優勢<span v-if="matchupSummary.ties"> · {{ matchupSummary.ties }} 項平手</span></em></div>
      </section>
    </section>
  </main>
</template>

<style scoped>
.analysis-page{min-height:100vh;background:#f3f0e8;color:#0c1422}.analysis-hero{padding:86px 0 50px}.eyebrow{margin:0;color:#8a6017;font:700 .74rem 'DM Mono',monospace;letter-spacing:.12em}.analysis-hero h1{margin:12px 0 14px;font:900 clamp(2.45rem,6vw,5rem)/1 'Noto Sans TC',sans-serif;letter-spacing:-.05em}.analysis-hero>p:last-child{max-width:680px;margin:0;color:#5d6570;font-size:1.05rem;line-height:1.8}.analysis-board{padding:42px 0 90px;border-top:1px solid #d3cfc2}.analysis-heading,.matchup-heading{display:flex;justify-content:space-between;gap:40px;align-items:end}.analysis-heading h2,.matchup-heading h2{margin:6px 0 0;font:800 2rem/1.1 'Noto Sans TC',sans-serif}.analysis-heading>p,.matchup-heading>p{max-width:430px;margin:0;color:#5d6570;line-height:1.75}.analysis-method{display:flex;flex-wrap:wrap;gap:8px;margin:30px 0 18px}.analysis-method span{padding:8px 10px;border:1px solid #d3cfc2;background:#fffdf8;color:#6a542c;font:700 .65rem 'DM Mono',monospace;letter-spacing:.08em}.analysis-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.analysis-card{overflow:hidden;border:1px solid #d3cfc2;background:#fffdf8;box-shadow:0 4px 16px rgba(28,39,53,.06)}.analysis-card-head{display:flex;justify-content:space-between;gap:12px;align-items:start;padding:16px 17px 13px;border-bottom:1px solid #e0dcd1}.analysis-card-head small{color:#8a7155;font:700 .62rem 'DM Mono',monospace;letter-spacing:.08em}.analysis-card-head h3{overflow:hidden;max-width:255px;margin:5px 0 0;font:800 .98rem/1.25 'Noto Sans TC',sans-serif;text-overflow:ellipsis;white-space:nowrap}.analysis-card-head>b{color:#8a6017;font:800 1.05rem 'DM Mono',monospace}.analysis-card-head em{font-size:.58rem;font-style:normal}.analysis-radar{padding:8px 30px 0;background:linear-gradient(145deg,#132742,#1b385d)}.analysis-radar svg{display:block;width:100%;overflow:visible}.analysis-guide{fill:rgba(240,184,73,.04);stroke:rgba(255,247,223,.25);stroke-width:1}.analysis-axis{stroke:rgba(255,247,223,.2);stroke-width:1}.analysis-shape{fill:rgba(240,184,73,.35);stroke:#f0b849;stroke-width:2}.analysis-label{fill:#f7ead0;font:700 7px 'DM Mono',monospace;text-anchor:middle;dominant-baseline:middle}.analysis-highlights{display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid #d3cfc2}.analysis-highlights span{display:grid;gap:3px;padding:10px;border-right:1px solid #e0dcd1}.analysis-highlights span:last-child{border-right:0}.analysis-highlights b{color:#77694f;font:700 .62rem 'DM Mono',monospace}.analysis-highlights em{color:#8a6017;font:800 .82rem 'DM Mono',monospace;font-style:normal}.analysis-highlights small{color:#5d6570;font:.66rem 'DM Mono',monospace}.matchup-lab{margin-top:64px;padding-top:38px;border-top:1px solid #d3cfc2}.team-selectors{display:grid;grid-template-columns:minmax(0,1fr) 38px minmax(0,1fr);gap:14px;align-items:end;margin:26px 0 16px}.team-selectors label{display:grid;gap:7px}.team-selectors label span{color:#786648;font:700 .67rem 'DM Mono',monospace;letter-spacing:.08em}.team-selectors select{width:100%;height:48px;padding:0 13px;border:1px solid #dfbd59;border-radius:10px;background:linear-gradient(135deg,#fffdf8,#f8edc8);color:#0c1422;font:800 .94rem 'Noto Sans TC',sans-serif;box-shadow:0 3px 0 #d8ad3c}.team-selectors>b{padding-bottom:14px;color:#de8c24;text-align:center;font:900 .82rem 'DM Mono',monospace}.matchup-table-wrap{overflow-x:auto;border:1px solid #d8caa5;border-radius:14px 14px 0 0;background:#fffdf8;box-shadow:0 8px 22px rgba(81,60,21,.08)}.matchup-table{width:100%;min-width:570px;border-collapse:collapse;text-align:center}.matchup-table th,.matchup-table td{padding:12px 14px;border-bottom:1px solid #eadfca;font:700 .84rem 'DM Mono','Noto Sans TC',sans-serif}.matchup-table thead th{background:linear-gradient(105deg,#f0ad32,#dc7a37);color:#fffdf5;font-size:.75rem}.matchup-table thead th:nth-child(2){background:#2c79b8}.matchup-table thead th:nth-child(3){background:#6542a5}.matchup-table .matchup-category{background:#f5d785;color:#4e3211;border-right:1px solid #e5bd54;font:900 .78rem 'DM Mono',monospace;letter-spacing:.04em}.matchup-table tbody tr:nth-child(even){background:#fffbf2}.matchup-table tbody tr:last-child>*{border-bottom:0}.matchup-table td.winner{background:transparent;color:#d67721;font-weight:900}.matchup-table td small{display:block;margin-top:3px;color:#707775;font:600 .67rem 'DM Mono',monospace}.matchup-result{display:inline-block;min-width:68px;padding:5px 8px;border-radius:99px;background:#eee8da;color:#716b60;font-size:.68rem}.matchup-result.left{background:#caebdb;color:#1d704e}.matchup-result.right{background:#d9e5ff;color:#27549a}.matchup-final{display:grid;grid-template-columns:auto 1fr auto;gap:20px;align-items:center;padding:16px 20px;border:1px solid #d8caa5;border-top:0;border-radius:0 0 14px 14px;background:linear-gradient(120deg,#172f53,#2c79b8);color:#fffdf8}.matchup-final>span{color:#f4cb6c;font:800 .68rem 'DM Mono',monospace;letter-spacing:.1em}.matchup-final>div{display:flex;justify-content:center;align-items:center;gap:18px;text-align:center}.matchup-final b{max-width:220px;overflow:hidden;color:#fffdf8;font:800 .88rem 'Noto Sans TC',sans-serif;text-overflow:ellipsis;white-space:nowrap}.matchup-final strong{color:#f6cf6e;font:900 clamp(1.5rem,3vw,2.25rem)/1 'DM Mono',monospace;white-space:nowrap}.matchup-final em{color:#dff3e8;font:800 .78rem 'Noto Sans TC',sans-serif;font-style:normal;white-space:nowrap}.matchup-final.draw{background:linear-gradient(120deg,#4e5e71,#697c91)}@media(max-width:900px){.analysis-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:760px){.analysis-hero{padding:60px 0 38px}.analysis-heading,.matchup-heading{display:block}.analysis-heading>p,.matchup-heading>p{margin-top:14px}.analysis-grid{grid-template-columns:1fr}.analysis-card-head h3{max-width:260px}.analysis-radar{padding-right:40px;padding-left:40px}.team-selectors{grid-template-columns:1fr;gap:10px}.team-selectors>b{padding:1px 0}.matchup-lab{margin-top:45px}.matchup-table th,.matchup-table td{padding:11px 10px}.matchup-final{grid-template-columns:1fr;gap:9px;text-align:center}.matchup-final>div{gap:10px}.matchup-final b{max-width:105px;font-size:.72rem}.matchup-final em{font-size:.72rem}}
</style>

<style scoped>
/* 對位比較收斂為：暖白、海軍藍、低飽和金。 */
.team-selectors select{border-color:#b7aa93;border-radius:4px;background:#fffdf8;box-shadow:none}
.team-selectors>b{color:#8a6017}
.matchup-table-wrap{border-color:#cfc5b3;border-radius:4px 4px 0 0;background:#fffdf8;box-shadow:none}
.matchup-table thead th,.matchup-table thead th:nth-child(2),.matchup-table thead th:nth-child(3){background:#142843;color:#fffdf8}
.matchup-table .matchup-category{background:#e9dfc6;color:#4d3c20;border-right-color:#d2bf93}
.matchup-table tbody tr:nth-child(even){background:transparent}
.matchup-table th,.matchup-table td{border-bottom-color:#e4ddd0}
.matchup-table td.winner{color:#8a6017}
.matchup-result,.matchup-result.left,.matchup-result.right{border:1px solid #d2bf93;border-radius:3px;background:#fffdf8;color:#6f5a31}
.matchup-final,.matchup-final.draw{border-color:#142843;border-radius:0 0 4px 4px;background:#142843;color:#fffdf8}
.matchup-final>span,.matchup-final strong{color:#e9c66e}
.matchup-final em{color:#fffdf8}
.matchup-final{grid-template-columns:1fr 1fr 1fr}
.matchup-final>strong{text-align:center}
.matchup-final>em{text-align:right}
.matchup-table col.category-col{width:17%}
.matchup-table col.score-col{width:33%}
.matchup-table col.result-col{width:17%}
.matchup-final{grid-template-columns:17% 33% 33% 17%;gap:0;padding:14px 0}
.matchup-final>span{padding-left:24px;font-size:.92rem}
.matchup-final>strong{font-size:2.55rem;line-height:1;text-align:center}
.matchup-final>em{padding-right:24px;font-size:.88rem}
@media(max-width:760px){.matchup-final{grid-template-columns:17% 33% 33% 17%;padding:13px 0}.matchup-final>span{padding-left:10px;font-size:.68rem}.matchup-final>strong{font-size:1.8rem}.matchup-final>em{padding-right:10px;font-size:.66rem;white-space:normal}}
</style>
