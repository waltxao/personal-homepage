import"./main-B6Gk6R_9.js";document.addEventListener(`DOMContentLoaded`,async()=>{let e=document.getElementById(`blogList`),t=document.getElementById(`blogFilters`),n=document.getElementById(`blogEmpty`);if(!e)return;function r(e){let t={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`};return String(e).replace(/[&<>"']/g,e=>t[e])}let i=[];try{i=await(await fetch(`./data/blog.json`)).json()}catch(e){console.error(`Failed to load blog data`,e)}t.innerHTML=[`全部`,...Array.from(new Set(i.map(e=>e.category)))].map((e,t)=>`<button class="filter-btn${t===0?` active`:``}" data-category="${e}">${e}</button>`).join(``);function a(t=`全部`){let a=t===`全部`?i:i.filter(e=>e.category===t);if(!a.length){e.innerHTML=``,n.hidden=!1;return}n.hidden=!0,e.innerHTML=a.map(e=>`
      <a class="blog-card surface reveal visible" href="./blog/${encodeURIComponent(e.file)}">
        <div class="blog-icon">📝</div>
        <div>
          <div class="blog-title">${r(e.title)}</div>
          <div class="blog-summary">${r(e.summary)}</div>
          <div class="blog-meta"><span>${r(e.category)}</span><span>${r(e.date)}</span></div>
        </div>
        <div class="blog-arrow">→</div>
      </a>
    `).join(``)}t.addEventListener(`click`,e=>{let n=e.target.closest(`[data-category]`);n&&(t.querySelectorAll(`[data-category]`).forEach(e=>e.classList.remove(`active`)),n.classList.add(`active`),a(n.dataset.category))}),a()});