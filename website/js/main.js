// =============================================
// Kaylees Massage & Skincare — Main JS
// =============================================

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzQWWM2s_haW6N9IGsyE5C5x0h5TAn3zp6qpIQfMJYo-Z6HBLFPoYydGs728-8mmmODJw/exec';

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

// ---- Fade-in CSS ----
const style = document.createElement('style');
style.textContent = `
  .fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }
`;
document.head.appendChild(style);
