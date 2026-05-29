document.addEventListener('DOMContentLoaded', async () => {
  const list = document.getElementById('blogList');
  const filters = document.getElementById('blogFilters');
  const empty = document.getElementById('blogEmpty');
  if (!list) return;

  function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
    return String(text).replace(/[&<>"']/g, c => map[c]);
  }

  let posts = [];
  try {
    const response = await fetch('./data/blog.json');
    posts = await response.json();
  } catch (error) {
    console.error('Failed to load blog data', error);
  }

  const categories = ['全部', ...Array.from(new Set(posts.map(post => post.category)))];
  filters.innerHTML = categories.map((category, index) => (
    `<button class="filter-btn${index === 0 ? ' active' : ''}" data-category="${category}">${category}</button>`
  )).join('');

  function render(category = '全部') {
    const filtered = category === '全部' ? posts : posts.filter(post => post.category === category);
    if (!filtered.length) {
      list.innerHTML = '';
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    list.innerHTML = filtered.map(post => `
      <a class="blog-card surface reveal visible" href="./blog/${encodeURIComponent(post.file)}">
        <div class="blog-icon">📝</div>
        <div>
          <div class="blog-title">${escapeHtml(post.title)}</div>
          <div class="blog-summary">${escapeHtml(post.summary)}</div>
          <div class="blog-meta"><span>${escapeHtml(post.category)}</span><span>${escapeHtml(post.date)}</span></div>
        </div>
        <div class="blog-arrow">→</div>
      </a>
    `).join('');
  }

  filters.addEventListener('click', event => {
    const btn = event.target.closest('[data-category]');
    if (!btn) return;
    filters.querySelectorAll('[data-category]').forEach(item => item.classList.remove('active'));
    btn.classList.add('active');
    render(btn.dataset.category);
  });

  render();
});
