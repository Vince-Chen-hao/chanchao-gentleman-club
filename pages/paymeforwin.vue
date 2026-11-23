<script setup lang="ts">
type TeamWeek = { team: string; gp: number; fgm: string; ftm: string; stats: string[] }

const route = useRoute()
const forecastOnly = computed(() => route.query.view === 'forecast')
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
const weekThree: TeamWeek[] = [
  { team: '阿肥加班幹大事', gp: 48, fgm: '236/510', ftm: '144/195', stats: ['.463', '.738', '68', '684', '233', '159', '38', '21', '73'] },
  { team: '哈利吸K', gp: 47, fgm: '186/427', ftm: '88/125', stats: ['.436', '.704', '72', '532', '214', '145', '34', '20', '76'] },
  { team: '字母主委', gp: 46, fgm: '255/538', ftm: '110/145', stats: ['.474', '.759', '66', '686', '251', '182', '43', '39', '96'] },
  { team: 'Gyuumao', gp: 49, fgm: '230/548', ftm: '139/176', stats: ['.420', '.790', '63', '662', '277', '177', '53', '20', '81'] },
  { team: '浪子踢球', gp: 47, fgm: '183/421', ftm: '79/100', stats: ['.435', '.790', '69', '514', '225', '137', '54', '36', '83'] },
  { team: '尬電鮪魚', gp: 45, fgm: '235/498', ftm: '119/146', stats: ['.472', '.815', '78', '667', '246', '140', '40', '30', '76'] },
  { team: '傻逼維特向前衝', gp: 45, fgm: '245/536', ftm: '116/159', stats: ['.457', '.730', '70', '676', '245', '180', '40', '19', '94'] },
  { team: '80年次男性屬羊', gp: 46, fgm: '212/475', ftm: '125/155', stats: ['.446', '.806', '66', '615', '237', '186', '44', '23', '95'] },
  { team: '卡店老闆的斑馬PSA10', gp: 52, fgm: '258/547', ftm: '148/186', stats: ['.472', '.796', '65', '729', '287', '162', '46', '50', '91'] },
  { team: '台北胯下大暖流艦隊', gp: 46, fgm: '190/365', ftm: '88/114', stats: ['.521', '.772', '53', '521', '222', '77', '28', '33', '62'] },
  { team: 'ALOMAR', gp: 42, fgm: '256/551', ftm: '117/145', stats: ['.465', '.807', '87', '716', '203', '148', '42', '26', '89'] },
  { team: '螞蟻雄兵閃身步絕地大反擊', gp: 45, fgm: '216/448', ftm: '130/153', stats: ['.482', '.850', '51', '613', '211', '109', '35', '14', '54'] },
  { team: 'Wei Too Strong', gp: 48, fgm: '195/411', ftm: '86/103', stats: ['.474', '.835', '52', '528', '230', '146', '49', '18', '67'] },
  { team: 'Wintersoldier', gp: 48, fgm: '256/597', ftm: '149/185', stats: ['.429', '.805', '96', '757', '234', '157', '36', '26', '92'] },
]
const weekFour: TeamWeek[] = [
  { team: '字母主委', gp: 46, fgm: '248/473', ftm: '113/158', stats: ['.524', '.715', '58', '667', '267', '159', '30', '42', '78'] },
  { team: '浪子踢球', gp: 47, fgm: '200/444', ftm: '110/125', stats: ['.450', '.880', '91', '601', '232', '138', '40', '35', '73'] },
  { team: '阿肥加班幹大事', gp: 50, fgm: '291/584', ftm: '104/134', stats: ['.498', '.776', '77', '763', '241', '176', '48', '21', '70'] },
  { team: '傻逼維特向前衝', gp: 47, fgm: '257/550', ftm: '108/139', stats: ['.467', '.777', '75', '697', '239', '160', '44', '27', '94'] },
  { team: 'Gyuumao', gp: 50, fgm: '265/575', ftm: '119/143', stats: ['.461', '.832', '91', '740', '263', '170', '43', '20', '91'] },
  { team: '卡店老闆的斑馬PSA10', gp: 50, fgm: '265/578', ftm: '137/168', stats: ['.458', '.815', '88', '755', '256', '166', '49', '38', '78'] },
  { team: '哈利吸K', gp: 48, fgm: '204/471', ftm: '142/170', stats: ['.433', '.835', '83', '633', '178', '170', '47', '22', '82'] },
  { team: 'ALOMAR', gp: 46, fgm: '254/540', ftm: '106/138', stats: ['.470', '.768', '105', '719', '231', '166', '42', '39', '87'] },
  { team: 'Wei Too Strong', gp: 50, fgm: '213/440', ftm: '98/123', stats: ['.484', '.797', '55', '579', '261', '163', '52', '23', '56'] },
  { team: '螞蟻雄兵閃身步絕地大反擊', gp: 46, fgm: '167/361', ftm: '88/107', stats: ['.463', '.822', '40', '462', '140', '107', '32', '18', '48'] },
  { team: 'Wintersoldier', gp: 50, fgm: '233/515', ftm: '124/149', stats: ['.452', '.832', '67', '657', '206', '131', '40', '29', '90'] },
  { team: '台北胯下大暖流艦隊', gp: 52, fgm: '195/383', ftm: '86/114', stats: ['.509', '.754', '67', '543', '248', '104', '27', '31', '59'] },
  { team: '80年次男性屬羊', gp: 50, fgm: '243/528', ftm: '167/195', stats: ['.460', '.856', '82', '735', '227', '197', '41', '19', '84'] },
  { team: '尬電鮪魚', gp: 44, fgm: '230/482', ftm: '93/119', stats: ['.477', '.782', '75', '628', '226', '124', '43', '33', '90'] },
]

