<script setup lang="ts">
const { data: rankings, pending: rankingsLoading, error: rankingsError, refresh: refreshRankings } = await useLazyFetch('/api/yahoo-rankings', {
  query: { count: 24 },
  server: false,
})
</script>

<template>
  <main class="draftplan-page">
    <nav class="draftplan-nav" aria-label="Draftplan 導覽">
      <a class="draftplan-brand" href="/">
        <img src="/cgc-logo.svg" alt="Chanchao Gentleman Club">
        <span>BACK TO CGC</span>
      </a>
      <a class="draftplan-open" href="https://nba-yahoo-fantasy-draft-game-plan-t.vercel.app/" target="_blank" rel="noopener noreferrer">開新視窗 ↗</a>
    </nav>

    <section class="draftplan-hero">
      <p class="eyebrow">2026–27 DRAFT WAR ROOM</p>
      <h1>Draftplan</h1>
      <p>選秀前的作戰室先放這裡；排名、候選名單和策略工具都集中在這一頁。</p>
    </section>

    <section class="yahoo-rankings">
      <div class="yahoo-rankings-head">
        <div>
          <p class="eyebrow">YAHOO LIVE RANKINGS</p>
          <h2>Yahoo 最新球員排名</h2>
        </div>
        <button type="button" :disabled="rankingsLoading" @click="refreshRankings()">{{ rankingsLoading ? '更新中' : '重新整理' }}</button>
      </div>
      <p v-if="rankings?.status === 'needs_config'" class="rankings-state">
        這裡已經接好 Yahoo Ranking API 骨架；還需要設定 Yahoo OAuth 的 Client ID、Client Secret、Refresh Token 後，才會自動顯示最新排名。
      </p>
      <p v-else-if="rankingsLoading" class="rankings-state">正在抓 Yahoo 最新排名…</p>
      <p v-else-if="rankingsError" class="rankings-state">Yahoo 排名暫時無法取得，請稍後再試。</p>
      <div v-else-if="rankings?.rows?.length" class="rankings-grid">
        <article v-for="player in rankings.rows.slice(0, 12)" :key="player.playerKey">
          <span>#{{ player.rank }}</span>
          <strong>{{ player.name }}</strong>
          <small>{{ player.team || 'FA' }} · {{ player.positions?.join('/') || '—' }}<template v-if="player.percentOwned != null"> · {{ player.percentOwned }}%</template></small>
        </article>
      </div>
    </section>

    <section class="draftplan-frame-wrap" aria-label="Draftplan 工具">
      <iframe
        class="draftplan-frame"
        src="https://nba-yahoo-fantasy-draft-game-plan-t.vercel.app/"
        title="NBA Yahoo Fantasy Draft Game Plan"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      />
    </section>
  </main>
</template>

<style scoped>
.draftplan-page{min-height:100vh;background:#07101c;color:#fff}
.draftplan-nav{position:sticky;top:0;z-index:5;display:flex;align-items:center;justify-content:space-between;gap:18px;padding:13px 24px;background:rgba(7,16,28,.9);border-bottom:1px solid rgba(240,184,73,.28);backdrop-filter:blur(14px)}
.draftplan-brand{display:flex;align-items:center;gap:10px;color:#f0b849;text-decoration:none;font:600 .72rem 'DM Mono',monospace;letter-spacing:.08em}
.draftplan-brand img{width:38px;height:38px;object-fit:cover;border-radius:4px}
.draftplan-open{color:#dce7f5;text-decoration:none;font-size:.9rem}
.draftplan-open:hover{color:#f0b849}
.draftplan-hero{padding:62px min(7vw,72px) 26px;background:radial-gradient(circle at 16% 0,rgba(240,184,73,.18),transparent 34%),linear-gradient(135deg,#101d31,#07101c)}
.draftplan-hero h1{margin:0 0 12px;font:700 clamp(3.2rem,8vw,7rem)/.9 'Oswald',sans-serif;letter-spacing:-.06em;text-transform:uppercase}
.draftplan-hero p:last-child{max-width:620px;margin:0;color:#c6d0dd;line-height:1.8}
.draftplan-frame-wrap{padding:18px;min-height:calc(100vh - 240px)}
.draftplan-frame{display:block;width:100%;height:calc(100vh - 230px);min-height:680px;border:0;border-radius:16px;background:#0c1422;box-shadow:0 22px 90px rgba(0,0,0,.34),inset 0 0 0 1px rgba(255,255,255,.08)}
.yahoo-rankings{margin:18px;padding:24px;background:linear-gradient(145deg,rgba(16,29,49,.96),rgba(10,18,32,.94));border-radius:16px;box-shadow:0 18px 70px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.08)}
.yahoo-rankings-head{display:flex;align-items:end;justify-content:space-between;gap:18px;margin-bottom:18px}
.yahoo-rankings h2{margin:0;font-size:clamp(1.7rem,3vw,2.5rem)}
.yahoo-rankings button{border:1px solid rgba(240,184,73,.44);border-radius:999px;background:transparent;color:#f0b849;padding:9px 14px;cursor:pointer}
.yahoo-rankings button:disabled{opacity:.55;cursor:wait}
.rankings-state{margin:0;color:#c6d0dd;line-height:1.8}
.rankings-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}
.rankings-grid article{padding:14px;border-radius:10px;background:rgba(255,255,255,.055)}
.rankings-grid span{display:block;color:#f0b849;font:700 .72rem 'DM Mono',monospace}
.rankings-grid strong{display:block;margin:7px 0 5px;font-size:1rem}
.rankings-grid small{color:#aebbc8;font-size:.78rem}
@media(max-width:760px){.draftplan-nav{padding:10px 14px}.draftplan-brand span{font-size:.62rem}.draftplan-open{font-size:.78rem}.draftplan-hero{padding:42px 20px 22px}.draftplan-frame-wrap{padding:10px}.draftplan-frame{height:calc(100vh - 190px);min-height:620px;border-radius:10px}}
@media(max-width:760px){.yahoo-rankings{margin:10px;padding:18px}.yahoo-rankings-head{display:block}.yahoo-rankings button{margin-top:14px}.rankings-grid{grid-template-columns:1fr}}
</style>
