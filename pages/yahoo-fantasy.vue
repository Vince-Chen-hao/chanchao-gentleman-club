<template>
  <main class="api-page">
    <nav class="api-nav" aria-label="Yahoo Fantasy API information navigation">
      <NuxtLink class="api-brand" to="/">
        <img src="/cgc-logo.svg" alt="Chanchao Gentleman Club">
        <span>CHANCHAO GENTLEMAN CLUB</span>
      </NuxtLink>
      <NuxtLink class="api-back" to="/draftplan">BACK TO DRAFTPLAN</NuxtLink>
    </nav>

    <section class="api-hero">
      <p class="api-kicker">YAHOO FANTASY SPORTS API</p>
      <h1>Private League<br><em>Companion</em></h1>
      <p>Chanchao Gentleman Club is an invitation-only companion website for one private Yahoo Fantasy Basketball league.</p>
    </section>

    <section class="api-content" aria-label="Yahoo Fantasy API use information">
      <article class="api-summary">
        <p class="api-label">PRODUCT SCOPE</p>
        <h2>Read-only league tools for 14 invited managers.</h2>
        <p>This product helps authorized league members review league standings, team names, matchup summaries, player rankings, and draft-planning information in one place.</p>
      </article>

      <div class="api-grid">
        <article>
          <p class="api-label">DATA USED</p>
          <ul>
            <li>League standings and matchup summaries</li>
            <li>Team names and manager-facing league information</li>
            <li>Player rankings, eligibility, and roster context</li>
            <li>Draft-planning information</li>
          </ul>
        </article>
        <article>
          <p class="api-label">ACCESS &amp; SECURITY</p>
          <ul>
            <li>Access is granted through Yahoo OAuth 2.0.</li>
            <li>Data is limited to the authenticated user's authorized Fantasy data.</li>
            <li>The service is limited to one private, invitation-only league.</li>
            <li>Yahoo credentials and tokens are not exposed to visitors.</li>
          </ul>
        </article>
        <article>
          <p class="api-label">WHAT THIS PRODUCT DOES NOT DO</p>
          <ul>
            <li>Does not modify Yahoo Fantasy data.</li>
            <li>Does not submit lineups, transactions, trades, or waivers.</li>
            <li>Does not automate gameplay or manager actions.</li>
            <li>Does not sell, share, or use Yahoo Fantasy data for advertising.</li>
          </ul>
        </article>
      </div>
    </section>

    <footer class="api-footer">
      <p><a href="https://sports.yahoo.com/fantasy/" target="_blank" rel="noreferrer">Fantasy data provided by Yahoo Fantasy</a></p>
      <p>© 2026 Chanchao Gentleman Club. Private league companion.</p>
    </footer>
  </main>
</template>

<style scoped>
.api-page{min-height:100vh;background:#07101c;color:#f5f0e5}
.api-nav{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:14px clamp(20px,5vw,72px);border-bottom:1px solid rgba(240,184,73,.25)}
.api-brand{display:flex;align-items:center;gap:10px;color:#f0b849;text-decoration:none;font:700 .7rem 'DM Mono',monospace;letter-spacing:.1em}.api-brand img{width:34px;height:34px;object-fit:contain}.api-back{color:#c7d2df;text-decoration:none;font:700 .7rem 'DM Mono',monospace;letter-spacing:.08em}.api-back:hover,.api-footer a:hover{color:#f0b849}
.api-hero{padding:clamp(64px,10vw,128px) clamp(20px,10vw,160px) 74px;background:linear-gradient(115deg,#101d31,#07101c 70%)}.api-kicker,.api-label{margin:0;color:#e0b452;font:700 .72rem 'DM Mono',monospace;letter-spacing:.13em}.api-hero h1{margin:18px 0;font:700 clamp(3.2rem,8vw,7.2rem)/.88 'Oswald',sans-serif;letter-spacing:-.055em;text-transform:uppercase}.api-hero h1 em{color:#f0b849;font-style:normal}.api-hero>p:last-child{max-width:660px;margin:0;color:#c6d0dd;font-size:1.08rem;line-height:1.8}
.api-content{max-width:1120px;margin:0 auto;padding:54px 24px 72px}.api-summary{max-width:760px;padding-bottom:44px;border-bottom:1px solid rgba(255,255,255,.14)}.api-summary h2{margin:14px 0;font-size:clamp(1.8rem,4vw,3.25rem);line-height:1.1}.api-summary>p:last-child{margin:0;color:#bac6d4;line-height:1.85}.api-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;margin-top:34px;background:rgba(255,255,255,.14)}.api-grid article{min-height:250px;padding:28px;background:#0d1929}.api-grid ul{margin:20px 0 0;padding:0;list-style:none;color:#c6d0dd;line-height:1.65}.api-grid li{margin:0 0 12px;padding-left:16px;position:relative}.api-grid li::before{content:'—';position:absolute;left:0;color:#e0b452}
.api-footer{display:flex;justify-content:space-between;gap:24px;padding:24px clamp(20px,5vw,72px);border-top:1px solid rgba(255,255,255,.14);color:#9facba;font-size:.82rem}.api-footer p{margin:0}.api-footer a{color:#d6e1ed;text-decoration:none;font-weight:700}
@media(max-width:760px){.api-nav{padding:12px 18px}.api-brand span{display:none}.api-back{font-size:.63rem}.api-hero{padding:70px 24px 56px}.api-content{padding:42px 20px 56px}.api-grid{grid-template-columns:1fr}.api-grid article{min-height:auto}.api-footer{display:block;line-height:1.8}.api-footer p+p{margin-top:8px}}
</style>