const split = (value: string) => value.split('/').map(Number) as [number, number]
const canonicalTeam = (team: string) => ({
  '蟻人快歸來': '螞蟻雄兵閃身步絕地大反擊',
  '80年次男性': '80年次男性屬羊',
}[team] || team)
const combined = weekFour.map(current => {
  const entries = [weekOne, weekTwo, weekThree, weekFour].map(week => week.find(entry => canonicalTeam(entry.team) === canonicalTeam(current.team))!)
  const shooting = entries.map(entry => ({ fg: split(entry.fgm), ft: split(entry.ftm) }))
  const sums = current.stats.slice(2).map((_, index) => entries.reduce((total, entry) => total + Number(entry.stats[index + 2]), 0))
  return {
    team: current.team,
    gp: entries.reduce((total, entry) => total + entry.gp, 0),
    stats: [
      shooting.reduce((total, entry) => total + entry.fg[0], 0) / shooting.reduce((total, entry) => total + entry.fg[1], 0),
      shooting.reduce((total, entry) => total + entry.ft[0], 0) / shooting.reduce((total, entry) => total + entry.ft[1], 0),
      ...sums,
    ],
  }
})
type MatchupPeriod = 'combined' | 'weekOne' | 'weekTwo' | 'weekThree' | 'weekFour'
type MatchupTeam = { team: string; gp: number; stats: number[] }
const normalizeWeek = (entries: TeamWeek[]): MatchupTeam[] => entries.map(entry => ({ team: canonicalTeam(entry.team), gp: entry.gp, stats: entry.stats.map(Number) }))
const weeklyMatchupData = { weekOne: normalizeWeek(weekOne), weekTwo: normalizeWeek(weekTwo), weekThree: normalizeWeek(weekThree), weekFour: normalizeWeek(weekFour) }
const matchupPeriods: { id: MatchupPeriod; label: string; caption: string }[] = [
  { id: 'combined', label: '四週合計', caption: 'WEEK 1–4 · COMBINED' },
  { id: 'weekOne', label: 'WEEK 1', caption: 'WEEK 1 · FINAL' },
  { id: 'weekTwo', label: 'WEEK 2', caption: 'WEEK 2 · FINAL' },
  { id: 'weekThree', label: 'WEEK 3', caption: 'WEEK 3 · FINAL' },
  { id: 'weekFour', label: 'WEEK 4', caption: 'WEEK 4 · FINAL' },
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

type ProjectionPlayer = { name: string; nba: string; slot: string; fgm: number; fga: number; ftm: number; fta: number; stats: number[]; last14?: { fgm: number; fga: number; ftm: number; fta: number; stats: number[] } }
type ProjectionRange = 'week4' | 'week5' | 'week6' | 'week7'
const futureSchedule: Record<string, [number, number, number, number]> = {
  MIN: [4, 4, 4, 2], SAC: [3, 3, 3, 2], SAS: [4, 3, 4, 2], GSW: [3, 4, 3, 1], LAL: [3, 3, 3, 2], DAL: [3, 3, 4, 2], HOU: [4, 3, 3, 2], DEN: [3, 4, 3, 2], LAC: [3, 3, 4, 2], CLE: [4, 3, 3, 2], NYK: [4, 4, 3, 2], TOR: [4, 3, 3, 2], BKN: [2, 3, 4, 2], POR: [3, 4, 4, 2], IND: [4, 3, 3, 2], ORL: [3, 4, 3, 1], CHA: [3, 2, 3, 2], MEM: [4, 4, 4, 2], MIA: [3, 3, 3, 2], BOS: [3, 4, 3, 2], NOP: [4, 4, 3, 2], OKC: [4, 3, 3, 2], WAS: [4, 4, 2, 2], CHI: [3, 4, 3, 2], PHX: [4, 3, 3, 2], PHI: [3, 4, 3, 2],
}
const projectionTeams: { team: string; players: ProjectionPlayer[] }[] = [
  { team: "阿肥加班幹大事", players: [
    {"name":"Jalen Brunson","nba":"NYK","slot":"PG","fgm":9.2,"fga":21.1,"ftm":5.3,"fta":6.6,"stats":[3.1,26.8,3.1,5.9,0.8,0.3,1.9]},
    {"name":"Ziaire Williams","nba":"LAL","slot":"BN","fgm":3.3,"fga":6.1,"ftm":1,"fta":1.1,"stats":[1.6,9.1,2.2,1.8,1.3,0.1,0.4]},
    {"name":"De'Aaron Fox","nba":"SAS","slot":"G","fgm":4.2,"fga":8.8,"ftm":3.6,"fta":4.3,"stats":[0.9,12.9,4.1,5.5,1.3,0.4,2.5]},
    {"name":"Devin Vassell","nba":"SAS","slot":"SF","fgm":3.9,"fga":9.6,"ftm":2.1,"fta":2.4,"stats":[1.4,11.4,3.9,3,1.7,0.3,0.9]},
    {"name":"Julius Randle","nba":"BKN","slot":"PF","fgm":7,"fga":15,"ftm":5.5,"fta":6.9,"stats":[1.6,21.1,6,4.7,1.1,0.2,3.5]},
    {"name":"Tari Eason","nba":"HOU","slot":"F","fgm":4,"fga":9.2,"ftm":1.4,"fta":1.5,"stats":[1,10.4,6.1,1.5,0.9,0.9,1.4]},
    {"name":"Brook Lopez","nba":"LAC","slot":"C","fgm":5.9,"fga":10.7,"ftm":1.6,"fta":2.5,"stats":[1.9,15.4,5.2,2,0.6,0.9,1.1]},
    {"name":"Luke Kornet","nba":"SAS","slot":"C","fgm":1.3,"fga":2.5,"ftm":0.9,"fta":1.2,"stats":[0,3.4,3.8,1.1,0.1,0.7,0.3]},
    {"name":"Meleek Thomas","nba":"CLE","slot":"Util","fgm":4.9,"fga":10.6,"ftm":0.4,"fta":0.6,"stats":[2.4,12.7,2.7,1.8,1.4,0.2,1.2]},
    {"name":"Dylan Cardwell","nba":"SAC","slot":"Util","fgm":2,"fga":3.4,"ftm":1,"fta":2.1,"stats":[0,5,5.6,1.5,0.5,0.9,1.1]},
    {"name":"Nikola Jokić","nba":"DEN","slot":"Util","fgm":9.4,"fga":17.9,"ftm":4.1,"fta":4.5,"stats":[1.3,24.2,10.4,9.1,1.6,1,3.4]},
    {"name":"Jalen Suggs","nba":"ORL","slot":"SG","fgm":3.4,"fga":9.1,"ftm":0.9,"fta":1.4,"stats":[1.6,9.3,5.3,4.3,1.3,0.6,2.9]},
    {"name":"Jarrett Allen","nba":"CLE","slot":"BN","fgm":4.9,"fga":8.1,"ftm":2.5,"fta":3.4,"stats":[0.2,12.6,8.7,1.9,0.6,1.3,1.3]},
    {"name":"Deni Avdija","nba":"POR","slot":"BN","fgm":8,"fga":15.8,"ftm":6.1,"fta":8.5,"stats":[2.1,24.2,6.2,6.1,1.1,0.4,3.3]},
    {"name":"RJ Barrett","nba":"TOR","slot":"IL","fgm":8.1,"fga":17.1,"ftm":3.2,"fta":5.3,"stats":[1.5,20.9,6.4,4.3,0.4,0.5,1.9]},
  ] },
  { team: "Wei Too Strong", players: [
    {"name":"Tyrese Maxey","nba":"PHI","slot":"BN","fgm":8.9,"fga":17.7,"ftm":6.1,"fta":7,"stats":[2.7,26.5,3.3,5.8,1.3,0.5,2]},
    {"name":"Trey Murphy III","nba":"NOP","slot":"IL","fgm":5.2,"fga":11.1,"ftm":3,"fta":3.5,"stats":[2.3,15.7,4.7,3.3,1.1,0.3,1.5]},
    {"name":"VJ Edgecombe","nba":"PHI","slot":"BN","fgm":5.3,"fga":11.5,"ftm":1.3,"fta":1.7,"stats":[1.7,13.6,6.5,3.9,1.7,0.4,1.3]},
    {"name":"Jaime Jaquez Jr.","nba":"MIL","slot":"SF","fgm":5.3,"fga":11.6,"ftm":2.5,"fta":3.3,"stats":[1.9,15,5.1,3,0.7,0.1,2.1]},
    {"name":"Sidy Cissoko","nba":"POR","slot":"Util","fgm":2.5,"fga":5.4,"ftm":1.5,"fta":2.1,"stats":[1.3,7.9,3.8,2,0.6,0.3,0.7]},
    {"name":"Keldon Johnson","nba":"SAS","slot":"F","fgm":3.3,"fga":6.9,"ftm":1.8,"fta":2.4,"stats":[0.3,8.7,5.6,2.3,0.8,0,1.1]},
    {"name":"Isaiah Jackson","nba":"LAC","slot":"C","fgm":3.5,"fga":5.9,"ftm":1,"fta":1.5,"stats":[0.2,8.1,5.2,1.9,1.2,1.1,1.5]},
    {"name":"Robert Williams III","nba":"POR","slot":"C","fgm":2.8,"fga":4.3,"ftm":1,"fta":1.2,"stats":[0,6.5,6.6,1.3,0.8,1,0.9]},
    {"name":"Anthony Davis","nba":"WAS","slot":"Util","fgm":9.7,"fga":18.4,"ftm":5.1,"fta":6.3,"stats":[0.7,25.3,10.1,2.1,1.1,1.1,2.1]},
    {"name":"Brandin Podziemski","nba":"GSW","slot":"PG","fgm":5.5,"fga":12.3,"ftm":2.4,"fta":3.3,"stats":[2.4,15.8,4.7,3.6,1.1,0.5,1.4]},
    {"name":"Quenton Jackson","nba":"IND","slot":"Util","fgm":3.4,"fga":7.1,"ftm":1.5,"fta":1.8,"stats":[1.1,9.4,3.6,3,1.4,0.2,1.4]},
    {"name":"Dyson Daniels","nba":"ATL","slot":"G","fgm":4.3,"fga":8.8,"ftm":0.8,"fta":1.4,"stats":[0.2,9.6,7.6,5.8,2.9,0.3,1.3]},
    {"name":"Christian Braun","nba":"DEN","slot":"SG","fgm":5.1,"fga":10.4,"ftm":1.4,"fta":1.8,"stats":[1.6,13.2,4.4,2.4,2.3,0.4,1.1]},
    {"name":"Draymond Green","nba":"GSW","slot":"PF","fgm":1.3,"fga":3.2,"ftm":0.2,"fta":0.5,"stats":[0.3,3.2,4.7,6.5,0.9,0.9,2.5]},
    {"name":"Precious Achiuwa","nba":"SAC","slot":"BN","fgm":3.9,"fga":7.3,"ftm":1,"fta":2,"stats":[0.3,9.2,5.9,1,1.1,1,1.2]},
  ] },
]
const verifiedWeekFiveAverages: Record<'season' | 'last14', Record<string, { fgm: number; fga: number; ftm: number; fta: number; stats: number[] }>> = {
  season: {
    "Jalen Brunson": {"fgm":9.2,"fga":21.1,"ftm":5.3,"fta":6.6,"stats":[3.1,26.8,3.1,5.9,0.8,0.3,1.9]},
    "Ziaire Williams": {"fgm":3.3,"fga":6.1,"ftm":1,"fta":1.1,"stats":[1.6,9.1,2.2,1.8,1.3,0.1,0.4]},
    "De'Aaron Fox": {"fgm":4.2,"fga":8.8,"ftm":3.6,"fta":4.3,"stats":[0.9,12.9,4.1,5.5,1.3,0.4,2.5]},
    "Devin Vassell": {"fgm":3.9,"fga":9.6,"ftm":2.1,"fta":2.4,"stats":[1.4,11.4,3.9,3,1.7,0.3,0.9]},
    "Julius Randle": {"fgm":7,"fga":15,"ftm":5.5,"fta":6.9,"stats":[1.6,21.1,6,4.7,1.1,0.2,3.5]},
    "Tari Eason": {"fgm":4,"fga":9.2,"ftm":1.4,"fta":1.5,"stats":[1,10.4,6.1,1.5,0.9,0.9,1.4]},
    "Brook Lopez": {"fgm":5.9,"fga":10.7,"ftm":1.6,"fta":2.5,"stats":[1.9,15.4,5.2,2,0.6,0.9,1.1]},
    "Luke Kornet": {"fgm":1.3,"fga":2.5,"ftm":0.9,"fta":1.2,"stats":[0,3.4,3.8,1.1,0.1,0.7,0.3]},
    "Meleek Thomas": {"fgm":4.9,"fga":10.6,"ftm":0.4,"fta":0.6,"stats":[2.4,12.7,2.7,1.8,1.4,0.2,1.2]},
    "Dylan Cardwell": {"fgm":2,"fga":3.4,"ftm":1,"fta":2.1,"stats":[0,5,5.6,1.5,0.5,0.9,1.1]},
    "Nikola Jokić": {"fgm":9.4,"fga":17.9,"ftm":4.1,"fta":4.5,"stats":[1.3,24.2,10.4,9.1,1.6,1,3.4]},
    "Jalen Suggs": {"fgm":3.4,"fga":9.1,"ftm":0.9,"fta":1.4,"stats":[1.6,9.3,5.3,4.3,1.3,0.6,2.9]},
    "Jarrett Allen": {"fgm":4.9,"fga":8.1,"ftm":2.5,"fta":3.4,"stats":[0.2,12.6,8.7,1.9,0.6,1.3,1.3]},
    "Deni Avdija": {"fgm":8,"fga":15.8,"ftm":6.1,"fta":8.5,"stats":[2.1,24.2,6.2,6.1,1.1,0.4,3.3]},
    "RJ Barrett": {"fgm":8.1,"fga":17.1,"ftm":3.2,"fta":5.3,"stats":[1.5,20.9,6.4,4.3,0.4,0.5,1.9]},
    "Tyrese Maxey": {"fgm":8.9,"fga":17.7,"ftm":6.1,"fta":7,"stats":[2.7,26.5,3.3,5.8,1.3,0.5,2]},
    "Trey Murphy III": {"fgm":5.2,"fga":11.1,"ftm":3,"fta":3.5,"stats":[2.3,15.7,4.7,3.3,1.1,0.3,1.5]},
    "VJ Edgecombe": {"fgm":5.3,"fga":11.5,"ftm":1.3,"fta":1.7,"stats":[1.7,13.6,6.5,3.9,1.7,0.4,1.3]},
    "Jaime Jaquez Jr.": {"fgm":5.3,"fga":11.6,"ftm":2.5,"fta":3.3,"stats":[1.9,15,5.1,3,0.7,0.1,2.1]},
    "Sidy Cissoko": {"fgm":2.5,"fga":5.4,"ftm":1.5,"fta":2.1,"stats":[1.3,7.9,3.8,2,0.6,0.3,0.7]},
    "Keldon Johnson": {"fgm":3.3,"fga":6.9,"ftm":1.8,"fta":2.4,"stats":[0.3,8.7,5.6,2.3,0.8,0,1.1]},
    "Isaiah Jackson": {"fgm":3.5,"fga":5.9,"ftm":1,"fta":1.5,"stats":[0.2,8.1,5.2,1.9,1.2,1.1,1.5]},
    "Robert Williams III": {"fgm":2.8,"fga":4.3,"ftm":1,"fta":1.2,"stats":[0,6.5,6.6,1.3,0.8,1,0.9]},
    "Anthony Davis": {"fgm":9.7,"fga":18.4,"ftm":5.1,"fta":6.3,"stats":[0.7,25.3,10.1,2.1,1.1,1.1,2.1]},
    "Brandin Podziemski": {"fgm":5.5,"fga":12.3,"ftm":2.4,"fta":3.3,"stats":[2.4,15.8,4.7,3.6,1.1,0.5,1.4]},
    "Quenton Jackson": {"fgm":3.4,"fga":7.1,"ftm":1.5,"fta":1.8,"stats":[1.1,9.4,3.6,3,1.4,0.2,1.4]},
    "Dyson Daniels": {"fgm":4.3,"fga":8.8,"ftm":0.8,"fta":1.4,"stats":[0.2,9.6,7.6,5.8,2.9,0.3,1.3]},
    "Christian Braun": {"fgm":5.1,"fga":10.4,"ftm":1.4,"fta":1.8,"stats":[1.6,13.2,4.4,2.4,2.3,0.4,1.1]},
    "Draymond Green": {"fgm":1.3,"fga":3.2,"ftm":0.2,"fta":0.5,"stats":[0.3,3.2,4.7,6.5,0.9,0.9,2.5]},
    "Precious Achiuwa": {"fgm":3.9,"fga":7.3,"ftm":1,"fta":2,"stats":[0.3,9.2,5.9,1,1.1,1,1.2]},
  },
  last14: {
    "Jalen Brunson": {"fgm":9.7,"fga":21.4,"ftm":4.6,"fta":5,"stats":[3.6,27.6,3.3,6.3,0.9,0.3,2.1]},
    "Ziaire Williams": {"fgm":3,"fga":5.7,"ftm":0.7,"fta":0.9,"stats":[1.3,8,1.4,1.7,1,0.1,0.3]},
    "De'Aaron Fox": {"fgm":3.2,"fga":8.2,"ftm":3.3,"fta":3.7,"stats":[0.8,10.5,4.2,4.8,1.3,0.2,2]},
    "Devin Vassell": {"fgm":4,"fga":9.4,"ftm":2,"fta":2.4,"stats":[1,11,3.8,2.8,1.8,0.2,0.4]},
    "Julius Randle": {"fgm":7.7,"fga":15.1,"ftm":4.3,"fta":5.7,"stats":[1.4,21.1,4.7,4.7,1.4,0.3,3]},
    "Tari Eason": {"fgm":4.1,"fga":10.1,"ftm":1.1,"fta":1.4,"stats":[1.1,10.5,6.3,1.8,0.8,0.5,1.8]},
    "Brook Lopez": {"fgm":6.8,"fga":12.5,"ftm":1.7,"fta":2.7,"stats":[2.5,17.8,5.3,3.3,0.7,0.5,1]},
    "Luke Kornet": {"fgm":1.6,"fga":3,"ftm":1,"fta":1.1,"stats":[0,4.1,3.3,1.4,0,0.9,0.1]},
    "Meleek Thomas": {"fgm":5,"fga":11,"ftm":0.3,"fta":0.5,"stats":[2.4,12.6,3,2.3,1.5,0.3,1.3]},
    "Dylan Cardwell": {"fgm":1.8,"fga":3,"ftm":0.8,"fta":1.7,"stats":[0,4.5,6.2,1.5,0.3,0.8,1.3]},
    "Nikola Jokić": {"fgm":10.2,"fga":17.3,"ftm":4,"fta":4.3,"stats":[1.7,26,10.8,9,1,0.8,3.5]},
    "Jalen Suggs": {"fgm":3.5,"fga":9,"ftm":0.8,"fta":1.5,"stats":[2.5,10.3,5.5,3.3,0.8,0.8,2.8]},
    "Jarrett Allen": {"fgm":4.7,"fga":7.8,"ftm":2.2,"fta":2.7,"stats":[0.2,11.7,10,2.7,0.7,1,1.8]},
    "Deni Avdija": {"fgm":8.8,"fga":16,"ftm":5.2,"fta":6.2,"stats":[2.8,25.6,5.4,4.6,1.4,0.8,3.8]},
    "RJ Barrett": {"fgm":8,"fga":17,"ftm":2.2,"fta":4.2,"stats":[1.4,19.6,7,5,0.4,0.6,2.2]},
    "Tyrese Maxey": {"fgm":8.2,"fga":14.4,"ftm":6.2,"fta":6.8,"stats":[3.2,25.8,2.4,6.8,0.8,0.2,1.8]},
    "Trey Murphy III": {"fgm":7,"fga":13.5,"ftm":4,"fta":4.5,"stats":[3.5,21.5,5.5,2,1.5,0.5,1.5]},
    "VJ Edgecombe": {"fgm":5.3,"fga":11.5,"ftm":2,"fta":2.3,"stats":[1.5,14.2,6.5,5.3,2,0.3,1.5]},
    "Jaime Jaquez Jr.": {"fgm":4.3,"fga":10.3,"ftm":2.7,"fta":3.1,"stats":[1.9,13.1,3.7,3.3,1,0,2.1]},
    "Sidy Cissoko": {"fgm":3.1,"fga":6.9,"ftm":1.6,"fta":2,"stats":[1.7,9.6,3.7,1.7,0.9,0.1,0.7]},
    "Keldon Johnson": {"fgm":3.6,"fga":7.1,"ftm":2,"fta":2.6,"stats":[0.4,9.6,5.6,3,1.3,0,1.4]},
    "Isaiah Jackson": {"fgm":3,"fga":5,"ftm":1,"fta":1.2,"stats":[0.2,7.2,3.6,1.4,1,1.6,0.6]},
    "Robert Williams III": {"fgm":2,"fga":3,"ftm":1.2,"fta":1.2,"stats":[0,5.2,6.2,1.4,0.4,0.6,1]},
    "Anthony Davis": {"fgm":10.4,"fga":18.6,"ftm":6.1,"fta":7.7,"stats":[0.6,27.6,11.1,2.1,0.9,1.1,2.1]},
    "Brandin Podziemski": {"fgm":5.3,"fga":12.8,"ftm":2.8,"fta":3.7,"stats":[2.3,15.8,3.8,2.8,0.8,0.5,1.3]},
    "Quenton Jackson": {"fgm":3.2,"fga":6.7,"ftm":0.7,"fta":1,"stats":[1.3,8.3,3.7,3.8,1.7,0,1.7]},
    "Dyson Daniels": {"fgm":4.2,"fga":7.4,"ftm":0.4,"fta":0.8,"stats":[0.4,9.2,8.6,6.2,2.8,0,1.4]},
    "Christian Braun": {"fgm":5,"fga":11.2,"ftm":1.3,"fta":1.8,"stats":[1.5,12.8,5,2.8,2.7,0.7,0.8]},
    "Draymond Green": {"fgm":1.6,"fga":3,"ftm":0,"fta":0,"stats":[0.4,3.6,4,4.6,0.8,0.8,1.2]},
    "Precious Achiuwa": {"fgm":2,"fga":3.5,"ftm":1.3,"fta":1.8,"stats":[0.3,5.5,6,0.8,0.3,0.5,2]},
  },
}
const weekFiveSlots: Record<string, string> = {"Jalen Brunson":"PG","Ziaire Williams":"BN","De'Aaron Fox":"G","Devin Vassell":"SF","Julius Randle":"PF","Tari Eason":"F","Brook Lopez":"C","Luke Kornet":"C","Meleek Thomas":"Util","Dylan Cardwell":"Util","Nikola Jokić":"Util","Jalen Suggs":"SG","Jarrett Allen":"BN","Deni Avdija":"BN","RJ Barrett":"IL","Tyrese Maxey":"BN","Trey Murphy III":"IL","VJ Edgecombe":"BN","Jaime Jaquez Jr.":"SF","Sidy Cissoko":"Util","Keldon Johnson":"F","Isaiah Jackson":"C","Robert Williams III":"C","Anthony Davis":"Util","Brandin Podziemski":"PG","Quenton Jackson":"Util","Dyson Daniels":"G","Christian Braun":"SG","Draymond Green":"PF","Precious Achiuwa":"BN"}
const latestProjectionRange = (): ProjectionRange => {
  const weeks: [ProjectionRange, number][] = [
    ['week7', Date.parse('2026-11-30T00:00:00+08:00')],
    ['week6', Date.parse('2026-11-23T00:00:00+08:00')],
    ['week5', Date.parse('2026-11-16T00:00:00+08:00')],
  ]
  return weeks.find(([, start]) => Date.now() >= start)?.[0] || 'week4'
}
const projectionRange = ref<ProjectionRange>(latestProjectionRange())
const leftProjectionTeam = ref(projectionTeams[0].team)
const rightProjectionTeam = ref(projectionTeams[1].team)
const activeProjectionDetail = ref<'left' | 'right' | null>(null)
const championshipAnswer = '阿肥加班幹大事'
const championOptions = [...combined.map(entry => entry.team).filter(team => team !== championshipAnswer), championshipAnswer]
const forecastGate = ref<'quiz' | 'wrong' | 'correct' | 'revealed'>('quiz')
const championGuess = ref('')
const wrongAttempt = ref(0)
const chooseChampion = (team: string) => {
  championGuess.value = team
  if (team !== championshipAnswer) { wrongAttempt.value += 1; forecastGate.value = 'wrong'; return }
  forecastGate.value = 'correct'
  window.setTimeout(() => { forecastGate.value = 'revealed' }, 1250)
}
const projectionRangeLabels: Record<ProjectionRange, string> = { week4: 'WEEK 4', week5: 'WEEK 5', week6: 'WEEK 6', week7: 'WEEK 7' }
// Exact NBA Week 5 (2026-11-16 to 2026-11-22) game counts, checked against the weekly schedule.
// Keep this explicit so a missing club can never silently become 0 games in this matchup.
const weekFiveGameCounts: Record<string, number> = {
  ATL: 3, BKN: 3, BOS: 4, CHA: 2, CHI: 4, CLE: 3, DAL: 3, DEN: 4, DET: 4, GSW: 4,
  HOU: 3, IND: 3, LAC: 3, LAL: 3, MEM: 4, MIA: 3, MIL: 3, MIN: 4, NOP: 4, NYK: 4,
  OKC: 3, ORL: 4, PHI: 3, PHX: 3, POR: 4, SAC: 3, SAS: 3, TOR: 3, UTA: 4, WAS: 4,
}
// Yahoo Nov. 21 completed totals and Nov. 22 games; bench included, IL excluded.
const weekFiveRemainingGames: Record<string, Record<string, number>> = {
  "阿肥加班幹大事": {
    "Jalen Brunson": 0,
    "Jalen Suggs": 0,
    "Nikola Jokić": 1
  },
  "Wei Too Strong": {
    "Brandin Podziemski": 1,
    "Christian Braun": 1,
    "Dyson Daniels": 1,
    "Draymond Green": 1,
    "Anthony Davis": 1,
    "Quenton Jackson": 1
  }
}
const weekFiveLive: Record<string, LiveProjection> = {
  "阿肥加班幹大事": {
    "gp": 44,
    "fgm": 220,
    "fga": 445,
    "ftm": 93,
    "fta": 114,
    "stats": [
      68,
      601,
      224,
      149,
      36,
      21,
      85
    ]
  },
  "Wei Too Strong": {
    "gp": 43,
    "fgm": 166,
    "fga": 342,
    "ftm": 75,
    "fta": 95,
    "stats": [
      47,
      454,
      171,
      114,
      49,
      22,
      53
    ]
  }
}
const projectionGameCount = (nba: string, range = projectionRange.value) => {
  if (range === 'week5') return weekFiveGameCounts[nba] || 0
  const games = futureSchedule[nba] || [0, 0, 0, 0]
  return games[{ week4: 0, week5: 1, week6: 2, week7: 3 }[range]]
}
type LiveProjection = { gp: number; fgm: number; fga: number; ftm: number; fta: number; stats: number[] }
// Unstarted games on Yahoo dates Nov. 15; bench included, IL excluded.
const weekFourRemainingGames: Record<string, Record<string, number>> = {
  "阿肥加班幹大事": {
    "Zaccharie Risacher": 1,
    "De'Aaron Fox": 1,
    "Ziaire Williams": 1,
    "Jalen Brunson": 1,
    "Obi Toppin": 1,
    "Tari Eason": 1,
    "Brook Lopez": 1,
    "RJ Barrett": 1,
    "Devin Vassell": 1
  },
  "80年次男性屬羊": {
    "Andrew Nembhard": 1,
    "Gradey Dick": 1,
    "Aaron Nesmith": 1,
    "Kenrich Williams": 1,
    "Neemias Queta": 1,
    "Trae Young": 1,
    "Coby White": 1,
    "Jayson Tatum": 1
  }
}
const weekFourLive: Record<string, LiveProjection> = {
  "阿肥加班幹大事": {
    "gp": 41,
    "fgm": 248,
    "fga": 497,
    "ftm": 89,
    "fta": 114,
    "stats": [
      69,
      654,
      208,
      147,
      41,
      20,
      58
    ]
  },
  "80年次男性屬羊": {
    "gp": 42,
    "fgm": 209,
    "fga": 466,
    "ftm": 152,
    "fta": 178,
    "stats": [
      70,
      640,
      207,
      174,
      37,
      18,
      75
    ]
  }
}
const projectedPlayersFor = (team: string, range = projectionRange.value) => {
  const live = range === 'week4' ? weekFourLive[team] : undefined
  return projectionTeams.find(entry => entry.team === team)!.players.filter(player => player.slot !== 'IL').map(player => ({
    ...player,
    slot: weekFiveSlots[player.name] || player.slot,
    gp: live ? (weekFourRemainingGames[team]?.[player.name] || 0) : projectionGameCount(player.nba, range),
  }))
}
const calculateProjection = (team: string) => {
  const totals = projectedPlayersFor(team).reduce((sum, player) => {
    sum.gp += player.gp; sum.fgm += player.fgm * player.gp; sum.fga += player.fga * player.gp; sum.ftm += player.ftm * player.gp; sum.fta += player.fta * player.gp
    player.stats.forEach((value, index) => { sum.stats[index] += value * player.gp })
    return sum
  }, { gp: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, stats: Array(7).fill(0) as number[] })
  const live = projectionRange.value === 'week4' ? weekFourLive[team] : undefined
  const values = live
    ? [
        (live.fgm + totals.fgm) / (live.fga + totals.fga),
        (live.ftm + totals.ftm) / (live.fta + totals.fta),
        ...totals.stats.map((value, index) => value + live.stats[index]),
      ]
    : [totals.fga ? totals.fgm / totals.fga : 0, totals.fta ? totals.ftm / totals.fta : 0, ...totals.stats]
  return { players: projectedPlayersFor(team), gp: totals.gp + (live?.gp || 0), values }
}
const leftProjection = computed(() => calculateProjection(leftProjectionTeam.value))
const rightProjection = computed(() => calculateProjection(rightProjectionTeam.value))
const activeProjection = computed(() => activeProjectionDetail.value === 'left' ? leftProjection.value : rightProjection.value)
const activeProjectionTeam = computed(() => activeProjectionDetail.value === 'left' ? leftProjectionTeam.value : rightProjectionTeam.value)
const formatProjection = (value: number, index: number) => index < 2 ? value.toFixed(3).replace(/^0/, '') : String(Math.round(value))
const projectionRows = computed(() => categories.map((category, index) => {
  const left = leftProjection.value.values[index]; const right = rightProjection.value.values[index]
  const result = index === 8 ? right - left : left - right
  return { category, left: formatProjection(left, index), right: formatProjection(right, index), winner: result === 0 ? 'tie' : result > 0 ? 'left' : 'right', note: result === 0 ? '平手' : result > 0 ? '左方優勢' : '右方優勢' }
}))
const projectionSummary = computed(() => ({ left: projectionRows.value.filter(row => row.winner === 'left').length, right: projectionRows.value.filter(row => row.winner === 'right').length }))

type WeekFiveSource = 'season' | 'last14'
const weekFiveSource = ref<WeekFiveSource>('season')
const weekFivePlayerAverage = (player: ProjectionPlayer) => verifiedWeekFiveAverages[weekFiveSource.value][player.name] || (weekFiveSource.value === 'last14' && player.last14 ? player.last14 : player)
const weekFiveRosterForecast = computed(() => {
  const makeTeam = (team: string) => {
    const players = projectionTeams.find(entry => entry.team === team)!.players
      .filter(player => player.slot !== 'IL')
      .map(player => ({ ...player, gp: weekFiveRemainingGames[team]?.[player.name] || 0 }))
    const totals = players.reduce((sum, player) => {
      const average = weekFivePlayerAverage(player)
      sum.gp += player.gp
      sum.fgm += average.fgm * player.gp; sum.fga += average.fga * player.gp
      sum.ftm += average.ftm * player.gp; sum.fta += average.fta * player.gp
      average.stats.forEach((value, index) => { sum.stats[index] += value * player.gp })
      return sum
    }, { gp: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, stats: Array(7).fill(0) as number[] })
    const current = weekFiveLive[team]
    const currentValues = [current.fgm / current.fga, current.ftm / current.fta, ...current.stats]
    const remainingValues = [totals.fgm / totals.fga, totals.ftm / totals.fta, ...totals.stats]
    const values = [
      (current.fgm + totals.fgm) / (current.fga + totals.fga),
      (current.ftm + totals.ftm) / (current.fta + totals.fta),
      ...totals.stats.map((value, index) => value + current.stats[index]),
    ]
    return { team, players, gp: current.gp + totals.gp, remainingGp: totals.gp, currentValues, remainingValues, values }
  }
  return { left: makeTeam('阿肥加班幹大事'), right: makeTeam('Wei Too Strong') }
})
const weekFiveRosterRows = computed(() => categories.map((category, index) => {
  const leftTeam = weekFiveRosterForecast.value.left
  const rightTeam = weekFiveRosterForecast.value.right
  const left = leftTeam.values[index]
  const right = rightTeam.values[index]
  const result = index === 8 ? right - left : left - right
  return { category, left: formatProjection(left, index), right: formatProjection(right, index), leftCurrent: formatProjection(leftTeam.currentValues[index], index), rightCurrent: formatProjection(rightTeam.currentValues[index], index), leftAdd: formatProjection(leftTeam.remainingValues[index], index), rightAdd: formatProjection(rightTeam.remainingValues[index], index), winner: result === 0 ? 'tie' : result > 0 ? 'left' : 'right', edge: result === 0 ? '平手' : `${result > 0 ? '阿肥加班幹大事' : 'Wei Too Strong'} +${Math.abs(result).toFixed(index < 2 ? 4 : 1)}` }
}))
const weekFiveRosterSummary = computed(() => ({ left: weekFiveRosterRows.value.filter(row => row.winner === 'left').length, right: weekFiveRosterRows.value.filter(row => row.winner === 'right').length }))
const activeWeekFiveDetail = ref<'left' | 'right' | null>(null)
const activeWeekFiveTeam = computed(() => activeWeekFiveDetail.value === 'left' ? weekFiveRosterForecast.value.left : weekFiveRosterForecast.value.right)
const weekFivePlayerStat = (_team: string, player: ProjectionPlayer, index: number) => weekFivePlayerAverage(player).stats[index] * player.gp

// Week 6 (Nov 23–29), Yahoo roster and season averages checked Nov. 22.
// Assume every non-IL player plays their full NBA schedule, including BN.
const weekSixFeiPlayers: ProjectionPlayer[] = [
  {"name":"De'Aaron Fox","nba":"SAS","slot":"PG","fgm":4,"fga":8.5,"ftm":3.6,"fta":4.2,"stats":[0.8,12.4,3.9,5.8,1.3,0.4,2.5]},
  {"name":"Jalen Suggs","nba":"ORL","slot":"SG","fgm":3.4,"fga":9.1,"ftm":0.9,"fta":1.4,"stats":[1.6,9.3,5.3,4.3,1.3,0.6,2.9]},
  {"name":"Jalen Brunson","nba":"NYK","slot":"G","fgm":9.2,"fga":21.1,"ftm":5.3,"fta":6.6,"stats":[3.1,26.8,3.1,5.9,0.8,0.3,1.9]},
  {"name":"Will Richard","nba":"GSW","slot":"SF","fgm":2.8,"fga":5.5,"ftm":0.9,"fta":1.1,"stats":[1.1,7.5,2.3,1,0.7,0.2,0.9]},
  {"name":"Julius Randle","nba":"BKN","slot":"PF","fgm":7,"fga":15,"ftm":5.5,"fta":6.9,"stats":[1.6,21.1,6,4.7,1.1,0.2,3.5]},
  {"name":"Tari Eason","nba":"HOU","slot":"F","fgm":4,"fga":9.2,"ftm":1.4,"fta":1.5,"stats":[1,10.4,6.1,1.5,0.9,0.9,1.4]},
  {"name":"Brook Lopez","nba":"LAC","slot":"C","fgm":6.1,"fga":11,"ftm":1.8,"fta":2.6,"stats":[1.8,15.7,5.3,1.9,0.5,0.9,1.3]},
  {"name":"Jarrett Allen","nba":"CLE","slot":"C","fgm":4.9,"fga":8.1,"ftm":2.5,"fta":3.4,"stats":[0.2,12.6,8.7,1.9,0.6,1.3,1.3]},
  {"name":"Meleek Thomas","nba":"CLE","slot":"Util","fgm":4.9,"fga":10.6,"ftm":0.4,"fta":0.6,"stats":[2.4,12.7,2.7,1.8,1.4,0.2,1.2]},
  {"name":"Dylan Cardwell","nba":"SAC","slot":"Util","fgm":1.8,"fga":3,"ftm":0.9,"fta":1.9,"stats":[0,4.4,5.1,1.3,0.4,0.8,1]},
  {"name":"Nikola Jokić","nba":"DEN","slot":"Util","fgm":9.4,"fga":17.9,"ftm":4.1,"fta":4.5,"stats":[1.3,24.2,10.4,9.1,1.6,1,3.4]},
  {"name":"Devin Vassell","nba":"SAS","slot":"BN","fgm":3.8,"fga":9.5,"ftm":2.3,"fta":2.5,"stats":[1.4,11.3,3.9,2.9,1.6,0.4,0.9]},
  {"name":"Ziaire Williams","nba":"LAL","slot":"BN","fgm":3.3,"fga":6.1,"ftm":1,"fta":1.1,"stats":[1.6,9.1,2.2,1.8,1.3,0.1,0.4]},
  {"name":"Deni Avdija","nba":"POR","slot":"BN","fgm":7.9,"fga":15.6,"ftm":5.9,"fta":8.4,"stats":[2.1,23.9,6.4,6,1,0.5,3.2]},
  {"name":"RJ Barrett","nba":"TOR","slot":"IL","fgm":8.1,"fga":17.1,"ftm":3.2,"fta":5.3,"stats":[1.5,20.9,6.4,4.3,0.4,0.5,1.9]},
]
const weekSixAlomarPlayers: ProjectionPlayer[] = [
  {"name":"Josh Giddey","nba":"CHI","slot":"PG","fgm":3.8,"fga":9.1,"ftm":1.2,"fta":1.9,"stats":[1.1,9.9,5.9,8.4,0.4,0.5,3.3]},
  {"name":"Jordan Poole","nba":"NOP","slot":"SG","fgm":2.8,"fga":7.2,"ftm":4.4,"fta":4.8,"stats":[1.4,11.3,1.8,3.2,0.7,0.3,1.1]},
  {"name":"Kyrie Irving","nba":"DAL","slot":"G","fgm":8.1,"fga":17.6,"ftm":3,"fta":3.5,"stats":[3.3,22.5,3.8,4.4,1.2,0.4,1.5]},
  {"name":"Klay Thompson","nba":"MIA","slot":"SF","fgm":5.2,"fga":11.6,"ftm":0.8,"fta":0.8,"stats":[4.1,15.3,1.4,2,0.1,0.8,0.9]},
  {"name":"Rui Hachimura","nba":"LAC","slot":"PF","fgm":5,"fga":11.9,"ftm":1.8,"fta":2.7,"stats":[2.2,14,6.2,1.5,0.9,0.2,1.7]},
  {"name":"Paul George","nba":"BOS","slot":"F","fgm":7.1,"fga":15.8,"ftm":2.4,"fta":3.1,"stats":[3.3,19.9,5.6,3.8,2.2,0.4,2.6]},
  {"name":"Jakob Poeltl","nba":"TOR","slot":"C","fgm":3.6,"fga":6.1,"ftm":0.9,"fta":1.6,"stats":[0,8.2,6.8,1.7,0.9,0.8,1]},
  {"name":"Mo Bamba","nba":"UTA","slot":"C","fgm":3.7,"fga":5.1,"ftm":1,"fta":1.7,"stats":[0.5,8.9,6.6,1,0.4,1.7,0.6]},
  {"name":"Luka Dončić","nba":"LAL","slot":"Util","fgm":11.7,"fga":25.1,"ftm":8.8,"fta":10.2,"stats":[4.9,37.2,6.8,7.7,1.9,0.6,5.1]},
  {"name":"LeBron James","nba":"PHI","slot":"Util","fgm":6.1,"fga":13.1,"ftm":3.2,"fta":4.2,"stats":[0.8,16.1,6.8,6.8,1.2,0.7,2.4]},
  {"name":"Ryan Rollins","nba":"MIL","slot":"Util","fgm":4,"fga":10.1,"ftm":1.2,"fta":1.7,"stats":[1.5,10.7,4.9,3.9,0.9,0.3,2.3]},
  {"name":"Devin Booker","nba":"PHX","slot":"BN","fgm":8.4,"fga":17.7,"ftm":6,"fta":6.5,"stats":[1.9,24.7,2.7,5.3,1.1,0.3,2.3]},
  {"name":"Derrick Jones Jr.","nba":"LAC","slot":"BN","fgm":3.6,"fga":7.2,"ftm":1.2,"fta":2.1,"stats":[1.8,10.3,4.5,1.2,0.9,0.9,1.2]},
  {"name":"Naz Reid","nba":"CHA","slot":"BN","fgm":6.6,"fga":17,"ftm":1.6,"fta":2.5,"stats":[2.5,17.3,8.5,2.4,0.9,0.5,2.5]},
  {"name":"Ja Morant","nba":"POR","slot":"IL","fgm":6.5,"fga":12,"ftm":1.3,"fta":1.5,"stats":[1.5,15.8,2.5,5.5,1,0,1.3]},
  {"name":"Brandon Ingram","nba":"LAC","slot":"IL","fgm":0,"fga":0,"ftm":0,"fta":0,"stats":[0,0,0,0,0,0,0]},
]
const weekSixGames: Record<string, number> = {"PHI":4,"MIL":4,"LAC":4,"MEM":4,"BKN":4,"SAS":4,"PHX":4,"MIN":4,"POR":4,"CHI":3,"CLE":3,"BOS":3,"MIA":3,"CHA":3,"UTA":3,"SAC":3,"NYK":3,"LAL":3,"ORL":3,"DEN":3,"IND":3,"NOP":3,"DET":3,"TOR":3,"HOU":3,"OKC":3,"GSW":3,"ATL":2,"DAL":2,"WAS":2}
const weekSixForecast = computed(() => {
  const makeTeam = (team: string, roster: ProjectionPlayer[]) => {
    const players = roster.filter(player => player.slot !== 'IL').map(player => ({ ...player, gp: weekSixGames[player.nba] || 0 }))
    const totals = players.reduce((sum, player) => {
      sum.gp += player.gp; sum.fgm += player.fgm * player.gp; sum.fga += player.fga * player.gp; sum.ftm += player.ftm * player.gp; sum.fta += player.fta * player.gp
      player.stats.forEach((value, index) => { sum.stats[index] += value * player.gp })
      return sum
    }, { gp: 0, fgm: 0, fga: 0, ftm: 0, fta: 0, stats: Array(7).fill(0) as number[] })
    return { team, players, gp: totals.gp, values: [totals.fgm / totals.fga, totals.ftm / totals.fta, ...totals.stats] }
  }
  return { left: makeTeam('阿肥加班幹大事', weekSixFeiPlayers), right: makeTeam('ALOMAR', weekSixAlomarPlayers) }
})
const weekSixRows = computed(() => categories.map((category, index) => {
  const left = weekSixForecast.value.left.values[index]; const right = weekSixForecast.value.right.values[index]
  const result = index === 8 ? right - left : left - right
  return { category, left: formatProjection(left, index), right: formatProjection(right, index), winner: result === 0 ? 'tie' : result > 0 ? 'left' : 'right', edge: result === 0 ? '平手' : `${result > 0 ? '阿肥加班幹大事' : 'ALOMAR'} 優勢` }
}))
const weekSixSummary = computed(() => ({ left: weekSixRows.value.filter(row => row.winner === 'left').length, right: weekSixRows.value.filter(row => row.winner === 'right').length }))
const activeWeekSixDetail = ref<'left' | 'right' | null>(null)
const activeWeekSixTeam = computed(() => activeWeekSixDetail.value === 'left' ? weekSixForecast.value.left : weekSixForecast.value.right)

type SprintTotals = { fgm: number; fga: number; ftm: number; fta: number; three: number; pts: number; reb: number; ast: number; st: number; blk: number; to: number }
type SprintTeam = { team: string; played: number; remaining: number; current: SprintTotals; projection: SprintTotals }
const liveSprint = (team: string): SprintTotals => {
  const live = weekFourLive[team]
  return { fgm: live.fgm, fga: live.fga, ftm: live.ftm, fta: live.fta, three: live.stats[0], pts: live.stats[1], reb: live.stats[2], ast: live.stats[3], st: live.stats[4], blk: live.stats[5], to: live.stats[6] }
}
const remainingSprint = (team: string): SprintTotals => projectedPlayersFor(team, 'week4').reduce((sum, player) => {
  sum.fgm += player.fgm * player.gp; sum.fga += player.fga * player.gp; sum.ftm += player.ftm * player.gp; sum.fta += player.fta * player.gp
  sum.three += player.stats[0] * player.gp; sum.pts += player.stats[1] * player.gp; sum.reb += player.stats[2] * player.gp; sum.ast += player.stats[3] * player.gp; sum.st += player.stats[4] * player.gp; sum.blk += player.stats[5] * player.gp; sum.to += player.stats[6] * player.gp
  return sum
}, { fgm: 0, fga: 0, ftm: 0, fta: 0, three: 0, pts: 0, reb: 0, ast: 0, st: 0, blk: 0, to: 0 })
const finalSprint = computed<{ left: SprintTeam; right: SprintTeam }>(() => {
  const leftTeam = '阿肥加班幹大事'
  const rightTeam = '80年次男性屬羊'
  const leftLive = weekFourLive[leftTeam]
  const rightLive = weekFourLive[rightTeam]
  const leftProjection = remainingSprint(leftTeam)
  const rightProjection = remainingSprint(rightTeam)
  return {
    left: { team: leftTeam, played: leftLive.gp, remaining: projectedPlayersFor(leftTeam, 'week4').reduce((sum, player) => sum + player.gp, 0), current: liveSprint(leftTeam), projection: leftProjection },
    right: { team: rightTeam, played: rightLive.gp, remaining: projectedPlayersFor(rightTeam, 'week4').reduce((sum, player) => sum + player.gp, 0), current: liveSprint(rightTeam), projection: rightProjection },
  }
})
const activeSprintDetail = ref<'left' | 'right' | null>(null)
const activeSprintTeam = computed(() => activeSprintDetail.value === 'left' ? finalSprint.value.left.team : finalSprint.value.right.team)
const activeSprintPlayers = computed(() => activeSprintDetail.value ? projectedPlayersFor(activeSprintTeam.value, 'week4').filter(player => player.gp > 0) : [])
const sprintValue = (totals: SprintTotals, index: number) => {
  if (index === 0) return totals.fgm / totals.fga
  if (index === 1) return totals.ftm / totals.fta
  return [totals.three, totals.pts, totals.reb, totals.ast, totals.st, totals.blk, totals.to][index - 2]
}
const sprintFinal = (team: SprintTeam): SprintTotals => Object.fromEntries(Object.keys(team.current).map(key => [key, team.current[key as keyof SprintTotals] + team.projection[key as keyof SprintTotals]])) as SprintTotals
const formatSprint = (value: number, index: number, projected = false) => index < 2 ? value.toFixed(3).replace(/^0/, '') : projected ? value.toFixed(1).replace(/\.0$/, '') : String(Math.round(value))
const finalSprintRows = computed(() => {
  const sprint = finalSprint.value
  const leftFinal = sprintFinal(sprint.left); const rightFinal = sprintFinal(sprint.right)
  return categories.map((category, index) => {
    const left = sprintValue(leftFinal, index); const right = sprintValue(rightFinal, index)
    const result = index === 8 ? right - left : left - right
    const gap = Math.abs(result)
    return {
      category,
      leftCurrent: formatSprint(sprintValue(sprint.left.current, index), index), leftAdd: formatSprint(sprintValue(sprint.left.projection, index), index, true), leftFinal: formatSprint(left, index, true),
      rightCurrent: formatSprint(sprintValue(sprint.right.current, index), index), rightAdd: formatSprint(sprintValue(sprint.right.projection, index), index, true), rightFinal: formatSprint(right, index, true),
      winner: result === 0 ? 'tie' : result > 0 ? 'left' : 'right',
      edge: result === 0 ? '平手' : `${result > 0 ? sprint.left.team : sprint.right.team} +${formatSprint(gap, index, true)}`,
    }
  })
})
const finalSprintSummary = computed(() => ({ left: finalSprintRows.value.filter(row => row.winner === 'left').length, right: finalSprintRows.value.filter(row => row.winner === 'right').length }))

// Week 5 matchup baseline: each club's completed Weeks 1–3 production is
// normalized by GP, then applied to the currently published Week 5 volume.
// This keeps the preview separate from the live Week 4 finish above.
type WeiForecastSource = 'season' | 'last14'
const weiForecastSource = ref<WeiForecastSource>('season')
const weiForecastSources: Record<WeiForecastSource, { label: string; caption: string; left: { team: string; gp: number; values: number[] }; right: { team: string; gp: number; values: number[] } }> = {
  season: {
    label: '整季平均',
    caption: '以本季整體表現作為基準，較穩定，但對近期角色改變反應較慢。',
    left: { team: '阿肥加班幹大事', gp: 45, values: [.461, .756, 61, 640, 223, 158, 40, 25, 81] },
    right: { team: 'Wei Too Strong', gp: 46, values: [.468, .792, 53, 555, 228, 125, 48, 19, 60] },
  },
  last14: {
    label: '最近 14 天平均',
    caption: 'Yahoo 最近 14 天的球員場均套用同一份 Week 5 賽程；GP 固定，僅切換球員平均數據。包含 BN，不計 IL 與目前無數據的 O 球員。',
    left: { team: '阿肥加班幹大事', gp: 45, values: [.478, .759, 75, 710, 242, 167, 44, 20, 74] },
    right: { team: 'Wei Too Strong', gp: 46, values: [.491, .820, 55, 564, 251, 159, 49, 20, 57] },
  },
}
const weiWeekFive = computed(() => weiForecastSources[weiForecastSource.value])
const weiWeekFiveRows = computed(() => categories.map((category, index) => {
  const left = weiWeekFive.value.left.values[index]
  const right = weiWeekFive.value.right.values[index]
  const result = index === 8 ? right - left : left - right
  return {
    category,
    left: formatProjection(left, index),
    right: formatProjection(right, index),
    winner: result === 0 ? 'tie' : result > 0 ? 'left' : 'right',
    note: result === 0 ? '平手' : result > 0 ? '左方優勢' : '右方優勢',
  }
}))
const weiWeekFiveSummary = computed(() => ({ left: weiWeekFiveRows.value.filter(row => row.winner === 'left').length, right: weiWeekFiveRows.value.filter(row => row.winner === 'right').length }))
</script>

<template>
  <nav v-if="!forecastOnly" class="site-menu" aria-label="頁面導覽">
    <div class="wrap site-menu-inner"><NuxtLink class="menu-brand" to="/" aria-label="回 Chanchao Gentleman Club 首頁"><img src="/cgc-logo.svg" alt="Chanchao Gentleman Club"><span>2026–27</span></NuxtLink><div class="menu-links"><NuxtLink to="/">回首頁</NuxtLink><a href="#analysis">paymeforwin</a><NuxtLink to="/lastseason">上季回顧</NuxtLink></div></div>
  </nav>
  <main id="analysis" class="analysis-page" :class="{ 'forecast-only': forecastOnly }">
    <section v-if="!forecastOnly" class="analysis-hero wrap">
      <p class="eyebrow">2026–27 SEASON · NOW UNDERWAY</p>
      <h1>本季戰報，正式開打</h1>
      <p>每週對戰、九項分類排名與整季交手紀錄，會從這裡開始逐週累積。</p>
    </section>
    <section class="analysis-board wrap">
      <template v-if="!forecastOnly">
      <div class="analysis-heading"><div><p class="eyebrow ink">WEEK 1–4 · COMBINED DATA</p><h2>全員九項戰力圖</h2></div><p>四週原始數據合併後再排名。FG% 與 FT% 以總命中／總出手加權計算；TO 越低越強。</p></div>
      <div class="analysis-method"><span>14 TEAMS</span><span>4 WEEKS</span><span>9 CATEGORIES</span><span>14 RANK LEVELS</span><span>點雷達開啟完整名次</span></div>
      <div class="analysis-grid">
        <article v-for="(player, playerIndex) in playerCards" :key="player.team" class="analysis-card" :class="{ active: isRankModalOpen && selectedTeam === player.team }" tabindex="0" role="button" :aria-pressed="isRankModalOpen && selectedTeam === player.team" @click="selectPlayer(player.team)" @keydown.enter="selectPlayer(player.team)" @keydown.space.prevent="selectPlayer(player.team)">
          <div class="analysis-card-head"><div><small>TEAM {{ String(playerIndex + 1).padStart(2, '0') }}</small><h3>{{ player.team }}</h3></div><b>{{ player.gp }}<em> GP</em></b></div>
          <div class="analysis-radar"><svg viewBox="0 0 200 200" :aria-label="`${player.team} 九項戰力雷達圖；點選卡片查看完整名次`" role="img"><polygon v-for="(scale, guideIndex) in rankGuides" :key="scale" :class="['analysis-guide', { major: (guideIndex + 1) % 3 === 0 || guideIndex === rankGuides.length - 1 }]" :points="guide(scale)" /><line v-for="(_, index) in categories" :key="`axis-${index}`" class="analysis-axis" x1="100" y1="100" :x2="point(index, 1).split(',')[0]" :y2="point(index, 1).split(',')[1]" /><polygon class="analysis-shape" :points="radar(playerIndex)" /><g v-for="(category, index) in categories" :key="`point-${category}`" class="analysis-point"><title>{{ category }}：點選卡片查看名次</title><circle :cx="point(index, rankStrength(player.ranks[index])).split(',')[0]" :cy="point(index, rankStrength(player.ranks[index])).split(',')[1]" r="3.6" /></g><text v-for="(category, index) in categories" :key="category" class="analysis-label" :x="labelPoint(index).x" :y="labelPoint(index).y">{{ category }}</text></svg></div>
          <div class="analysis-highlights"><span v-for="item in player.highlights" :key="item.label"><b>{{ item.label }}</b><em>#{{ item.rank }}</em><small>{{ item.value }}</small></span></div>
        </article>
      </div>
      <section v-if="isRankModalOpen" class="rank-modal" role="dialog" aria-modal="true" :aria-label="`${selectedPlayer.team} 九項名次`" @click.self="closeRankModal"><div class="rank-modal-panel"><button class="rank-modal-close" type="button" aria-label="關閉完整名次" @click="closeRankModal">×</button><div class="rank-detail-head"><div><p class="eyebrow ink">RANK INSPECTOR · 14 TEAMS</p><h2>{{ selectedPlayer.team }}</h2></div></div><div class="rank-detail-grid"><article v-for="detail in selectedRankDetails" :key="detail.category" :class="['rank-detail-item', { elite: detail.rank <= 3 }]"><span>{{ detail.category }}</span><b>#{{ detail.rank }}</b><small>{{ detail.value }}</small><i :style="{ width: `${rankStrength(detail.rank) * 100}%` }"></i></article></div></div></section>
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
      </template>
      <section v-if="forecastOnly" class="projection-lab" aria-labelledby="projection-title">
        <div class="projection-content" :class="{ obscured: forecastGate !== 'revealed' }"><div class="matchup-heading"><div><p class="eyebrow">FUTURE WINDOW · ROSTER MODEL</p><h2 id="projection-title">未來戰力預測</h2></div><p>用本季場均乘上下一週 NBA 賽程；FG%、FT% 則以預估命中與出手加權。此試行版先收錄兩隊。</p></div>
          <div class="projection-controls"><label><span>預測區間</span><select v-model="projectionRange"><option value="week4">WEEK 4</option><option value="week5">WEEK 5</option><option value="week6">WEEK 6</option><option value="week7">WEEK 7</option></select></label></div>
          <p class="projection-caption">{{ projectionRangeLabels[projectionRange] }} · 依 2026/11/9–12/6 賽程與目前 Yahoo 名單快照估算；包含 BN、不計 IL，尚未扣除每日排陣與傷病缺賽。</p>
          <div v-if="projectionRange === 'week4'" class="projection-live"><span>WEEK 4 · FINAL DAY</span><strong>阿肥加班幹大事 <b>6 : 3</b> 80年次男性屬羊</strong><em>已納入 Yahoo 11/14 完賽累計</em></div>
          <div class="team-selectors projection-selectors"><label><span>左方隊伍</span><select v-model="leftProjectionTeam"><option v-for="team in projectionTeams" :key="`projection-left-${team.team}`" :value="team.team">{{ team.team }}</option></select></label><b>VS</b><label><span>右方隊伍</span><select v-model="rightProjectionTeam"><option v-for="team in projectionTeams" :key="`projection-right-${team.team}`" :value="team.team">{{ team.team }}</option></select></label></div>
          <div class="matchup-games projection-games"><span>{{ leftProjectionTeam }} · <b>{{ leftProjection.gp }}</b> 預計總 GP</span><em>{{ projectionRange === 'week4' ? '完賽實績＋最後兩天賽程' : '球員賽程總和' }}</em><span>{{ rightProjectionTeam }} · <b>{{ rightProjection.gp }}</b> 預計總 GP</span></div>
          <div class="matchup-table-wrap"><table class="matchup-table projection-table"><colgroup><col class="category-col"><col class="score-col"><col class="score-col"><col class="result-col"></colgroup><thead><tr><th>項目</th><th>{{ leftProjectionTeam }}</th><th>{{ rightProjectionTeam }}</th><th>單項優勢</th></tr></thead><tbody><tr v-for="row in projectionRows" :key="row.category"><th class="matchup-category">{{ row.category }}</th><td :class="{ winner: row.winner === 'left' }">{{ row.left }}</td><td :class="{ winner: row.winner === 'right' }">{{ row.right }}</td><td><span :class="['matchup-result', row.winner]">{{ row.note }}</span></td></tr></tbody></table></div>
          <div class="matchup-final projection-final"><span>預測對位</span><strong>{{ projectionSummary.left }}</strong><strong>{{ projectionSummary.right }}</strong><em aria-hidden="true"></em></div>
          <div class="projection-details"><div class="projection-detail-tabs"><button type="button" :class="{ active: activeProjectionDetail === 'left' }" @click="activeProjectionDetail = activeProjectionDetail === 'left' ? null : 'left'">查看 {{ leftProjectionTeam }} 的球員乘算明細</button><button type="button" :class="{ active: activeProjectionDetail === 'right' }" @click="activeProjectionDetail = activeProjectionDetail === 'right' ? null : 'right'">查看 {{ rightProjectionTeam }} 的球員乘算明細</button></div><section v-if="activeProjectionDetail" class="projection-roster"><h3>{{ activeProjectionTeam }} · 球員乘算明細</h3><div class="projection-table-wrap"><table><thead><tr><th>球員</th><th>NBA</th><th>位置</th><th>預計 GP</th><th>3PTM</th><th>PTS</th><th>REB</th><th>AST</th><th>ST</th><th>BLK</th><th>TO</th></tr></thead><tbody><tr v-for="player in activeProjection.players" :key="player.name"><th>{{ player.name }}</th><td>{{ player.nba }}</td><td>{{ player.slot }}</td><td>{{ player.gp }}</td><td>{{ (player.stats[0] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[1] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[2] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[3] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[4] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[5] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[6] * player.gp).toFixed(1) }}</td></tr></tbody></table></div></section></div></div>
        <Transition name="forecast-unlock"><div v-if="forecastGate !== 'revealed'" :class="['forecast-gate', { wrong: forecastGate === 'wrong', correct: forecastGate === 'correct' }]" role="dialog" aria-label="未來戰力預測表解鎖"><template v-if="forecastGate !== 'correct'"><p class="forecast-label">未來戰力預測表</p><p class="forecast-kicker">FORECAST LOCKED · SEASON ORACLE</p><div v-if="forecastGate === 'wrong'" :key="`wrong-mark-${wrongAttempt}`" class="forecast-error-mark">×</div><h3>你認為這季 NBA 總冠軍球隊是哪一支？</h3><p class="forecast-copy">猜對，才有資格查看未來戰力預測。</p><div class="championship-options"><button v-for="team in championOptions" :key="team" type="button" :class="{ selected: championGuess === team }" @click="chooseChampion(team)">{{ team }}</button></div><p v-if="forecastGate === 'wrong'" :key="`wrong-copy-${wrongAttempt}`" class="forecast-error">預言錯誤。再猜一次。</p></template><template v-else><div class="forecast-success-mark">✓</div><p class="forecast-kicker">ORACLE VERIFIED</p><h3>正確答案。</h3><p class="forecast-copy">阿肥加班幹大事，解鎖未來戰力預測。</p></template></div></Transition>
      </section>
      <section v-if="false" class="sprint-lab" aria-labelledby="week-five-roster-title">
        <div class="sprint-heading"><div><p class="eyebrow">WEEK 5 · FINAL DAY</p><h2 id="week-five-roster-title">阿肥 vs Wei Too Strong｜最後一天預測</h2></div><p>已納入 Yahoo 11/21 完賽累計，推估最後一天 11/22（台灣時間 11/23）賽程。依指定排陣，阿肥週日只上 Jokić，Brunson、Suggs 各計 0 場；阿肥採計 1 場、阿偉採計 6 場，排除 IL。Deni 已移出 IL，與阿偉新增的 Precious Achiuwa 均無剩餘賽程。</p></div>
        <div class="forecast-source week-five-source"><span>球員數據基準</span><div><button type="button" :class="{ active: weekFiveSource === 'season' }" @click="weekFiveSource = 'season'">整季平均</button><button type="button" :class="{ active: weekFiveSource === 'last14' }" @click="weekFiveSource = 'last14'">最近 14 天平均</button></div><p>{{ weekFiveSource === 'season' ? '完賽累計 ＋ 最新整季場均 × 剩餘出賽場次。' : '完賽累計 ＋ Yahoo 最近 14 天場均 × 相同剩餘場次。' }}</p></div>
        <div class="sprint-status"><span><b>{{ weekFiveRosterForecast.left.team }}</b> · 已打 44 場／剩 {{ weekFiveRosterForecast.left.remainingGp }} 場</span><strong>目前 6 : 3</strong><span><b>{{ weekFiveRosterForecast.right.team }}</b> · 已打 43 場／剩 {{ weekFiveRosterForecast.right.remainingGp }} 場</span></div>
        <div class="sprint-table-wrap"><table class="sprint-table"><thead><tr><th>項目</th><th>{{ weekFiveRosterForecast.left.team }}<small>目前</small></th><th>剩餘預估</th><th>收官預估</th><th>{{ weekFiveRosterForecast.right.team }}<small>目前</small></th><th>剩餘預估</th><th>收官預估</th><th>預測差距</th></tr></thead><tbody><tr v-for="row in weekFiveRosterRows" :key="`week-five-${row.category}`"><th>{{ row.category }}</th><td>{{ row.leftCurrent }}</td><td class="sprint-add">+{{ row.leftAdd }}</td><td :class="{ winner: row.winner === 'left' }">{{ row.left }}</td><td>{{ row.rightCurrent }}</td><td class="sprint-add">+{{ row.rightAdd }}</td><td :class="{ winner: row.winner === 'right' }">{{ row.right }}</td><td><span :class="['sprint-edge', row.winner]">{{ row.edge }}</span></td></tr></tbody></table></div>
        <div class="sprint-result"><span>預測對位</span><strong>{{ weekFiveRosterSummary.left }} : {{ weekFiveRosterSummary.right }}</strong><b>{{ weekFiveRosterSummary.left === weekFiveRosterSummary.right ? '平手' : (weekFiveRosterSummary.left > weekFiveRosterSummary.right ? weekFiveRosterForecast.left.team : weekFiveRosterForecast.right.team) + ' 優勢' }}</b></div>
        <div class="sprint-details"><div class="projection-detail-tabs"><button type="button" :class="{ active: activeWeekFiveDetail === 'left' }" @click="activeWeekFiveDetail = activeWeekFiveDetail === 'left' ? null : 'left'">查看 {{ weekFiveRosterForecast.left.team }} 的剩餘球員明細</button><button type="button" :class="{ active: activeWeekFiveDetail === 'right' }" @click="activeWeekFiveDetail = activeWeekFiveDetail === 'right' ? null : 'right'">查看 {{ weekFiveRosterForecast.right.team }} 的剩餘球員明細</button></div><section v-if="activeWeekFiveDetail" class="projection-roster"><h3>{{ activeWeekFiveTeam.team }} · 剩餘賽程球員乘算明細</h3><div class="projection-table-wrap"><table><thead><tr><th>球員</th><th>NBA</th><th>位置</th><th>剩餘 GP</th><th>3PTM</th><th>PTS</th><th>REB</th><th>AST</th><th>ST</th><th>BLK</th><th>TO</th></tr></thead><tbody><tr v-for="player in activeWeekFiveTeam.players" :key="`week-five-${player.name}`"><th>{{ player.name }}</th><td>{{ player.nba }}</td><td>{{ player.slot }}</td><td>{{ player.gp }}</td><td>{{ weekFivePlayerStat(activeWeekFiveTeam.team, player, 0).toFixed(1) }}</td><td>{{ weekFivePlayerStat(activeWeekFiveTeam.team, player, 1).toFixed(1) }}</td><td>{{ weekFivePlayerStat(activeWeekFiveTeam.team, player, 2).toFixed(1) }}</td><td>{{ weekFivePlayerStat(activeWeekFiveTeam.team, player, 3).toFixed(1) }}</td><td>{{ weekFivePlayerStat(activeWeekFiveTeam.team, player, 4).toFixed(1) }}</td><td>{{ weekFivePlayerStat(activeWeekFiveTeam.team, player, 5).toFixed(1) }}</td><td>{{ weekFivePlayerStat(activeWeekFiveTeam.team, player, 6).toFixed(1) }}</td></tr></tbody></table></div></section></div>
      </section>
      <section v-if="forecastOnly" class="sprint-lab next-week-lab" aria-labelledby="week-six-title">
        <div class="sprint-heading"><div><p class="eyebrow">WEEK 6 · NEXT MATCHUP</p><h2 id="week-six-title">阿肥 vs ALOMAR｜下週預測</h2></div><p>依 11/22 Yahoo 最新名單與整季場均，乘上 11/23–11/29 完整 NBA 賽程。假設雙方所有非 IL 球員全數出賽，包含板凳 BN；Brunson、Suggs 全部納入。</p></div>
        <div class="sprint-status"><span><b>{{ weekSixForecast.left.team }}</b> · 預計 {{ weekSixForecast.left.gp }} GP</span><strong>WEEK 6</strong><span><b>{{ weekSixForecast.right.team }}</b> · 預計 {{ weekSixForecast.right.gp }} GP</span></div>
        <div class="sprint-table-wrap"><table class="sprint-table week-six-table"><thead><tr><th>項目</th><th>{{ weekSixForecast.left.team }}</th><th>{{ weekSixForecast.right.team }}</th><th>單項優勢</th></tr></thead><tbody><tr v-for="row in weekSixRows" :key="`week-six-${row.category}`"><th>{{ row.category }}</th><td :class="{ winner: row.winner === 'left' }">{{ row.left }}</td><td :class="{ winner: row.winner === 'right' }">{{ row.right }}</td><td><span :class="['sprint-edge', row.winner]">{{ row.edge }}</span></td></tr></tbody></table></div>
        <div class="sprint-result"><span>預測對位</span><strong>{{ weekSixSummary.left }} : {{ weekSixSummary.right }}</strong><b>{{ weekSixSummary.left === weekSixSummary.right ? '平手' : (weekSixSummary.left > weekSixSummary.right ? weekSixForecast.left.team : weekSixForecast.right.team) + ' 優勢' }}</b></div>
        <div class="sprint-details"><div class="projection-detail-tabs"><button type="button" :class="{ active: activeWeekSixDetail === 'left' }" @click="activeWeekSixDetail = activeWeekSixDetail === 'left' ? null : 'left'">查看 {{ weekSixForecast.left.team }} 的球員乘算明細</button><button type="button" :class="{ active: activeWeekSixDetail === 'right' }" @click="activeWeekSixDetail = activeWeekSixDetail === 'right' ? null : 'right'">查看 {{ weekSixForecast.right.team }} 的球員乘算明細</button></div><section v-if="activeWeekSixDetail" class="projection-roster"><h3>{{ activeWeekSixTeam.team }} · Week 6 球員乘算明細</h3><div class="projection-table-wrap"><table><thead><tr><th>球員</th><th>NBA</th><th>位置</th><th>預計 GP</th><th>3PTM</th><th>PTS</th><th>REB</th><th>AST</th><th>ST</th><th>BLK</th><th>TO</th></tr></thead><tbody><tr v-for="player in activeWeekSixTeam.players" :key="`week-six-player-${player.name}`"><th>{{ player.name }}</th><td>{{ player.nba }}</td><td>{{ player.slot }}</td><td>{{ player.gp }}</td><td>{{ (player.stats[0] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[1] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[2] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[3] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[4] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[5] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[6] * player.gp).toFixed(1) }}</td></tr></tbody></table></div></section></div>
      </section>
      <section v-if="false" class="sprint-lab" aria-labelledby="sprint-title">
        <div class="sprint-heading"><div><p class="eyebrow">WEEK 4 · LIVE MATCHUP</p><h2 id="sprint-title">阿肥 vs 80年次男性｜本週對戰推演</h2></div><p>採計 Yahoo 11/14 完賽數據，以及 11/15（台灣時間 11/16）賽程。以 Yahoo 本季場均估算，包含板凳、不計 IL；Andrew Nembhard、Aaron Nesmith 出賽存疑，各暫計 1 場。</p></div>
        <div class="sprint-status"><span><b>{{ finalSprint.left.team }}</b> · 已打 {{ finalSprint.left.played }} 場／預計再打 {{ finalSprint.left.remaining }} 場</span><strong>目前 6 : 3</strong><span><b>{{ finalSprint.right.team }}</b> · 已打 {{ finalSprint.right.played }} 場／預計再打 {{ finalSprint.right.remaining }} 場</span></div>
        <div class="sprint-table-wrap"><table class="sprint-table"><thead><tr><th>項目</th><th>{{ finalSprint.left.team }}<small>目前</small></th><th>剩餘預估</th><th>收官預估</th><th>{{ finalSprint.right.team }}<small>目前</small></th><th>剩餘預估</th><th>收官預估</th><th>預估差距</th></tr></thead><tbody><tr v-for="row in finalSprintRows" :key="row.category"><th>{{ row.category }}</th><td>{{ row.leftCurrent }}</td><td class="sprint-add">+{{ row.leftAdd }}</td><td :class="{ winner: row.winner === 'left' }">{{ row.leftFinal }}</td><td>{{ row.rightCurrent }}</td><td class="sprint-add">+{{ row.rightAdd }}</td><td :class="{ winner: row.winner === 'right' }">{{ row.rightFinal }}</td><td><span :class="['sprint-edge', row.winner]">{{ row.edge }}</span></td></tr></tbody></table></div>
        <div class="sprint-result"><span>預估收官</span><strong>{{ finalSprintSummary.left }} : {{ finalSprintSummary.right }}</strong><b>{{ finalSprintSummary.left === finalSprintSummary.right ? '平手' : (finalSprintSummary.left > finalSprintSummary.right ? finalSprint.left.team : finalSprint.right.team) + ' 優勢' }}</b></div>
        <div class="sprint-details">
          <div class="projection-detail-tabs"><button type="button" :class="{ active: activeSprintDetail === 'left' }" @click="activeSprintDetail = activeSprintDetail === 'left' ? null : 'left'">查看 {{ finalSprint.left.team }} 的剩餘球員明細</button><button type="button" :class="{ active: activeSprintDetail === 'right' }" @click="activeSprintDetail = activeSprintDetail === 'right' ? null : 'right'">查看 {{ finalSprint.right.team }} 的剩餘球員明細</button></div>
          <section v-if="activeSprintDetail" class="projection-roster"><h3>{{ activeSprintTeam }} · 剩餘賽程球員乘算明細</h3><div class="projection-table-wrap"><table><thead><tr><th>球員</th><th>NBA</th><th>位置</th><th>剩餘 GP</th><th>3PTM</th><th>PTS</th><th>REB</th><th>AST</th><th>ST</th><th>BLK</th><th>TO</th></tr></thead><tbody><tr v-for="player in activeSprintPlayers" :key="`sprint-${player.name}`"><th>{{ player.name }}</th><td>{{ player.nba }}</td><td>{{ player.slot }}</td><td>{{ player.gp }}</td><td>{{ (player.stats[0] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[1] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[2] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[3] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[4] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[5] * player.gp).toFixed(1) }}</td><td>{{ (player.stats[6] * player.gp).toFixed(1) }}</td></tr></tbody></table></div></section>
        </div>
        <p class="sprint-footnote">命中率以已完成的命中／出手，加上剩餘賽程的預估命中／出手加權計算；其餘項目則為已結算數據與剩餘推估的加總。每日傷病、輪休與實際排陣仍可能改變結果。</p>
      </section>
      <section v-if="false" class="next-matchup-lab" aria-labelledby="wei-week-five-title">
        <div class="sprint-heading"><div><p class="eyebrow">NEXT WEEK · ROSTER OUTLOOK</p><h2 id="wei-week-five-title">阿肥 vs Wei Too Strong｜下週預測</h2></div><p>每名球員的平均數據乘上 Week 5 賽程；FG%、FT% 以預估命中與出手加權。可切換穩定的整季基準與近期 14 天狀態。</p></div>
        <div class="forecast-source"><span>預測數據來源</span><div><button type="button" :class="{ active: weiForecastSource === 'season' }" @click="weiForecastSource = 'season'">整季平均</button><button type="button" :class="{ active: weiForecastSource === 'last14' }" @click="weiForecastSource = 'last14'">最近 14 天平均</button></div><p>{{ weiWeekFive.caption }}</p></div>
        <div class="sprint-status next-matchup-status"><span><b>{{ weiWeekFive.left.team }}</b> · 預計 {{ weiWeekFive.left.gp }} GP</span><strong>WEEK 5</strong><span><b>{{ weiWeekFive.right.team }}</b> · 預計 {{ weiWeekFive.right.gp }} GP</span></div>
        <div class="matchup-table-wrap next-matchup-table"><table class="matchup-table projection-table"><colgroup><col class="category-col"><col class="score-col"><col class="score-col"><col class="result-col"></colgroup><thead><tr><th>項目</th><th>{{ weiWeekFive.left.team }}</th><th>{{ weiWeekFive.right.team }}</th><th>單項優勢</th></tr></thead><tbody><tr v-for="row in weiWeekFiveRows" :key="`wei-${row.category}`"><th class="matchup-category">{{ row.category }}</th><td :class="{ winner: row.winner === 'left' }">{{ row.left }}</td><td :class="{ winner: row.winner === 'right' }">{{ row.right }}</td><td><span :class="['matchup-result', row.winner]">{{ row.note }}</span></td></tr></tbody></table></div>
        <div class="sprint-result next-matchup-result"><span>預測對位</span><strong>{{ weiWeekFiveSummary.left }} : {{ weiWeekFiveSummary.right }}</strong><b>{{ weiWeekFiveSummary.left > weiWeekFiveSummary.right ? weiWeekFive.left.team : weiWeekFive.right.team }} 優勢</b></div>
        <p class="sprint-footnote">這是對戰前基準線；真正勝負最容易被每日排陣、傷病狀態與週中串流球員改變。</p>
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
.team-selectors label,.projection-controls label{position:relative}.team-selectors label::after,.projection-controls label::after{content:'';position:absolute;right:20px;bottom:24px;width:8px;height:8px;border-right:2px solid #142843;border-bottom:2px solid #142843;transform:rotate(45deg);pointer-events:none}.team-selectors select,.projection-controls select{appearance:none;padding-right:48px;background-image:none}
.team-selectors>b{color:#8a6017}
.matchup-table-wrap{border-color:#cfc5b3;border-radius:4px 4px 0 0;background:#fffdf8;box-shadow:none}
.matchup-table thead th,.matchup-table thead th:nth-child(2),.matchup-table thead th:nth-child(3){background:#142843;color:#fffdf8}
.matchup-table .matchup-category{background:#e9dfc6;color:#4d3c20;border-right-color:#d2bf93}
.matchup-table tbody tr:nth-child(even){background:transparent}
.matchup-table th,.matchup-table td{border-bottom-color:#e4ddd0}
.matchup-table td.winner{color:#8a6017}
.matchup-result{border:1px solid #d2bf93;border-radius:3px;background:#fffdf8;color:#6f5a31}
.matchup-result.left{border-color:#a9caae;background:#edf6ed;color:#2d6740}
.matchup-result.right{border-color:#adc1d8;background:#eff4fa;color:#315a81}
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
.projection-lab{position:relative;isolation:isolate;overflow:hidden;margin-top:64px;padding:36px;border:1px solid #2d527c;background:radial-gradient(circle at 88% 12%,rgba(72,178,232,.2),transparent 25%),linear-gradient(135deg,#091a31,#102c4a 55%,#0b233d);box-shadow:0 18px 42px rgba(10,30,52,.19);color:#edf7ff}.projection-lab::before{content:'';position:absolute;z-index:-1;inset:0;opacity:.24;background-image:linear-gradient(rgba(129,211,255,.14) 1px,transparent 1px),linear-gradient(90deg,rgba(129,211,255,.14) 1px,transparent 1px);background-size:26px 26px;mask-image:linear-gradient(90deg,transparent,black 28%,black 72%,transparent)}.projection-lab .matchup-heading{align-items:end}.projection-lab .matchup-heading h2{color:#fff}.projection-lab .matchup-heading>p,.projection-caption{color:#b6cbe0}.projection-lab .eyebrow{color:#82ddff}.projection-controls{max-width:360px;margin:26px 0 10px}.projection-controls label{display:grid;gap:7px}.projection-controls label span{color:#82ddff;font:700 .67rem 'DM Mono',monospace;letter-spacing:.1em}.projection-controls select{width:100%;height:48px;padding:0 13px;border:1px solid #477ca8;border-radius:4px;background:#0a1f37;color:#f4fbff;font:800 .94rem 'Noto Sans TC',sans-serif;box-shadow:inset 0 0 0 1px rgba(137,221,255,.1)}.projection-caption{margin:0 0 16px;font-size:.78rem;line-height:1.65}.projection-live{display:grid;grid-template-columns:auto 1fr auto;gap:16px;align-items:center;margin:0 0 18px;padding:11px 14px;border:1px solid #315b84;background:rgba(6,22,42,.68);color:#b6cbe0;font:700 .7rem 'Noto Sans TC',sans-serif}.projection-live>span{color:#82ddff;font-family:'DM Mono',monospace;letter-spacing:.1em}.projection-live strong{color:#edf7ff;text-align:center;font-size:.86rem}.projection-live strong b{padding:0 7px;color:#f4ca67;font:900 1.15rem 'DM Mono',monospace}.projection-live em{color:#93b6d2;font-style:normal;text-align:right;font-size:.68rem}.projection-lab .team-selectors label span{color:#82ddff}.projection-lab .team-selectors select{border-color:#477ca8;background:#0a1f37;color:#f4fbff}.projection-lab .team-selectors label::after,.projection-lab .projection-controls label::after{border-color:#82ddff}.projection-lab .team-selectors>b{color:#75d9ff}.projection-lab .matchup-games{border-color:#315b84;background:rgba(6,22,42,.76);color:#b6cbe0}.projection-lab .matchup-games b,.projection-lab .matchup-games em{color:#82ddff}.projection-lab .matchup-table-wrap{border-color:#315b84;background:#0b1d33;box-shadow:none}.projection-lab .matchup-table{color:#d9eafa}.projection-lab .matchup-table thead th,.projection-lab .matchup-table thead th:nth-child(2),.projection-lab .matchup-table thead th:nth-child(3){background:#112d4c}.projection-lab .matchup-table .matchup-category{background:#143653;color:#a9daf5;border-right-color:#315b84}.projection-lab .matchup-table tbody tr,.projection-lab .matchup-table tbody tr:nth-child(even){background:#0d2139}.projection-lab .matchup-table th,.projection-lab .matchup-table td{border-bottom-color:#244566;color:#d9eafa}.projection-lab .matchup-table td.winner{background:rgba(58,132,174,.28);color:#fff;font-weight:900}.projection-lab .matchup-result{background:#1b3957;color:#c7e8ff}.projection-lab .matchup-result.left{background:#193f49;color:#96ead1}.projection-lab .matchup-result.right{background:#1a3558;color:#a8d5ff}.projection-lab .matchup-final{border-color:#315b84;background:linear-gradient(90deg,#0a203a,#173f63)}.projection-lab .matchup-final>span,.projection-lab .matchup-final strong{color:#82ddff}.projection-final{margin-top:0}.projection-details{margin-top:14px}.projection-detail-tabs{display:grid;grid-template-columns:1fr 1fr;gap:10px}.projection-detail-tabs button{min-height:52px;border:1px solid #315b84;background:rgba(8,27,48,.68);color:#b6cbe0;font:800 .82rem 'Noto Sans TC',sans-serif;cursor:pointer}.projection-detail-tabs button:hover,.projection-detail-tabs button.active{border-color:#75d9ff;background:#173b5d;color:#fff}.projection-roster{margin-top:10px;border:1px solid #315b84;background:#0b1d33}.projection-roster h3{margin:0;padding:15px 17px;border-bottom:1px solid #315b84;color:#d8f0ff;font:800 .9rem 'Noto Sans TC',sans-serif}.projection-table-wrap{overflow-x:auto;border-top:0}.projection-roster table{width:100%;min-width:850px;border-collapse:collapse;text-align:center}.projection-roster th,.projection-roster td{padding:10px;border-bottom:1px solid #244566;color:#dcecff;font:700 .76rem 'DM Mono','Noto Sans TC',sans-serif}.projection-roster thead th{background:#173f63;color:#fff;font-size:.68rem}.projection-roster tbody th{color:#a9daf5;text-align:left}.projection-roster tbody tr:nth-child(even){background:#0e233d}.projection-roster tbody tr:last-child>*{border-bottom:0}
.projection-content{transition:filter .45s ease,opacity .45s ease}.projection-content.obscured{filter:blur(9px);opacity:.48;pointer-events:none;user-select:none}.forecast-gate{position:absolute;z-index:5;inset:0;display:grid;align-content:center;justify-items:center;padding:44px;overflow:auto;background:rgba(4,16,31,.61);backdrop-filter:blur(3px);text-align:center}.forecast-gate::before,.forecast-gate::after{content:'';position:absolute;z-index:-1;border:1px solid rgba(122,221,255,.4);border-radius:50%;animation:oracle-pulse 2.2s ease-in-out infinite}.forecast-gate::before{width:390px;height:390px}.forecast-gate::after{width:520px;height:520px;animation-delay:.65s}.forecast-label{margin:0 0 14px;padding:7px 12px;border:1px solid rgba(130,221,255,.55);background:rgba(12,41,68,.76);color:#e1f5ff;font:800 .76rem 'Noto Sans TC',sans-serif;letter-spacing:.08em}.forecast-kicker{margin:0;color:#82ddff;font:800 .68rem 'DM Mono',monospace;letter-spacing:.16em}.forecast-gate h3{margin:12px 0 7px;color:#fff;font:900 clamp(1.8rem,4vw,2.8rem)/1.05 'Noto Sans TC',sans-serif}.forecast-copy{max-width:420px;margin:0 0 22px;color:#c5daed;line-height:1.65}.championship-options{display:grid;grid-template-columns:repeat(3,minmax(150px,1fr));gap:8px;width:min(700px,100%)}.championship-options button{min-height:42px;padding:8px;border:1px solid #315b84;background:rgba(8,28,51,.9);color:#d6e9f9;font:800 .76rem 'Noto Sans TC',sans-serif;cursor:pointer;transition:transform .15s ease,border-color .15s ease,background .15s ease}.championship-options button:hover{border-color:#82ddff;background:#174568;transform:translateY(-2px)}.forecast-error-mark{display:grid;place-items:center;width:80px;height:80px;margin:12px 0 -3px;border:2px solid #ff6b75;border-radius:50%;background:rgba(131,14,35,.45);color:#ffd5d8;font:900 4rem/1 'DM Mono',monospace;box-shadow:0 0 45px rgba(255,75,94,.45);animation:error-pop .46s cubic-bezier(.2,.9,.35,1.5)}.forecast-error{margin:18px 0 0;padding:11px 16px;border:1px solid #ff5c68;background:rgba(145,24,41,.52);color:#ffd7d9;font:800 .78rem 'Noto Sans TC',sans-serif;animation:forecast-shake .48s ease}.forecast-gate.wrong{background:rgba(62,7,21,.7)}.forecast-gate.wrong::before,.forecast-gate.wrong::after{border-color:rgba(255,83,101,.55)}.forecast-success-mark{display:grid;place-items:center;width:94px;height:94px;border:2px solid #8df0c0;border-radius:50%;background:rgba(20,132,91,.22);color:#a9ffd0;font:900 3.6rem/1 'DM Mono',monospace;box-shadow:0 0 50px rgba(74,236,159,.42);animation:success-pop .5s cubic-bezier(.2,.9,.35,1.5)}.forecast-gate.correct{background:rgba(6,54,42,.67)}.forecast-unlock-leave-active{transition:opacity .55s ease,transform .55s cubic-bezier(.2,.8,.25,1)}.forecast-unlock-leave-to{opacity:0;transform:scale(1.18) rotate(1.5deg);filter:blur(10px)}@keyframes forecast-shake{20%,60%{transform:translateX(-11px)}40%,80%{transform:translateX(11px)}}@keyframes oracle-pulse{50%{transform:scale(1.08);opacity:.2}}@keyframes success-pop{from{transform:scale(.3) rotate(-30deg);opacity:0}to{transform:scale(1);opacity:1}}@keyframes error-pop{from{transform:scale(.25) rotate(-24deg);opacity:0}to{transform:scale(1);opacity:1}}
.sprint-lab{margin-top:72px;padding:38px;border:1px solid #273e59;background:linear-gradient(135deg,#081525,#102b48);box-shadow:0 18px 46px rgba(11,28,48,.18);color:#ecf4fb}.sprint-heading{display:flex;justify-content:space-between;gap:36px;align-items:end}.sprint-heading .eyebrow{color:#83d6ff}.sprint-heading h2{margin:7px 0 0;color:#fff;font:900 clamp(1.65rem,3vw,2.45rem)/1.08 'Noto Sans TC',sans-serif}.sprint-heading>p{max-width:470px;margin:0;color:#b7cbe0;font-size:.84rem;line-height:1.75}.sprint-status{display:grid;grid-template-columns:1fr auto 1fr;gap:18px;align-items:center;margin:28px 0 16px;padding:12px 15px;border:1px solid #315779;background:#0b2038;color:#b8cde0;font:.75rem 'Noto Sans TC',sans-serif}.sprint-status span:last-child{text-align:right}.sprint-status b{color:#fff}.sprint-status strong{color:#f2c765;font:900 1.25rem 'DM Mono',monospace;white-space:nowrap}.sprint-table-wrap{overflow-x:auto;border:1px solid #315779;background:#091b30}.sprint-table{width:100%;min-width:970px;border-collapse:collapse;text-align:center}.sprint-table th,.sprint-table td{padding:12px 11px;border-bottom:1px solid #244766;color:#dce9f4;font:700 .76rem 'DM Mono','Noto Sans TC',sans-serif}.sprint-table thead th{background:#153859;color:#eaf5ff;font-size:.68rem}.sprint-table thead small{display:block;margin-top:3px;color:#93bdd8;font-size:.56rem}.sprint-table tbody tr:nth-child(even){background:rgba(255,255,255,.025)}.sprint-table tbody tr:last-child>*{border-bottom:0}.sprint-table tbody th{background:#102e4b;color:#a8d9f5;font:900 .76rem 'DM Mono',monospace}.sprint-table .sprint-add{color:#89b9d7}.sprint-table td.winner{background:rgba(67,142,112,.2);color:#fff;font-weight:900}.sprint-edge{display:inline-block;min-width:112px;padding:5px 8px;border:1px solid #3c6181;color:#c5daeb;font-size:.66rem}.sprint-edge.left{border-color:#4f9a78;background:rgba(43,112,79,.22);color:#a8ecc8}.sprint-edge.right{border-color:#5d8dbb;background:rgba(45,91,145,.24);color:#b9dcff}.sprint-result{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:18px;padding:17px 20px;border:1px solid #315779;border-top:0;background:linear-gradient(90deg,#0c2340,#174a68)}.sprint-result span{color:#93d8fa;font:800 .67rem 'DM Mono',monospace;letter-spacing:.1em}.sprint-result strong{color:#f4ca67;font:900 clamp(1.6rem,3vw,2.3rem)/1 'DM Mono',monospace}.sprint-result b{color:#e8f5ff;text-align:right;font:800 .88rem 'Noto Sans TC',sans-serif}.sprint-details{margin-top:16px}.sprint-footnote{margin:13px 0 0;color:#9bb5ca;font-size:.72rem;line-height:1.7}@media(max-width:760px){.sprint-lab{margin-top:46px;padding:24px 14px}.sprint-heading{display:block}.sprint-heading>p{margin-top:14px}.sprint-status{grid-template-columns:1fr;text-align:center;gap:7px}.sprint-status span:last-child{text-align:center}.sprint-result{grid-template-columns:1fr;gap:8px;text-align:center}.sprint-result b{text-align:center}}
.next-matchup-lab{margin-top:26px;padding:38px;border:1px solid #2e5378;background:linear-gradient(135deg,#0b1b30,#143756);box-shadow:0 18px 46px rgba(11,28,48,.18);color:#ecf4fb}.next-matchup-table{border-color:#315779;border-radius:0;background:#0b1d33}.next-matchup-status{margin-bottom:16px}.next-matchup-result{border-color:#315779;background:linear-gradient(90deg,#102d4b,#1b5270)}@media(max-width:760px){.next-matchup-lab{padding:24px 14px}}
.forecast-source{display:grid;grid-template-columns:auto 1fr;gap:10px 20px;align-items:center;margin:26px 0 16px;padding:14px 16px;border:1px solid #315779;background:rgba(6,22,42,.56)}.forecast-source>span{color:#83d6ff;font:800 .66rem 'DM Mono',monospace;letter-spacing:.1em}.forecast-source>div{display:flex;gap:8px}.forecast-source button{padding:8px 12px;border:1px solid #426e94;background:#0a2038;color:#a9c9df;font:800 .74rem 'Noto Sans TC',sans-serif;cursor:pointer}.forecast-source button.active{border-color:#f2c765;background:#214a6a;color:#fff}.forecast-source p{grid-column:1/-1;margin:0;color:#a8c0d4;font-size:.72rem;line-height:1.6}@media(max-width:760px){.forecast-source{grid-template-columns:1fr}.forecast-source>div{display:grid;grid-template-columns:1fr 1fr}.forecast-source button{padding:9px 6px;font-size:.7rem}}
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
@media(max-width:760px){.matchup-periods{overflow-x:auto;padding-bottom:3px}.matchup-periods button{min-width:96px}.matchup-games{gap:7px;padding:9px 8px;font-size:.62rem}.matchup-games em{font-size:.58rem}.projection-lab{margin-top:45px;padding:24px 14px}.projection-controls{max-width:none}.projection-detail-tabs{grid-template-columns:1fr}.projection-detail-tabs button{padding:11px;font-size:.76rem}.forecast-gate{padding:28px 16px}.forecast-gate::before{width:260px;height:260px}.forecast-gate::after{width:340px;height:340px}.championship-options{grid-template-columns:repeat(2,minmax(0,1fr))}.championship-options button{font-size:.7rem}.matchup-extra-body{padding-right:10px;padding-left:10px}.matchup-extra{overflow-x:auto}.matchup-extra table{min-width:460px}}
</style>
