// =============================================
// Kaylees Massage & Skincare — Main JS
// =============================================

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx6GKYUA0wjcSV0Kyayhk26BfRhR0Ry4iwe01ApAl6-vfWvPrT7YTFTtHVy3-XIw1Mz7g/exec';

// =============================================
// Promo Banner (모든 페이지에서 자동 로딩)
// =============================================
(function loadPromoBanner() {
  window._bannerCallback = function(data) {
    delete window._bannerCallback;
    if (!data.success || !data.banner) return;

    const b = data.banner;
    if (b.banner_active !== 'true') return;

    // 만료일 체크
    if (b.banner_expiry) {
      const expiry = new Date(b.banner_expiry);
      expiry.setHours(23, 59, 59, 999);
      if (expiry < new Date()) return;
    }

    // 색상 설정
    const colors = {
      green: { bg: '#3D6347', text: '#ffffff' },
      gold:  { bg: '#C4A35A', text: '#2A2A2A' },
      rose:  { bg: '#b06070', text: '#ffffff' }
    };
    const c = colors[b.banner_color] || colors.green;

    // 예약 페이지 상대 경로 계산 (journal 하위 폴더 대응)
    const isSubfolder = window.location.pathname.includes('/journal/');
    const bookingHref = isSubfolder ? '../booking.html' : 'booking.html';

    // 배너 생성
    const banner = document.createElement('div');
    banner.id = 'promo-banner';
    banner.style.cssText = [
      'background:' + c.bg,
      'color:' + c.text,
      'text-align:center',
      'padding:10px 20px',
      'display:flex',
      'align-items:center',
      'justify-content:center',
      'gap:16px',
      'font-size:14px',
      'font-family:Lato,sans-serif',
      'position:relative',
      'z-index:200',
      'flex-wrap:wrap'
    ].join(';');

    banner.innerHTML =
      '<span>' +
        (b.banner_title ? '<strong style="font-family:Cormorant Garamond,serif;font-size:16px;">' + b.banner_title + '</strong>' : '') +
        (b.banner_text  ? (b.banner_title ? ' — ' : '') + b.banner_text : '') +
      '</span>' +
      (b.banner_cta
        ? '<a href="' + bookingHref + '" style="' +
            'background:rgba(255,255,255,0.22);' +
            'color:inherit;' +
            'border:1px solid rgba(255,255,255,0.38);' +
            'padding:5px 16px;' +
            'border-radius:20px;' +
            'font-size:11px;' +
            'font-weight:700;' +
            'letter-spacing:0.06em;' +
            'text-transform:uppercase;' +
            'text-decoration:none;' +
            'white-space:nowrap;' +
          '">' + b.banner_cta + '</a>'
        : '');

    document.body.insertBefore(banner, document.body.firstChild);
  };

  const s   = document.createElement('script');
  s.src     = APPS_SCRIPT_URL + '?action=getBanner&callback=_bannerCallback';
  s.onerror = function() { delete window._bannerCallback; };
  document.head.appendChild(s);
})();

// =============================================
// DOM Ready
// =============================================
document.addEventListener('DOMContentLoaded', function () {

  // ---- Mobile Nav Toggle ----
  const navToggle = document.querySelector('.nav-toggle');
  const nav       = document.querySelector('.nav');

  if (navToggle) {
    navToggle.addEventListener('click', () => nav.classList.toggle('mobile-open'));
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('mobile-open'));
    });
  }

  // ---- Active nav link ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Scroll fade-in animation ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-card, .review-card, .about-inner').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

});

// =============================================
// 🌿 Member Nav Button (모든 페이지)
// =============================================
(function initMemberNav() {
  const btn = document.getElementById('navMemberBtn');
  if (!btn) return;

  function getSession() {
    try {
      const raw = localStorage.getItem('kaylees_member');
      if (!raw) return null;
      const s = JSON.parse(raw);
      if (!s || !s.token || !s.email) return null;
      if (new Date(s.expires) < new Date()) { localStorage.removeItem('kaylees_member'); return null; }
      return s;
    } catch(e) { return null; }
  }

  const session = getSession();
  if (session) {
    // 로그인 상태 — 계정 버튼
    const label = session.name ? session.name.split(' ')[0] : 'Account';
    btn.innerHTML =
      '<a href="account.html" style="' +
        'display:inline-flex;align-items:center;gap:6px;' +
        'background:var(--green-light);color:var(--green-dark);' +
        'padding:8px 16px;border-radius:40px;font-size:13px;font-weight:700;' +
        'letter-spacing:0.5px;white-space:nowrap;transition:all 0.2s;' +
      '">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' +
      '</svg>' +
      label + '</a>';
  } else {
    // 비로그인 상태 — Sign In 버튼
    btn.innerHTML =
      '<a href="login.html" style="' +
        'display:inline-flex;align-items:center;gap:5px;' +
        'color:var(--text-mid);font-size:13px;white-space:nowrap;' +
        'transition:color 0.2s;' +
      '">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>' +
        '<polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/>' +
      '</svg>' +
      'Sign In</a>';
  }
})();

// ---- Fade-in CSS ----
const style = document.createElement('style');
style.textContent = `
  .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);
