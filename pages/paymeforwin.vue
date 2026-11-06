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
type MatchupPeriod = 'combined' | 'weekOne' | 'weekTwo'
type MatchupTeam = { team: string; gp: number; stats: number[] }
const normalizeWeek = (entries: TeamWeek[]): MatchupTeam[] => entries.map(entry => ({ team: entry.team, gp: entry.gp, stats: entry.stats.map(Number) }))
const weeklyMatchupData = { weekOne: normalizeWeek(weekOne), weekTwo: normalizeWeek(weekTwo) }
const matchupPeriods: { id: MatchupPeriod; label: string; caption: string }[] = [
  { id: 'combined', label: '兩週合計', caption: 'WEEK 1–2 · COMBINED' },
  { id: 'weekOne', label: 'WEEK 1', caption: 'WEEK 1 · FINAL' },
  { id: 'weekTwo', label: 'WEEK 2', caption: 'WEEK 2 · FINAL' },
]
const ranks = combined.map(entry => categories.map((_, index) => {
  const sorted = [...combined].sort((a, b) => index === 8 ? a.stats[index] - b.stats[index] : b.stats[index] - a.stats[index])
  return sorted.findIndex(item => item.team === entry.team) + 1
}))
const playerCards = combined.map((entry, entryIndex) => ({
  ...entry,
  ranks: ranks[entryIndex],
  highlights: categories.map((label, index) => ({ label, rank: ranks[entryIndex][index], value: index < 2 ? entry.stats[index].toFixed(3).replace(/^0/, '') : entry.stats[index] })).sort((a, b) => a.rank - b.rank).slice(0, 3),
}))
const rankGuides = Array.from({ length: combined.length }, (_, index) => (index + 1) / combined.length)
const rankStrength = (rank: number) => (combined.length + 1 - rank) / combined.length
const point = (index: number, strength: number) => {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / categories.length
  const radius = 72 * strength
  return `${(100 + Math.cos(angle) * radius).toFixed(1)},${(100 + Math.sin(angle) * radius).toFixed(1)}`
}
const radar = (teamIndex: number) => ranks[teamIndex].map((rank, index) => point(index, rankStrength(rank))).join(' ')
const guide = (scale: number) => categories.map((_, index) => point(index, scale)).join(' ')
const labelPoint = (index: number) => {
  const angle = -Math.PI / 2 + (Math.PI * 2 * index) / categories.length
  return { x: 100 + Math.cos(angle) * 91, y: 100 + Math.sin(angle) * 91 }
}
const selectedTeam = ref(playerCards[0].team)
const isRankModalOpen = ref(false)
const selectedPlayer = computed(() => playerCards.find(player => player.team === selectedTeam.value)!)
const selectedRankDetails = computed(() => categories.map((category, index) => ({
  category,
  rank: selectedPlayer.value.ranks[index],
  value: index < 2 ? selectedPlayer.value.stats[index].toFixed(3).replace(/^0/, '') : selectedPlayer.value.stats[index],
})))
const selectPlayer = (team: string) => { selectedTeam.value = team; isRankModalOpen.value = true }
const closeRankModal = () => { isRankModalOpen.value = false }
const selectedMatchupPeriod = ref<MatchupPeriod>('combined')
const matchupTeams = computed<MatchupTeam[]>(() => selectedMatchupPeriod.value === 'combined' ? combined : weeklyMatchupData[selectedMatchupPeriod.value])
const activeMatchupPeriod = computed(() => matchupPeriods.find(period => period.id === selectedMatchupPeriod.value)!)
const leftTeam = ref(combined[0].team)
const rightTeam = ref(combined[1].team)
const matchupGames = computed(() => {
  const left = matchupTeams.value.find(team => team.team === leftTeam.value)!
  const right = matchupTeams.value.find(team => team.team === rightTeam.value)!
  return { left: left.gp, right: right.gp }
})
const formatStat = (value: number, index: number) => index < 2 ? value.toFixed(3).replace(/^0/, '') : String(value)
const comparisonRows = computed(() => {
  const left = matchupTeams.value.find(team => team.team === leftTeam.value)!
  const right = matchupTeams.value.find(team => team.team === rightTeam.value)!
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

type ProjectionPlayer = { name: string; nba: string; slot: string; fgm: number; fga: number; ftm: number; fta: number; stats: number[] }
type ProjectionRange = 'week4' | 'week5' | 'twoWeeks'
const futureSchedule: Record<string, [number, number]> = {
  SAS: [4, 3], GSW: [3, 4], LAL: [3, 3], HOU: [4, 3], DEN: [3, 4], LAC: [3, 3], CLE: [4, 3], NYK: [4, 4], TOR: [4, 3], BKN: [2, 3], POR: [3, 4], IND: [4, 3], ORL: [3, 4], CHA: [3, 2], MEM: [4, 4], MIA: [3, 3], BOS: [3, 4], NOP: [4, 4], OKC: [4, 3], WAS: [4, 4], CHI: [3, 4],
}
const projectionTeams: { team: string; players: ProjectionPlayer[] }[] = [
  { team: '阿肥加班幹大事', players: [
    { name: 'De’Aaron Fox', nba: 'SAS', slot: 'PG', fgm: 5.3, fga: 9.6, ftm: 3.6, fta: 4.5, stats: [1, 15.1, 4.3, 6.1, 1.4, .5, 2.9] }, { name: 'Gary Payton II', nba: 'GSW', slot: 'SG', fgm: 2.1, fga: 4.9, ftm: 0, fta: 0, stats: [.4, 4.6, 2, .5, .6, 0, .8] }, { name: 'Ziaire Williams', nba: 'LAL', slot: 'G', fgm: 3.7, fga: 6.8, ftm: 1.5, fta: 1.7, stats: [1.8, 10.7, 3, 2, 1.5, .2, .5] }, { name: 'Devin Vassell', nba: 'SAS', slot: 'SF', fgm: 3.6, fga: 9.8, ftm: 2.3, fta: 2.4, stats: [1.1, 10.6, 4.3, 3.3, 1.8, .3, 1.3] }, { name: 'Al Horford', nba: 'GSW', slot: 'PF', fgm: 1.8, fga: 4.5, ftm: 0, fta: .2, stats: [1.3, 5, 4, 1, .3, .7, 1] }, { name: 'Tari Eason', nba: 'HOU', slot: 'F', fgm: 3.9, fga: 8.4, ftm: 1.6, fta: 1.7, stats: [.9, 10.2, 5.9, 1.2, 1.1, 1.2, 1.1] }, { name: 'Nikola Jokić', nba: 'DEN', slot: 'C', fgm: 9.1, fga: 18.1, ftm: 4.1, fta: 4.7, stats: [1, 23.4, 9.7, 9.3, 2.1, 1.1, 3.6] }, { name: 'Brook Lopez', nba: 'LAC', slot: 'C', fgm: 5.3, fga: 9.4, ftm: 1.6, fta: 2.4, stats: [1.4, 13.5, 5.1, 1, .5, 1.1, 1.3] }, { name: 'Jarrett Allen', nba: 'CLE', slot: 'Util', fgm: 5.1, fga: 8.3, ftm: 2.8, fta: 4, stats: [.3, 13.3, 7.8, 1.3, .6, 1.5, .9] }, { name: 'Jalen Brunson', nba: 'NYK', slot: 'Util', fgm: 8.4, fga: 20.3, ftm: 6.1, fta: 8.1, stats: [2.8, 25.6, 2.6, 5.1, .8, .4, 1.8] }, { name: 'Meleek Thomas', nba: 'CLE', slot: 'Util', fgm: 5, fga: 10.8, ftm: .4, fta: .4, stats: [2.6, 13, 2.6, .8, 1, .2, 1] }, { name: 'RJ Barrett', nba: 'TOR', slot: 'BN', fgm: 8, fga: 16.6, ftm: 3.1, fta: 5.3, stats: [1.8, 20.9, 6, 3.9, .5, .5, 1.5] }, { name: 'Julius Randle', nba: 'BKN', slot: 'BN', fgm: 6.4, fga: 14.9, ftm: 6.5, fta: 8, stats: [1.8, 21, 7.1, 4.8, .9, .1, 3.9] }, { name: 'Deni Avdija', nba: 'POR', slot: 'BN', fgm: 7.7, fga: 16.1, ftm: 6.3, fta: 9.4, stats: [1.7, 23.4, 6.4, 6.4, .7, .1, 2.3] }, { name: 'Kelly Oubre Jr.', nba: 'IND', slot: 'IL', fgm: 3.4, fga: 8, ftm: 1.6, fta: 2.3, stats: [1, 9.4, 2.6, 1.6, .3, .7, .7] }, { name: 'Jalen Suggs', nba: 'ORL', slot: 'IL', fgm: 3.3, fga: 9.3, ftm: 1, fta: 1.3, stats: [.3, 8, 5, 5.7, 2, .3, 3] },
  ] },
  { team: '80年次男性屬羊', players: [
    { name: 'Mikel Brown Jr.', nba: 'BKN', slot: 'PG', fgm: 3.8, fga: 11.3, ftm: 2.5, fta: 3, stats: [1.8, 12, 2.3, 4, .7, .2, 2.2] }, { name: 'Coby White', nba: 'CHA', slot: 'SG', fgm: 2.5, fga: 9, ftm: 0, fta: 0, stats: [.5, 5.5, 2.5, 2.5, 0, .5, 2.5] }, { name: 'James Harden', nba: 'CLE', slot: 'G', fgm: 4.9, fga: 12.9, ftm: 4.3, fta: 5.1, stats: [2.6, 16.6, 5.3, 6.3, .9, .5, 3] }, { name: 'Cedric Coward', nba: 'MEM', slot: 'SF', fgm: 5.3, fga: 11.1, ftm: 1, fta: 1.4, stats: [2.7, 14.3, 8.7, 2.7, 1.6, .1, 1.4] }, { name: 'Trevon Brazile', nba: 'DEN', slot: 'PF', fgm: 3.1, fga: 5.7, ftm: .9, fta: 1.6, stats: [.9, 8, 6.4, .4, .9, .6, .9] }, { name: 'Franz Wagner', nba: 'ORL', slot: 'F', fgm: 7.4, fga: 17.7, ftm: 4.4, fta: 5.6, stats: [1, 20.3, 6.1, 7.6, .9, 0, 4.1] }, { name: 'Bam Adebayo', nba: 'MIA', slot: 'C', fgm: 7, fga: 13.1, ftm: 4, fta: 5.3, stats: [.6, 18.6, 8.3, 3.5, 2.1, .6, 2.1] }, { name: 'Neemias Queta', nba: 'BOS', slot: 'C', fgm: 3.5, fga: 6, ftm: 2.5, fta: 4, stats: [.3, 9.8, 6.3, 1.4, .3, 1.5, 1] }, { name: 'Andrew Nembhard', nba: 'IND', slot: 'Util', fgm: 6.3, fga: 13.6, ftm: 4, fta: 4.4, stats: [2.4, 19, 2.1, 6.9, .7, .1, 2.4] }, { name: 'Dejounte Murray', nba: 'NOP', slot: 'Util', fgm: 6.6, fga: 13.8, ftm: 4.2, fta: 4.4, stats: [.8, 18.2, 6.2, 5.6, 2.4, .8, 3] }, { name: 'Alex Caruso', nba: 'OKC', slot: 'Util', fgm: 2.8, fga: 5.2, ftm: 1.4, fta: 1.6, stats: [1.8, 8.8, 4.6, 3.6, .8, .4, .4] }, { name: 'Trae Young', nba: 'WAS', slot: 'BN', fgm: 5.4, fga: 13.3, ftm: 7, fta: 8.3, stats: [1.9, 19.6, 3.4, 9.5, 1.1, .3, 3] }, { name: 'Jalen Smith', nba: 'CHI', slot: 'BN', fgm: 4.3, fga: 9, ftm: 1.1, fta: 1.5, stats: [1.4, 11, 7.8, 1.8, .4, .9, .8] }, { name: 'Quentin Grimes', nba: 'LAL', slot: 'BN', fgm: 2.6, fga: 5.6, ftm: 2.4, fta: 3.3, stats: [.7, 8.2, 3, 2.7, .8, .1, 1.3] }, { name: 'Jayson Tatum', nba: 'BOS', slot: 'IL', fgm: 8.4, fga: 20.1, ftm: 8.6, fta: 9.9, stats: [1.6, 27, 6, 7.9, .7, .4, 3] }, { name: 'Aaron Nesmith', nba: 'IND', slot: 'IL', fgm: 4.1, fga: 10.3, ftm: 2.7, fta: 3.3, stats: [1.7, 12.7, 2, 1.9, 1, .3, 1.6] },
  ] },
]
const projectionRange = ref<ProjectionRange>('twoWeeks')
const projectionTeam = ref(projectionTeams[0].team)
const projectionRangeLabels: Record<ProjectionRange, string> = { week4: 'WEEK 4', week5: 'WEEK 5', twoWeeks: '未來兩週合計' }
const projectionGameCount = (nba: string) => { const games = futureSchedule[nba] || [0, 0]; return projectionRange.value === 'week4' ? games[0] : projectionRange.value === 'week5' ? games[1] : games[0] + games[1] }
const projectedPlayers = computed(() => projectionTeams.find(team => team.team === projectionTeam.value)!.players.map(player => ({ ...player, gp: projectionGameCount(player.nba) })))
const projectionTotals = computed(() => {
  const totals = projectedPlayers.value.reduce((sum, player) => {
    sum.gp += player.gp; sum.fgm += player.fgm * player.gp; sum.fga += player.fga * player.gp; sum.ftm += player.ftm * player.gp; sum.fta += player.fta * player.gp
    player.stats.forEach((value, index) => { sum.stats[index] += value * player.gp })
    return sum
  }, { gp: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, stats: Array(7).fill(0) as number[] })
  return [{ label: 'FG%', value: totals.fga ? (totals.fgm / totals.fga).toFixed(3).replace(/^0/, '') : '—' }, { label: 'FT%', value: totals.fta ? (totals.ftm / totals.fta).toFixed(3).replace(/^0/, '') : '—' }, ...categories.slice(2).map((label, index) => ({ label, value: String(Math.round(totals.stats[index])) })), { label: '預估 GP', value: String(totals.gp) }]
})
</script>

<template>
  <nav class="site-menu" aria-label="頁面導覽">
    <div class="wrap site-menu-inner"><NuxtLink class="menu-brand" to="/" aria-label="回 Chanchao Gentleman Club 首頁"><img src="/cgc-logo.svg" alt="Chanchao Gentleman Club"><span>2026–27</span></NuxtLink><div class="menu-links"><NuxtLink to="/">回首頁</NuxtLink><a href="#analysis">paymeforwin</a><NuxtLink to="/lastseason">上季回顧</NuxtLink></div></div>
  </nav>
  <main id="analysis" class="analysis-page">
    <section class="analysis-hero wrap">
      <p class="eyebrow">2026–27 SEASON · NOW UNDERWAY</p>
      <h1>本季戰報，正式開打</h1>
      <p>每週對戰、九項分類排名與整季交手紀錄，會從這裡開始逐週累積。</p>
    </section>
    <section class="analysis-board wrap">
      <div class="analysis-heading"><div><p class="eyebrow ink">WEEK 1–2 · COMBINED DATA</p><h2>全員九項戰力圖</h2></div><p>兩週原始數據合併後再排名。FG% 與 FT% 以總命中／總出手加權計算；TO 越低越強。</p></div>
      <div class="analysis-method"><span>14 TEAMS</span><span>2 WEEKS</span><span>9 CATEGORIES</span><span>14 RANK LEVELS</span><span>點雷達開啟完整名次</span></div>
      <div class="analysis-grid">
        <article v-for="(player, playerIndex) in playerCards" :key="player.team" class="analysis-card" :class="{ active: isRankModalOpen && selectedTeam === player.team }" tabindex="0" role="button" :aria-pressed="isRankModalOpen && selectedTeam === player.team" @click="selectPlayer(player.team)" @keydown.enter="selectPlayer(player.team)" @keydown.space.prevent="selectPlayer(player.team)">
          <div class="analysis-card-head"><div><small>TEAM {{ String(playerIndex + 1).padStart(2, '0') }}</small><h3>{{ player.team }}</h3></div><b>{{ player.gp }}<em> GP</em></b></div>
          <div class="analysis-radar"><svg viewBox="0 0 200 200" :aria-label="`${player.team} 九項戰力雷達圖；點選卡片查看完整名次`" role="img"><polygon v-for="(scale, guideIndex) in rankGuides" :key="scale" :class="['analysis-guide', { major: (guideIndex + 1) % 3 === 0 || guideIndex === rankGuides.length - 1 }]" :points="guide(scale)" /><line v-for="(_, index) in categories" :key="`axis-${index}`" class="analysis-axis" x1="100" y1="100" :x2="point(index, 1).split(',')[0]" :y2="point(index, 1).split(',')[1]" /><polygon class="analysis-shape" :points="radar(playerIndex)" /><g v-for="(category, index) in categories" :key="`point-${category}`" class="analysis-point"><title>{{ category }}：點選卡片查看名次</title><circle :cx="point(index, rankStrength(player.ranks[index])).split(',')[0]" :cy="point(index, rankStrength(player.ranks[index])).split(',')[1]" r="3.6" /></g><text v-for="(category, index) in categories" :key="category" class="analysis-label" :x="labelPoint(index).x" :y="labelPoint(index).y">{{ category }}</text></svg></div>
          <div class="analysis-highlights"><span v-for="item in player.highlights" :key="item.label"><b>{{ item.label }}</b><em>#{{ item.rank }}</em><small>{{ item.value }}</small></span></div>
        </article>
      </div>
      <section v-if="isRankModalOpen" class="rank-modal" role="dialog" aria-modal="true" :aria-label="`${selectedPlayer.team} 九項名次`" @click.self="closeRankModal"><div class="rank-modal-panel"><button class="rank-modal-close" type="button" aria-label="關閉完整名次" @click="closeRankModal">×</button><div class="rank-detail-head"><div><p class="eyebrow ink">RANK INSPECTOR · 14 TEAMS</p><h2>{{ selectedPlayer.team }}</h2></div></div><div class="rank-detail-grid"><article v-for="detail in selectedRankDetails" :key="detail.category" :class="['rank-detail-item', { elite: detail.rank <= 3 }]"><span>{{ detail.category }}</span><b>#{{ detail.rank }}</b><small>{{ detail.value }}</small><i :style="{ width: `${rankStrength(detail.rank) * 100}%` }"></i></article></div></div></section>
      <section class="projection-lab" aria-labelledby="projection-title">
        <div class="matchup-heading"><div><p class="eyebrow ink">SCHEDULE OUTLOOK · ROSTER MODEL</p><h2 id="projection-title">未來兩週預估</h2></div><p>每位球員的本季場均乘上 NBA 未來賽程；FG%、FT% 以預估命中與出手加權。此試行版先收錄兩隊。</p></div>
        <div class="projection-controls"><label><span>預測區間</span><select v-model="projectionRange"><option value="twoWeeks">未來兩週合計</option><option value="week4">WEEK 4</option><option value="week5">WEEK 5</option></select></label><label><span>選擇隊伍</span><select v-model="projectionTeam"><option v-for="team in projectionTeams" :key="team.team" :value="team.team">{{ team.team }}</option></select></label></div>
        <p class="projection-caption">{{ projectionRangeLabels[projectionRange] }} · 依 2026/11/9–11/22 賽程與目前 Yahoo 名單快照估算；包含 BN／IL，尚未扣除每日排陣與傷病缺賽。</p>
        <div class="projection-totals"><article v-for="total in projectionTotals" :key="total.label"><span>{{ total.label }}</span><b>{{ total.value }}</b></article></div>
        <details class="projection-roster"><summary>查看 {{ projectionTeam }} 的球員乘算明細</summary><div class="projection-table-wrap"><table><thead><tr><th>球員</th><th>NBA</th><th>位置</th><th>預計 GP</th><th>3PTM</th><th>PTS</th><th>REB</th><th>AST</th><th>ST</th><th>BLK</th><th>TO</th></tr></thead><tbody><tr v-for="player in projectedPlayers" :key="player.name"><th>{{ player.name }}</th><td>{{ player.nba }}</td><td>{{ player.slot }}</td><td>{{ player.gp }}</td><td>{{ (player.stats[0] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[1] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[2] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[3] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[4] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[5] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[6] * player.gp).toFixed(1) }}</td></tr></tbody></table></div></details>
      </section>
      <section class="matchup-lab" aria-labelledby="matchup-title">
        <div class="matchup-heading"><div><p class="eyebrow ink">HEAD TO HEAD · {{ activeMatchupPeriod.caption }}</p><h2 id="matchup-title">雙隊九項對位</h2></div><p>九項總數下直接列出場均；GP 另列於隊伍選擇下方。優勢判定以場均為準，FG%、FT% 直接比較命中率，TO 越低越好。</p></div>
        <div class="matchup-periods" role="tablist" aria-label="對位週次"><button v-for="period in matchupPeriods" :key="period.id" type="button" :class="{ active: selectedMatchupPeriod === period.id }" :aria-selected="selectedMatchupPeriod === period.id" @click="selectedMatchupPeriod = period.id">{{ period.label }}</button></div>
        <div class="team-selectors">
          <label><span>左方隊伍</span><select v-model="leftTeam"><option v-for="team in combined" :key="`left-${team.team}`" :value="team.team">{{ team.team }}</option></select></label>
          <b>VS</b>
          <label><span>右方隊伍</span><select v-model="rightTeam"><option v-for="team in combined" :key="`right-${team.team}`" :value="team.team">{{ team.team }}</option></select></label>
        </div>
        <div class="matchup-games"><span>{{ leftTeam }} · <b>{{ matchupGames.left }}</b> GP</span><em>本期出賽場次</em><span>{{ rightTeam }} · <b>{{ matchupGames.right }}</b> GP</span></div>
        <div class="matchup-table-wrap"><table class="matchup-table"><colgroup><col class="category-col"><col class="score-col"><col class="score-col"><col class="result-col"></colgroup><thead><tr><th>項目</th><th>{{ leftTeam }}</th><th>{{ rightTeam }}</th><th>單項優勢</th></tr></thead><tbody><tr v-for="row in comparisonRows" :key="row.category"><th class="matchup-category">{{ row.category }}</th><td :class="{ winner: row.winner === 'left' }">{{ row.left }}<small v-if="row.leftAverage">場均 {{ row.leftAverage }}</small></td><td :class="{ winner: row.winner === 'right' }">{{ row.right }}<small v-if="row.rightAverage">場均 {{ row.rightAverage }}</small></td><td><span :class="['matchup-result', row.winner]">{{ row.note }}</span></td></tr></tbody></table></div>
        <div class="matchup-final" :class="{ draw: matchupSummary.winner === '平手' }"><span>對戰結果</span><strong>{{ matchupSummary.leftWins }}</strong><strong>{{ matchupSummary.rightWins }}</strong><em aria-hidden="true"></em></div>
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
.matchup-table{table-layout:fixed}
.matchup-final>span{padding-left:0;text-align:center}
.matchup-final>strong{font-size:1.95rem}
.matchup-table td.winner{background:#fbf3df}
@media(max-width:760px){.matchup-final>span{padding-left:0;text-align:center}.matchup-final>strong{font-size:1.45rem}}
.analysis-card{cursor:pointer;transition:border-color .18s ease,box-shadow .18s ease,transform .18s ease}
.analysis-card:hover,.analysis-card:focus-visible,.analysis-card.active{border-color:#b88730;box-shadow:0 9px 22px rgba(55,43,18,.13);outline:0;transform:translateY(-2px)}
.analysis-card.active .analysis-card-head{border-bottom-color:#b88730}
.analysis-radar{position:relative}
.analysis-guide{fill:none;stroke:rgba(255,247,223,.12);stroke-width:.45}
.analysis-guide.major{stroke:rgba(255,247,223,.3);stroke-width:.85}
.analysis-point circle{fill:#fff8df;stroke:#e9b83e;stroke-width:1.5}
.analysis-point text{fill:#132742;font:800 5.4px 'DM Mono',monospace;text-anchor:middle;dominant-baseline:middle}
.analysis-rank-key{fill:rgba(255,247,223,.62);font:700 5px 'DM Mono',monospace;text-anchor:middle}
.rank-detail{margin-top:30px;padding:26px;border:1px solid #d3cfc2;background:#fffdf8}
.rank-detail-head{display:flex;justify-content:space-between;gap:36px;align-items:end}
.rank-detail-head h2{margin:6px 0 0;font:800 1.55rem/1.2 'Noto Sans TC',sans-serif}
.rank-detail-head>p{max-width:430px;margin:0;color:#5d6570;line-height:1.7}
.rank-detail-grid{display:grid;grid-template-columns:repeat(9,minmax(0,1fr));gap:8px;margin-top:22px}
.rank-detail-item{position:relative;display:grid;gap:3px;min-height:101px;padding:12px 10px;overflow:hidden;border:1px solid #dfd9cb;background:#f9f7f0}
.rank-detail-item span{z-index:1;color:#77694f;font:700 .62rem 'DM Mono',monospace}
.rank-detail-item b{z-index:1;color:#142843;font:900 1.35rem/1 'DM Mono',monospace}
.rank-detail-item small{z-index:1;color:#5d6570;font:700 .68rem 'DM Mono',monospace}
.rank-detail-item i{position:absolute;bottom:0;left:0;height:4px;background:#8a6017}
.rank-detail-item.elite{border-color:#d2b46f;background:#fff9e9}
.rank-detail-item.elite i{background:#c18a22}
@media(max-width:1050px){.rank-detail-grid{grid-template-columns:repeat(5,minmax(0,1fr))}}
@media(max-width:760px){.rank-detail{padding:18px}.rank-detail-head{display:block}.rank-detail-head>p{margin-top:12px}.rank-detail-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.rank-detail-item{min-height:92px}}
.rank-modal{position:fixed;z-index:50;inset:0;display:grid;place-items:center;padding:24px;background:rgba(12,20,34,.66);backdrop-filter:blur(5px)}
.rank-modal-panel{position:relative;width:min(840px,100%);max-height:min(720px,calc(100vh - 48px));overflow:auto;padding:34px;border:1px solid #d1bd8b;background:#fffdf8;box-shadow:0 20px 60px rgba(0,0,0,.28)}
.rank-modal-close{position:absolute;top:12px;right:14px;width:34px;height:34px;border:1px solid #cfc5b3;border-radius:50%;background:#fffdf8;color:#142843;font:500 1.75rem/1 'DM Mono',monospace;cursor:pointer}
.rank-modal-close:hover,.rank-modal-close:focus-visible{border-color:#8a6017;color:#8a6017;outline:0}
@media(max-width:760px){.rank-modal{padding:12px}.rank-modal-panel{max-height:calc(100vh - 24px);padding:26px 18px}.rank-modal-close{top:9px;right:9px}}
.matchup-periods{display:flex;gap:7px;margin:24px 0 8px}
.matchup-periods button{min-width:105px;padding:9px 13px;border:1px solid #cfc5b3;background:#fffdf8;color:#66583e;font:800 .72rem 'DM Mono','Noto Sans TC',sans-serif;letter-spacing:.04em;cursor:pointer}
.matchup-periods button:hover,.matchup-periods button:focus-visible{border-color:#8a6017;color:#8a6017;outline:0}
.matchup-periods button.active{border-color:#142843;background:#142843;color:#fffdf8}
.matchup-games{display:grid;grid-template-columns:1fr auto 1fr;gap:14px;align-items:center;margin:0 0 12px;padding:9px 13px;border:1px solid #d3cfc2;background:#fffdf8;color:#5d6570;font:700 .72rem 'DM Mono','Noto Sans TC',sans-serif}
.matchup-games span:last-child{text-align:right}.matchup-games b{color:#8a6017;font-size:.95rem}.matchup-games em{color:#8a7155;font-style:normal;white-space:nowrap}
.projection-lab{margin-top:64px;padding-top:38px;border-top:1px solid #d3cfc2}.projection-controls{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:26px 0 10px}.projection-controls label{display:grid;gap:7px}.projection-controls label span{color:#786648;font:700 .67rem 'DM Mono',monospace;letter-spacing:.08em}.projection-controls select{width:100%;height:48px;padding:0 13px;border:1px solid #b7aa93;border-radius:4px;background:#fffdf8;color:#0c1422;font:800 .94rem 'Noto Sans TC',sans-serif}.projection-caption{margin:0 0 16px;color:#6a6d70;font-size:.78rem;line-height:1.65}.projection-totals{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));border:1px solid #cfc5b3;background:#fffdf8}.projection-totals article{display:grid;gap:6px;min-height:76px;padding:14px;border-right:1px solid #e4ddd0}.projection-totals article:nth-child(5n){border-right:0}.projection-totals article:nth-child(n+6){border-top:1px solid #e4ddd0}.projection-totals span{color:#77694f;font:700 .64rem 'DM Mono',monospace;letter-spacing:.05em}.projection-totals b{color:#142843;font:900 1.35rem/1 'DM Mono',monospace}.projection-totals article:last-child{background:#e9dfc6}.projection-totals article:last-child b{color:#8a6017}.projection-roster{margin-top:14px;border:1px solid #d3cfc2;background:#fffdf8}.projection-roster summary{min-height:50px;padding:0 17px;display:flex;align-items:center;color:#142843;font:800 .84rem 'Noto Sans TC',sans-serif;cursor:pointer}.projection-roster summary::marker{color:#8a6017}.projection-table-wrap{overflow-x:auto;border-top:1px solid #e4ddd0}.projection-roster table{width:100%;min-width:850px;border-collapse:collapse;text-align:center}.projection-roster th,.projection-roster td{padding:10px;border-bottom:1px solid #e4ddd0;font:700 .76rem 'DM Mono','Noto Sans TC',sans-serif}.projection-roster thead th{background:#142843;color:#fffdf8;font-size:.68rem}.projection-roster tbody th{color:#142843;text-align:left}.projection-roster tbody tr:last-child>*{border-bottom:0}
.matchup-extra{margin-top:14px;border:1px solid #d3cfc2;background:#fffdf8}
.matchup-extra summary{display:flex;align-items:center;min-height:50px;padding:0 17px;color:#142843;font:800 .84rem 'Noto Sans TC',sans-serif;cursor:pointer}
.matchup-extra summary::marker{color:#8a6017}
.matchup-extra-body{padding:0 17px 18px;border-top:1px solid #e4ddd0}
.matchup-extra-body>p{margin:13px 0;color:#6a6d70;font-size:.8rem}
.matchup-extra table{width:100%;border-collapse:collapse;text-align:center}
.matchup-extra th,.matchup-extra td{padding:9px;border:1px solid #e4ddd0;font:700 .78rem 'DM Mono','Noto Sans TC',sans-serif}
.matchup-extra thead th{background:#f0eadb;color:#142843}
.matchup-extra tbody th{color:#685839}
.matchup-extra th small{display:block;margin-top:2px;color:#8b8374;font-size:.62rem;font-weight:600}
@media(max-width:760px){.matchup-periods{overflow-x:auto;padding-bottom:3px}.matchup-periods button{min-width:96px}.matchup-games{gap:7px;padding:9px 8px;font-size:.62rem}.matchup-games em{font-size:.58rem}.projection-lab{margin-top:45px}.projection-controls{grid-template-columns:1fr;gap:10px}.projection-totals{grid-template-columns:repeat(3,minmax(0,1fr))}.projection-totals article:nth-child(5n){border-right:1px solid #e4ddd0}.projection-totals article:nth-child(3n){border-right:0}.projection-totals article:nth-child(n+4){border-top:1px solid #e4ddd0}.projection-roster summary{font-size:.78rem}.matchup-extra-body{padding-right:10px;padding-left:10px}.matchup-extra{overflow-x:auto}.matchup-extra table{min-width:460px}}
</style>
