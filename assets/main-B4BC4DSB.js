import"./main-B6Gk6R_9.js";async function e(){try{return await(await fetch(`./data/site.json`)).json()}catch(e){return console.error(`Failed to load site data`,e),null}}async function t(){try{return await(await fetch(`./data/blog.json`)).json()}catch(e){return console.error(`Failed to load blog data`,e),[]}}function n(e,t){let n=document.getElementById(e);n&&(n.textContent=t??``)}function r(e,t){let n=document.getElementById(e);n&&(n.innerHTML=t??``)}function i(e,t){if(!e)return;let i=e.profile||{},a=e.contact||{};n(`heroName`,i.displayName||`Walt`),n(`heroTagline`,i.heroQuote||i.tagline||``),n(`heroBio`,i.bio||``),n(`aboutName`,i.displayName||`Walt`),n(`aboutTagline`,i.tagline||``),n(`aboutBio`,i.bio||``),n(`contactMessage`,a.message||``);let o=i.avatar||`👨‍💻`,s=document.getElementById(`aboutAvatar`);s&&(s.textContent=o),r(`heroHighlights`,(e.highlights||[]).map(e=>`<span class="chip">${e}</span>`).join(``)),r(`skillGrid`,(e.skills||[]).map(e=>`<span class="badge">${e}</span>`).join(``)),r(`heroStats`,(e.stats||[]).map(e=>`
        <div class="stat-card">
          <div class="stat-value">${e.value}</div>
          <div class="stat-label">${e.label}</div>
        </div>
      `).join(``)),r(`projectGrid`,(e.projects||[]).map(e=>`
        <article class="project-card surface reveal">
          <div class="project-icon">${e.icon||`🚀`}</div>
          <div class="project-title">${e.title}</div>
          <div class="project-summary">${e.summary}</div>
          <div class="tag-row">${(e.tags||[]).map(e=>`<span class="chip">${e}</span>`).join(``)}</div>
          <div class="metric-row">${(e.metrics||[]).map(e=>`<span class="metric">${e}</span>`).join(``)}</div>
        </article>
      `).join(``)),r(`contactGrid`,(e.socials||[]).map(e=>`
        <a class="contact-card surface reveal" href="${e.href}" target="_blank" rel="noopener">
          <div class="contact-icon">${e.icon===`email`?`📧`:e.icon===`github`?`🐙`:e.icon===`wechat`?`💬`:`✉️`}</div>
          <div>
            <div class="contact-label">${e.label}</div>
            <div class="contact-value">${e.href}</div>
          </div>
        </a>
      `).join(``)),r(`homeBlogList`,t.slice(0,4).map(e=>`
        <a class="blog-card surface reveal" href="./blog/${encodeURIComponent(e.file)}">
          <div class="blog-icon">📝</div>
          <div>
            <div class="blog-title">${e.title}</div>
            <div class="blog-summary">${e.summary}</div>
            <div class="blog-meta"><span>${e.category}</span><span>${e.date}</span></div>
          </div>
          <div class="blog-arrow">→</div>
        </a>
      `).join(``))}var[a,o]=await Promise.all([e(),t()]);i(a,o);