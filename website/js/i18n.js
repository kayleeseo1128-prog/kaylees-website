// ============================================================
// js/i18n.js — Kaylees Massage & Skincare Language Toggle
// EN ↔ KO toggle stored in localStorage
// ============================================================

(function () {
  'use strict';

  // ----------------------------------------------------------
  // TRANSLATIONS
  // ----------------------------------------------------------
  var T = {
    en: {
      // NAV
      'nav.home':     'Home',
      'nav.services': 'Services',
      'nav.journal':  'Journal',
      'nav.reviews':  'Reviews',
      'nav.book':     'Book Now',

      // FOOTER
      'footer.tagline':    'K-beauty massage & skincare in Metro Vancouver. Natural, warm, and authentic — every session.',
      'footer.tagline.b':  'K-beauty massage & skincare in Burnaby & Coquitlam. Natural, warm, and authentic — every session.',
      'footer.h.services': 'Services',
      'footer.h.quick':    'Quick Links',
      'footer.h.contact':  'Contact',
      'footer.link.book':  'Book Now',
      'footer.link.reviews':'Reviews',
      'footer.contact.dm': 'DM on Instagram',
      'footer.copyright':  '© 2026 Kaylees Massage & Skincare. All rights reserved.',

      // INDEX
      'home.eyebrow':        'K-Beauty · Metro Vancouver',
      'home.hero.title':     'Your skin,<br><em>naturally</em><br>glowing.',
      'home.hero.desc':      'Experience the art of K-beauty facial contouring and bamboo body therapy — designed to deeply relax, restore, and reveal your natural glow.',
      'home.hero.book':      'Book a Session',
      'home.hero.services':  'View Services',
      'home.usp.kbeauty.h':  'K-Beauty Expertise',
      'home.usp.kbeauty.p':  'Korean techniques for facial contouring & lymphatic care',
      'home.usp.bamboo.h':   'Bamboo Therapy',
      'home.usp.bamboo.p':   'Signature bamboo techniques for lift, glow & relaxation',
      'home.usp.medical.h':  'Medical-Grade Products',
      'home.usp.medical.p':  'Korean aesthetic-grade skincare — Histolab, L-Iancell & more',
      'home.svc.label':      'What We Offer',
      'home.svc.title':      'Services for Your<br><em class="script">skin & soul</em>',
      'home.svc.subtitle':   'From tension-relieving body massage to K-beauty facial contouring — every treatment is crafted for your wellbeing.',
      'home.svc.body.h':     'Body Massage',
      'home.svc.body.p':     'From gentle hand massage that melts away tension to targeted bamboo body therapy for muscle release and slimming effects — tailored to what your body needs.',
      'home.svc.body.link':  'View Details',
      'home.svc.bamboo.h':   'Bamboo Facial Therapy',
      'home.svc.bamboo.p':   'Signature bamboo techniques for facial lift, hydration, and lymphatic flow. Glow from within.',
      'home.svc.bamboo.link':'View Details',
      'home.svc.kcon.h':     'K-Contour Facial',
      'home.svc.kcon.p':     'K-beauty facial contouring focused on definition and facial harmony. Achieve your natural V-line.',
      'home.svc.kcon.link':  'View Details',
      'home.svc.all':        'See All Services & Pricing',
      'home.about.label':    'About Kaylee',
      'home.about.title':    'Korean expertise,<br><em class="script">with warmth.</em>',
      'home.about.p1':       "Hi, I'm Kaylee — a licensed Korean esthetician with over 5 years of hands-on experience in facial and body care. More than 3 of those years were spent at Yaksonmyeongga, one of Korea's most respected premium spa brands, where I refined my craft in K-beauty contouring and bamboo therapy.",
      'home.about.p2':       "What drives me every day is simple: seeing someone leave feeling more confident, relaxed, and at home in their own skin. That moment of transformation — when a client glows from the inside out — is why I do this work, and it never gets old.",
      'home.about.p3':       'Now based in Burnaby, I bring that same care and expertise to Metro Vancouver, using Korean medical-grade products and authentic techniques tailored to each person.',
      'home.about.cred1':    'Licensed Esthetician — Korean Certification',
      'home.about.cred2':    '3+ Years at Yaksonmyeongga — Premium K-beauty Spa, Korea',
      'home.about.cred3':    'Medical-grade products — Histolab, L-Iancell, Yaksonmyeongga',
      'home.about.cred4':    'Serving Metro Vancouver — Studio at 4501 North Rd., Burnaby BC',
      'home.about.book':     'Book Your Session',
      'home.badge.exp':      'Years of<br>Experience',
      'home.cta.script':     'Ready to glow?',
      'home.cta.h2':         'Book Your Session Today',
      'home.cta.p':          'Available in Metro Vancouver. DM on Instagram or book directly below.',
      'home.cta.btn':        'Reserve Your Spot',
      'home.ig.label':       'Follow Along',
      'home.ig.subtitle':    'See our latest treatments, skincare tips, and behind-the-scenes on Instagram.',
      'home.ig.follow':      'Follow for treatments, tips & behind-the-scenes',
      'home.ig.btn':         'Follow on Instagram',

      // SERVICES
      'svc.eyebrow':         'our treatments',
      'svc.h1':              'Services & Pricing',
      'svc.h1.p':            'Each treatment is thoughtfully designed to restore balance, reveal your natural glow, and deeply relax.',
      'svc.th.treatment':    'Treatment',
      'svc.th.duration':     'Duration',
      'svc.th.price':        'Price',
      'svc.book':            'Book',
      'svc.label.facial':    'Facial',
      'svc.label.body':      'Body Massage',
      'svc.bamboo.desc':     'Signature bamboo techniques applied to the face for natural lifting, improved lymphatic flow, and a radiant, healthy glow.',
      'svc.firming.name':    'Firming & Lifting',
      'svc.firming.desc':    'Deep bamboo lifting for firmer, more defined skin',
      'svc.dewdrop.name':    'Dewdrop Hydration',
      'svc.dewdrop.desc':    'Intensive moisture infusion for plump, dewy skin',
      'svc.glow.name':       'Glow Brightening',
      'svc.glow.desc':       'Brightening treatment for luminous, even-toned skin',
      'svc.kcon.desc':       'K-beauty facial contouring techniques focused on definition, facial harmony, and natural slimming — for a sculpted, balanced look.',
      'svc.vline.name':      'V-Line Facial',
      'svc.vline.desc':      'Contouring treatment for a defined, slimmer jawline',
      'svc.balanced.name':   'Balanced Contour Facial',
      'svc.balanced.desc':   'Full facial harmony treatment for symmetry and lift',
      'svc.kaylees.desc':    'Gentle hand massage techniques designed to deeply relax the body, release muscle tension, and restore a sense of calm from head to toe.',
      'svc.advanced.name':   'Advanced Body Massage',
      'svc.advanced.desc':   'Full-body deep relaxation with extended care',
      'svc.essential.name':  'Essential Body Massage',
      'svc.essential.desc':  'Classic full-body relaxation massage',
      'svc.relax.name':      'Relax Body Massage',
      'svc.relax.desc':      'Express session for a quick recharge',
      'svc.bamboo.body.desc':'Targeted bamboo massage techniques that focus on specific areas for muscle release, improved circulation, and slimming effects.',
      'svc.shoulder.name':   'Shoulder & Arm Lift',
      'svc.shoulder.desc':   'Targeted relief and toning for shoulders and arms',
      'svc.lightlegs.name':  'Light Legs',
      'svc.lightlegs.desc':  'Lymphatic drainage and slimming for legs',
      'svc.backrelief.name': 'Deep Back Relief',
      'svc.backrelief.desc': 'Deep bamboo work targeting back tension and knots',
      'svc.cta.script':      "let's get started",
      'svc.cta.h2':          'Ready to Book?',
      'svc.cta.p':           'Reserve your session online or reach out via Instagram DM.',
      'svc.cta.btn':         'Book Your Session',

      // JOURNAL
      'journal.eyebrow':     'insights & guides',
      'journal.h1':          'Journal',
      'journal.p':           "Expert knowledge on K-beauty, massage therapy, and taking care of your skin — from Kaylee's studio to you.",

      // BOOKING
      'booking.eyebrow':     'reserve your session',
      'booking.h1':          'Book an Appointment',
      'booking.p':           "Select your service, pick a date and time, and you're all set.",
      'booking.info.h2':     'What to <em class="script">expect</em>',
      'booking.info.p':      'Kaylee will send a confirmation email once your booking is received.',
      'booking.loc':         'Location',
      'booking.contact':     'Contact',
      'booking.hours':       'Hours',
      'booking.payment':     'Payment',
      'booking.hours.val':   'Mon · Wed · Fri · Sat, 10am – 7pm',
      'booking.pay.val':     'e-Transfer or cash at the studio',
      'booking.step1':       'Service',
      'booking.step2':       'Date',
      'booking.step3':       'Time',
      'booking.step4':       'Info',
      'booking.s1.h3':       'Choose a Service',
      'booking.s1.desc':     'Select up to 2 treatments to combine in one session.',
      'booking.s2.h3':       'Pick a Date',
      'booking.s2.desc':     'Available on Mon, Wed, Fri & Sat.',
      'booking.s3.h3':       'Pick a Time',
      'booking.s4.h3':       'Your Information',
      'booking.s4.desc':     'Almost done — just a few details.',
      'booking.label.name':  'Full Name *',
      'booking.label.phone': 'Phone *',
      'booking.label.dob':   'Date of Birth *',
      'booking.label.email': 'Email *',
      'booking.label.ref':   'How did you hear about me? *',
      'booking.label.notes': 'Notes',
      'booking.ph.name':     'Your full name',
      'booking.ph.notes':    'Skin concerns, allergies, or anything we should know...',
      'booking.select':      'Select an option',
      'booking.ref.ig':      'Instagram (@kaylees_van)',
      'booking.ref.google':  'Google Search',
      'booking.ref.friend':  'Friend / Word of Mouth',
      'booking.ref.ret':     'Returning Client',
      'booking.ref.other':   'Other',
      'booking.btn.next2':   'Next — Pick a Date →',
      'booking.btn.next3':   'Next — Pick a Time →',
      'booking.btn.next4':   'Next — Your Info →',
      'booking.btn.confirm': 'Confirm Booking',
      'booking.ok.h3':       'Request Received!',
      'booking.ok.p':        "Thank you! We'll review and confirm your appointment shortly. A confirmation email will be sent to you once approved.",
      'booking.ok.back':     'Back to Home',
      'booking.grp.bamboo':  'Facial — Bamboo Skincare Therapy',
      'booking.grp.kcon':    'Facial — K-Contour',
      'booking.grp.kaylees': "Body Massage — Kaylee's Touch",
      'booking.grp.bb':      'Body Massage — Bamboo Body Therapy',

      // REVIEWS
      'reviews.eyebrow':     'what clients say',
      'reviews.h1':          'Reviews',
      'reviews.p':           "Real experiences from real clients — we're proud of every session.",
      'reviews.form.label':  'Share Your Experience',
      'reviews.form.h2':     'Leave a <em class="script">Review</em>',
      'reviews.form.sub':    "Had a session with Kaylee? We'd love to hear how it went.",
      'reviews.label.name':  'Your Name *',
      'reviews.label.svc':   'Service Received *',
      'reviews.label.rating':'Rating *',
      'reviews.label.review':'Your Review *',
      'reviews.ph.name':     'e.g. Sarah L.',
      'reviews.ph.review':   'Tell us about your experience — what did you love? How did you feel after the session?',
      'reviews.select':      'Select a service',
      'reviews.grp.facial':  'Facial',
      'reviews.grp.body':    'Body Massage',
      'reviews.submit':      'Submit Review',
      'reviews.note':        'Your review will be shared on this page after approval.',
      'reviews.cta.script':  'your turn',
      'reviews.cta.h2':      'Experience It for Yourself',
      'reviews.cta.p':       'Join our growing community of happy clients in Burnaby & Coquitlam.',
      'reviews.cta.btn':     'Book Your Session',
    },

    ko: {
      // NAV
      'nav.home':     '홈',
      'nav.services': '서비스',
      'nav.journal':  '저널',
      'nav.reviews':  '리뷰',
      'nav.book':     '예약하기',

      // FOOTER
      'footer.tagline':    'K-뷰티 마사지 & 스킨케어 — 메트로 밴쿠버. 자연스럽고 따뜻하게, 매번 진심을 담아.',
      'footer.tagline.b':  'K-뷰티 마사지 & 스킨케어 — 버나비 & 코퀴틀람. 자연스럽고 따뜻하게, 매번 진심을 담아.',
      'footer.h.services': '서비스',
      'footer.h.quick':    '빠른 링크',
      'footer.h.contact':  '연락처',
      'footer.link.book':  '예약하기',
      'footer.link.reviews':'리뷰',
      'footer.contact.dm': '인스타그램 DM',
      'footer.copyright':  '© 2026 Kaylees Massage & Skincare. All rights reserved.',

      // INDEX
      'home.eyebrow':        'K-뷰티 · 메트로 밴쿠버',
      'home.hero.title':     '나만의 피부,<br><em>자연스럽게</em><br>빛나게.',
      'home.hero.desc':      'K-뷰티 페이셜 컨투어링과 뱀부 바디 테라피의 예술을 경험하세요 — 깊은 이완, 회복, 그리고 자연스러운 글로우를 위해 설계되었습니다.',
      'home.hero.book':      '세션 예약하기',
      'home.hero.services':  '서비스 보기',
      'home.usp.kbeauty.h':  'K-뷰티 전문성',
      'home.usp.kbeauty.p':  '페이셜 컨투어링 & 림프 관리를 위한 한국 테크닉',
      'home.usp.bamboo.h':   '뱀부 테라피',
      'home.usp.bamboo.p':   '리프팅, 글로우 & 릴랙스를 위한 시그니처 뱀부 테크닉',
      'home.usp.medical.h':  '메디컬 등급 제품',
      'home.usp.medical.p':  '한국 에스테틱 등급 스킨케어 — Histolab, L-Iancell 외',
      'home.svc.label':      '서비스 소개',
      'home.svc.title':      '당신을 위한 서비스,<br><em class="script">피부와 마음</em>',
      'home.svc.subtitle':   '긴장 완화 바디 마사지부터 K-뷰티 페이셜 컨투어링까지 — 모든 트리트먼트는 당신의 웰빙을 위해 정성껏 준비됩니다.',
      'home.svc.body.h':     '바디 마사지',
      'home.svc.body.p':     '긴장을 녹여주는 핸드 마사지부터 근육 이완과 슬리밍 효과를 위한 뱀부 바디 테라피까지 — 몸이 필요로 하는 것에 맞춰 드립니다.',
      'home.svc.body.link':  '자세히 보기',
      'home.svc.bamboo.h':   '뱀부 페이셜 테라피',
      'home.svc.bamboo.p':   '페이셜 리프팅, 수분 보충, 림프 순환을 위한 시그니처 뱀부 테크닉. 내면에서 빛나세요.',
      'home.svc.bamboo.link':'자세히 보기',
      'home.svc.kcon.h':     'K-컨투어 페이셜',
      'home.svc.kcon.p':     '선명함과 페이셜 하모니를 위한 K-뷰티 페이셜 컨투어링. 자연스러운 V라인을 완성하세요.',
      'home.svc.kcon.link':  '자세히 보기',
      'home.svc.all':        '전체 서비스 & 가격 보기',
      'home.about.label':    'Kaylee 소개',
      'home.about.title':    '한국 전문성,<br><em class="script">따뜻함으로.</em>',
      'home.about.p1':       '안녕하세요, Kaylee입니다 — 페이셜 및 바디 케어 분야에서 5년 이상의 실무 경험을 쌓은 한국 면허 피부관리사입니다. 그 중 3년 이상을 한국의 대표 프리미엄 스파 브랜드인 약손명가에서 K-뷰티 컨투어링과 뱀부 테라피 기술을 연마하며 보냈습니다.',
      'home.about.p2':       '매일 저를 움직이는 것은 단순합니다: 더 자신감 있고, 편안하며, 자신의 피부가 편안하게 느껴지는 상태로 돌아가는 고객을 보는 것. 그 변화의 순간 — 안에서 밖으로 빛나는 고객을 볼 때 — 이것이 제가 이 일을 하는 이유이며, 절대 익숙해지지 않습니다.',
      'home.about.p3':       '현재 버나비에 기반을 두고, 한국 메디컬 등급 제품과 각 개인에 맞춤화된 정통 테크닉으로 메트로 밴쿠버에 동일한 정성과 전문성을 제공합니다.',
      'home.about.cred1':    '한국 피부관리사 자격증 보유',
      'home.about.cred2':    '약손명가 3년+ 근무 — 한국 프리미엄 K-뷰티 스파',
      'home.about.cred3':    '메디컬 등급 제품 사용 — Histolab, L-Iancell, 약손명가',
      'home.about.cred4':    '메트로 밴쿠버 서비스 — 스튜디오: 4501 North Rd., Burnaby BC',
      'home.about.book':     '세션 예약하기',
      'home.badge.exp':      '년<br>경력',
      'home.cta.script':     '빛날 준비 되셨나요?',
      'home.cta.h2':         '지금 세션 예약하기',
      'home.cta.p':          '메트로 밴쿠버에서 운영 중. 인스타그램 DM으로 문의하거나 아래에서 직접 예약하세요.',
      'home.cta.btn':        '자리 예약하기',
      'home.ig.label':       '팔로우하기',
      'home.ig.subtitle':    '인스타그램에서 최신 트리트먼트, 스킨케어 팁, 비하인드를 확인하세요.',
      'home.ig.follow':      '트리트먼트, 팁 & 비하인드를 팔로우하세요',
      'home.ig.btn':         '인스타그램 팔로우',

      // SERVICES
      'svc.eyebrow':         '트리트먼트 안내',
      'svc.h1':              '서비스 & 가격',
      'svc.h1.p':            '각 트리트먼트는 균형 회복, 자연스러운 글로우 표현, 깊은 릴랙스를 위해 정성껏 설계되었습니다.',
      'svc.th.treatment':    '트리트먼트',
      'svc.th.duration':     '시간',
      'svc.th.price':        '가격',
      'svc.book':            '예약',
      'svc.label.facial':    '페이셜',
      'svc.label.body':      '바디 마사지',
      'svc.bamboo.desc':     '페이셜 자연 리프팅, 림프 순환 개선, 건강하고 빛나는 글로우를 위한 시그니처 뱀부 테크닉.',
      'svc.firming.name':    '피르밍 & 리프팅',
      'svc.firming.desc':    '더 탄탄하고 선명한 피부를 위한 딥 뱀부 리프팅',
      'svc.dewdrop.name':    '이슬방울 수분 케어',
      'svc.dewdrop.desc':    '풍성하고 촉촉한 피부를 위한 집중 수분 공급',
      'svc.glow.name':       '글로우 브라이트닝',
      'svc.glow.desc':       '광채 있고 균일한 피부톤을 위한 브라이트닝 트리트먼트',
      'svc.kcon.desc':       '선명함, 페이셜 하모니, 자연스러운 슬리밍을 위한 K-뷰티 페이셜 컨투어링 테크닉.',
      'svc.vline.name':      'V라인 페이셜',
      'svc.vline.desc':      '선명하고 슬림한 턱선을 위한 컨투어링 트리트먼트',
      'svc.balanced.name':   '밸런스드 컨투어 페이셜',
      'svc.balanced.desc':   '대칭과 리프팅을 위한 풀 페이셜 하모니 트리트먼트',
      'svc.kaylees.desc':    '몸 전체를 깊이 이완하고 근육 긴장을 풀어주며 머리부터 발끝까지 평온함을 되찾아주는 핸드 마사지 테크닉.',
      'svc.advanced.name':   '어드밴스드 바디 마사지',
      'svc.advanced.desc':   '연장 케어로 전신 깊은 이완',
      'svc.essential.name':  '에센셜 바디 마사지',
      'svc.essential.desc':  '클래식 전신 릴랙스 마사지',
      'svc.relax.name':      '릴랙스 바디 마사지',
      'svc.relax.desc':      '빠른 재충전을 위한 익스프레스 세션',
      'svc.bamboo.body.desc':'근육 이완, 순환 개선, 슬리밍 효과를 위해 특정 부위에 집중하는 뱀부 마사지 테크닉.',
      'svc.shoulder.name':   '어깨 & 팔 리프트',
      'svc.shoulder.desc':   '어깨와 팔의 집중 이완 및 토닝',
      'svc.lightlegs.name':  '라이트 레그',
      'svc.lightlegs.desc':  '다리를 위한 림프 드레이나지 및 슬리밍',
      'svc.backrelief.name': '딥 백 릴리프',
      'svc.backrelief.desc': '등 긴장과 뭉침을 집중 케어하는 딥 뱀부 트리트먼트',
      'svc.cta.script':      '함께 시작해요',
      'svc.cta.h2':          '예약 준비 되셨나요?',
      'svc.cta.p':           '온라인으로 세션을 예약하거나 인스타그램 DM으로 문의하세요.',
      'svc.cta.btn':         '세션 예약하기',

      // JOURNAL
      'journal.eyebrow':     '인사이트 & 가이드',
      'journal.h1':          '저널',
      'journal.p':           "K-뷰티, 마사지 테라피, 피부 관리에 대한 전문 지식 — Kaylee의 스튜디오에서 여러분에게.",

      // BOOKING
      'booking.eyebrow':     '세션 예약하기',
      'booking.h1':          '예약하기',
      'booking.p':           '서비스를 선택하고, 날짜와 시간을 고르면 완료입니다.',
      'booking.info.h2':     '<em class="script">예약</em> 안내',
      'booking.info.p':      '예약이 접수되면 Kaylee가 확인 이메일을 보내드립니다.',
      'booking.loc':         '위치',
      'booking.contact':     '연락처',
      'booking.hours':       '운영 시간',
      'booking.payment':     '결제',
      'booking.hours.val':   '월 · 수 · 금 · 토, 오전 10시 – 오후 7시',
      'booking.pay.val':     'e-Transfer 또는 현장 현금 결제',
      'booking.step1':       '서비스',
      'booking.step2':       '날짜',
      'booking.step3':       '시간',
      'booking.step4':       '정보',
      'booking.s1.h3':       '서비스 선택',
      'booking.s1.desc':     '한 세션에 최대 2가지 트리트먼트를 선택할 수 있습니다.',
      'booking.s2.h3':       '날짜 선택',
      'booking.s2.desc':     '월, 수, 금, 토에 이용 가능합니다.',
      'booking.s3.h3':       '시간 선택',
      'booking.s4.h3':       '고객 정보',
      'booking.s4.desc':     '거의 다 됐어요 — 몇 가지만 더 입력해 주세요.',
      'booking.label.name':  '이름 *',
      'booking.label.phone': '전화번호 *',
      'booking.label.dob':   '생년월일 *',
      'booking.label.email': '이메일 *',
      'booking.label.ref':   '어디서 알게 되셨나요? *',
      'booking.label.notes': '메모',
      'booking.ph.name':     '이름을 입력하세요',
      'booking.ph.notes':    '피부 고민, 알레르기, 또는 알려주실 사항...',
      'booking.select':      '선택해 주세요',
      'booking.ref.ig':      'Instagram (@kaylees_van)',
      'booking.ref.google':  '구글 검색',
      'booking.ref.friend':  '지인 소개',
      'booking.ref.ret':     '재방문 고객',
      'booking.ref.other':   '기타',
      'booking.btn.next2':   '다음 — 날짜 선택 →',
      'booking.btn.next3':   '다음 — 시간 선택 →',
      'booking.btn.next4':   '다음 — 정보 입력 →',
      'booking.btn.confirm': '예약 확인',
      'booking.ok.h3':       '예약 신청 완료!',
      'booking.ok.p':        '감사합니다! 예약을 검토 후 곧 확인해 드리겠습니다. 승인되면 확인 이메일을 보내드립니다.',
      'booking.ok.back':     '홈으로 돌아가기',
      'booking.grp.bamboo':  '페이셜 — 뱀부 스킨케어 테라피',
      'booking.grp.kcon':    '페이셜 — K-컨투어',
      'booking.grp.kaylees': "바디 마사지 — Kaylee's Touch",
      'booking.grp.bb':      '바디 마사지 — 뱀부 바디 테라피',

      // REVIEWS
      'reviews.eyebrow':     '고객들의 이야기',
      'reviews.h1':          '리뷰',
      'reviews.p':           '실제 고객들의 진솔한 경험 — 모든 세션이 자랑스럽습니다.',
      'reviews.form.label':  '경험 공유하기',
      'reviews.form.h2':     '<em class="script">리뷰</em> 남기기',
      'reviews.form.sub':    'Kaylee와 함께한 세션이 있으신가요? 어떠셨는지 알려주세요.',
      'reviews.label.name':  '이름 *',
      'reviews.label.svc':   '받으신 서비스 *',
      'reviews.label.rating':'평점 *',
      'reviews.label.review':'리뷰 *',
      'reviews.ph.name':     '예: 김지수',
      'reviews.ph.review':   '세션 경험을 알려주세요 — 어떤 점이 좋으셨나요? 세션 후 어떤 느낌이셨나요?',
      'reviews.select':      '서비스 선택',
      'reviews.grp.facial':  '페이셜',
      'reviews.grp.body':    '바디 마사지',
      'reviews.submit':      '리뷰 제출',
      'reviews.note':        '검토 후 이 페이지에 게시됩니다.',
      'reviews.cta.script':  '이제 당신 차례',
      'reviews.cta.h2':      '직접 경험해 보세요',
      'reviews.cta.p':       '버나비 & 코퀴틀람의 성장하는 행복한 고객 커뮤니티에 합류하세요.',
      'reviews.cta.btn':     '세션 예약하기',
    }
  };

  // ----------------------------------------------------------
  // INJECT CSS for language toggle button
  // ----------------------------------------------------------
  var css = document.createElement('style');
  css.textContent = [
    '.lang-toggle{display:flex;align-items:center;gap:2px;margin-left:16px;',
    'background:var(--beige);border-radius:20px;padding:3px;',
    'border:1px solid var(--beige-dark);}',
    '.lang-btn{background:none;border:none;cursor:pointer;font-size:11px;',
    'font-family:var(--font-body);letter-spacing:0.5px;font-weight:700;',
    'color:var(--text-light);padding:4px 10px;border-radius:16px;',
    'transition:all 0.2s;line-height:1;}',
    '.lang-btn:hover{color:var(--green-dark);}',
    '.lang-btn.active{background:var(--green-dark);color:white;}',
    '@media(max-width:768px){.lang-toggle{margin-left:8px;}}'
  ].join('');
  document.head.appendChild(css);

  // ----------------------------------------------------------
  // APPLY LANGUAGE
  // ----------------------------------------------------------
  function applyLang(lang) {
    var t = T[lang] || T['en'];

    try { localStorage.setItem('kaylees_lang', lang); } catch (e) {}
    document.documentElement.lang = lang;

    // Plain text
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });

    // HTML content (elements with <em>, <br> etc.)
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (t[key] !== undefined) el.innerHTML = t[key];
    });

    // Input placeholders
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-ph');
      if (t[key] !== undefined) el.placeholder = t[key];
    });

    // optgroup labels
    document.querySelectorAll('[data-i18n-label]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-label');
      if (t[key] !== undefined) el.label = t[key];
    });

    // Toggle button state
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }

  // ----------------------------------------------------------
  // INIT
  // ----------------------------------------------------------
  function init() {
    var saved;
    try { saved = localStorage.getItem('kaylees_lang'); } catch (e) {}
    var lang = saved || 'en';

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { applyLang(btn.dataset.lang); });
    });

    applyLang(lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.kaylees_i18n = { apply: applyLang };
})();
