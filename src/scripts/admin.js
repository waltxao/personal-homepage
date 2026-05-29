let siteData = null;

async function loadDefaultSite() {
  try {
    const response = await fetch('./data/site.json');
    siteData = await response.json();
  } catch (error) {
    console.error('Failed to load default site config', error);
    siteData = { profile: {}, contact: {}, skills: [], admin: {} };
  }
  if (!siteData.admin) siteData.admin = {};
}

function getExpectedPassword() {
  return siteData?.admin?.password || '';
}

function showLoginError(message) {
  const el = document.getElementById('loginError');
  if (el) el.textContent = message || '';
}

function openAdmin() {
  document.getElementById('loginSection').hidden = true;
  document.getElementById('adminSection').hidden = false;
  hydrateForm();
}

function hydrateForm() {
  const profile = siteData.profile || {};
  const contact = siteData.contact || {};
  const skills = Array.isArray(siteData.skills) ? siteData.skills : [];
  const avatarEmoji = document.getElementById('avatarEmoji');
  const displayName = document.getElementById('displayName');
  const tagline = document.getElementById('tagline');
  const bioText = document.getElementById('bioText');
  const contactEmail = document.getElementById('contactEmail');
  const contactWechat = document.getElementById('contactWechat');
  const contactLocation = document.getElementById('contactLocation');
  const contactMessage = document.getElementById('contactMessage');
  const skillEditor = document.getElementById('skillEditor');
  const passwordInput = document.getElementById('adminPasswordInput');

  if (avatarEmoji) avatarEmoji.value = profile.avatar || '👨‍💻';
  if (displayName) displayName.value = profile.displayName || '';
  if (tagline) tagline.value = profile.tagline || '';
  if (bioText) bioText.value = profile.bio || '';
  if (contactEmail) contactEmail.value = contact.email || '';
  if (contactWechat) contactWechat.value = contact.wechat || '';
  if (contactLocation) contactLocation.value = contact.location || '';
  if (contactMessage) contactMessage.value = contact.message || '';
  if (skillEditor) skillEditor.value = skills.join('\n');
  if (passwordInput) passwordInput.value = siteData.admin?.password || '';
  updatePreview();
}

function collectForm() {
  const profile = siteData.profile || {};
  const stats = siteData.stats || [];
  const highlights = siteData.highlights || [];
  const socials = siteData.socials || [];
  const projects = siteData.projects || [];
  return {
    ...siteData,
    profile: {
      ...profile,
      avatar: document.getElementById('avatarEmoji').value.trim(),
      displayName: document.getElementById('displayName').value.trim(),
      tagline: document.getElementById('tagline').value.trim(),
      bio: document.getElementById('bioText').value.trim()
    },
    contact: {
      email: document.getElementById('contactEmail').value.trim(),
      wechat: document.getElementById('contactWechat').value.trim(),
      location: document.getElementById('contactLocation').value.trim(),
      message: document.getElementById('contactMessage').value.trim()
    },
    skills: document.getElementById('skillEditor').value.split('\n').map(item => item.trim()).filter(Boolean),
    admin: {
      password: document.getElementById('adminPasswordInput').value
    },
    stats,
    highlights,
    socials,
    projects
  };
}

function updatePreview() {
  const preview = document.getElementById('previewBlock');
  if (!preview) return;
  preview.textContent = JSON.stringify(collectForm(), null, 2);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

function downloadSiteJson() {
  const payload = collectForm();
  const content = JSON.stringify(payload, null, 2) + '\n';
  downloadBlob(new Blob([content], { type: 'application/json' }), 'site.json');
  window.showToast?.('已导出 site.json，请替换 src/data/site.json 后重新构建部署');
}

function downloadArticleTemplate() {
  const title = document.getElementById('articleTitle').value.trim() || '新文章标题';
  const category = document.getElementById('articleCategory').value;
  const date = new Date().toISOString().slice(0, 10);
  const content = document.getElementById('markdownEditor').value || '在这里书写文章正文，可粘贴公众号或 Markdown 转换后的 HTML。';
  const template = `<!DOCTYPE html>\n<html lang="zh-CN">\n<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>${title} | Walt 的个人主页</title>\n  <link rel="preconnect" href="https://fonts.googleapis.com" />\n  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />\n  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Noto+Sans+SC:wght@300;400;700&display=swap" />\n  <style>:root{--bg:#07080d;--surface:#0f1117;--text:#e8eaf0;--muted:#9aa0b2;--green:#00ff9f;--blue:#00d4ff;--border:#1f2235}body{margin:0;font-family:'Noto Sans SC',system-ui;background:var(--bg);color:var(--text);line-height:1.8}.container{max-width:860px;margin:0 auto;padding:0 20px}header{padding:120px 0 40px;border-bottom:1px solid var(--border)}h1{font-size:clamp(1.8rem,3.5vw,2.4rem);line-height:1.3;margin-bottom:16px;background:linear-gradient(135deg,var(--green),var(--blue));-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}.meta{color:var(--muted);font-family:'JetBrains Mono',monospace;font-size:0.9rem;display:flex;gap:12px;flex-wrap:wrap}.content{padding:40px 0 80px}.content h2,.content h3{margin-top:28px;margin-bottom:12px}.content p{margin-bottom:16px}.content pre{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:18px;overflow:auto}footer{padding:24px 0;border-top:1px solid var(--border);color:var(--muted);font-size:0.9rem}</style>\n</head>\n<body>\n  <header>\n    <div class="container">\n      <h1>${title}</h1>\n      <div class="meta"><span>${category}</span><span>${date}</span></div>\n    </div>\n  </header>\n  <main class="content">\n    <div class="container">\n      ${content}\n    </div>\n  </main>\n  <footer>\n    <div class="container">© 2026 Walt</div>\n  </footer>\n</body>\n</html>`;
  downloadBlob(new Blob([template], { type: 'text/html' }), `${date}-${title.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]+/g, '-')}.html`);
  window.showToast?.('已导出文章模板，请放入 src/blog/ 后重新构建');
}

function simpleMarkdown(text) {
  return text
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/\n/g, '<br>');
}

document.addEventListener('DOMContentLoaded', async () => {
  await loadDefaultSite();

  const loginForm = document.getElementById('loginForm');
  const loginSection = document.getElementById('loginSection');
  const adminSection = document.getElementById('adminSection');

  loginForm?.addEventListener('submit', event => {
    event.preventDefault();
    const value = document.getElementById('passwordInput').value;
    const expected = getExpectedPassword();
    if (!expected || value === expected) {
      showLoginError('');
      openAdmin();
    } else {
      showLoginError('密码不正确，请重试。');
    }
  });

  document.querySelectorAll('[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-tab]').forEach(item => item.classList.remove('active'));
      document.querySelectorAll('.admin-panel').forEach(panel => panel.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  document.querySelectorAll('[data-action="download-site"]').forEach(btn => btn.addEventListener('click', downloadSiteJson));
  document.querySelectorAll('[data-action="download-template"]').forEach(btn => btn.addEventListener('click', downloadArticleTemplate));

  document.querySelectorAll('#adminSection input, #adminSection textarea, #adminSection select').forEach(el => {
    el.addEventListener('input', updatePreview);
  });

  document.getElementById('markdownEditor')?.addEventListener('input', event => {
    const preview = document.getElementById('previewContent');
    if (preview) preview.innerHTML = simpleMarkdown(event.target.value);
  });
});
