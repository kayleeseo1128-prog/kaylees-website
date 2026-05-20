// =============================================
// Kaylees Massage & Skincare — Booking System
// Google Apps Script Backend
// =============================================
//
// 📋 SETUP INSTRUCTIONS (3 steps):
//
// 1. Apps Script 열기:
//    - 구글 드라이브에서 "서가진+한빛한의원 스케쥴 2026년" 스프레드시트 열기
//    - 상단 메뉴 → 확장 프로그램 → Apps Script
//    - 이 파일의 내용을 전체 복사 → Apps Script에 붙여넣기 (기존 내용 전체 교체)
//    - 저장 (Ctrl+S)
//
// 2. 배포:
//    - Apps Script 상단 → 배포 → 새 배포 (또는 기존 배포 관리 → 새 버전)
//    - 유형: 웹 앱 / 실행 계정: 나(Me) / 액세스: 모든 사용자
//    - 배포 → 웹 앱 URL 복사 → booking.html의 APPS_SCRIPT_URL에 붙여넣기
//
// 3. 하루 전 리마인더 자동 트리거 설정 (최초 1회만):
//    - Apps Script 왼쪽 메뉴 → 시계 아이콘(트리거) 클릭
//    - 트리거 추가 → 함수: sendDailyReminders
//    - 이벤트 소스: 시간 기반 / 유형: 일 단위 타이머 / 시간: 오전 9~10시
//    - 저장
//
// =============================================

// ⚙️ 설정
const CLINIC_SPREADSHEET_ID   = '10iA-KtjFaaIO1jJqMPuQMGdrJLt3H5MDH_l9T_yOmC4'; // 서가진+한빛한의원 (읽기 전용)
const BOOKINGS_SPREADSHEET_ID = '1mefUunQvEhYYnzbRhtqgBLs11xt-N2vXwCtYhx18L5s'; // Kaylees Bookings
const KAYLEE_EMAIL            = 'kayleeseo1128@gmail.com';

// 관리자 비밀번호 (admin.html 로그인 시 사용)
const ADMIN_KEY = 'kaylees2026';

// Kaylees 운영 시간
const START_HOUR = 10; // 10am
const END_HOUR   = 19; // 7pm
const SLOT_MIN   = 30; // 30분 단위

// 한빛한의원 메인 시트 목록 (기간별 탭)
const CLINIC_SHEETS = [
  { name: '20260301-20260630', startDate: '2026-03-01', endDate: '2026-06-30' },
  { name: '20260701-20260931', startDate: '2026-07-01', endDate: '2026-09-30' },
  { name: '20261001-20261231', startDate: '2026-10-01', endDate: '2026-12-31' },
];

// =============================================
// GET 요청 처리
// =============================================
function doGet(e) {
  const action   = e.parameter.action;
  const callback = e.parameter.callback || 'callback';
  let result = {};

  try {
    // ---- 예약 슬롯 조회 (공개) ----
    if (action === 'getSlots') {
      const date     = e.parameter.date;
      const duration = parseInt(e.parameter.duration) || 60;
      result = { success: true, slots: getAvailableSlots(date, duration) };

    // ---- 예약 제출 (공개) ----
    } else if (action === 'submitBooking') {
      const booking = {
        date:     e.parameter.date,
        time:     e.parameter.time,
        duration: parseInt(e.parameter.duration),
        name:     e.parameter.name,
        dob:      e.parameter.dob      || '',
        phone:    e.parameter.phone,
        email:    e.parameter.email,
        service:  e.parameter.service,
        referral: e.parameter.referral || '',
        notes:    e.parameter.notes    || ''
      };
      saveBooking(booking);
      result = { success: true, message: 'Booking confirmed!' };

    // ---- 배너 조회 (공개) ----
    } else if (action === 'getBanner') {
      result = { success: true, banner: getBannerSettings() };

    // ---- 리뷰 제출 (공개) ----
    } else if (action === 'submitReview') {
      saveReview({
        name:    e.parameter.name,
        service: e.parameter.service,
        rating:  e.parameter.rating,
        review:  e.parameter.review
      });
      result = { success: true };

    // ---- 아래는 관리자 전용 (admin_key 필요) ----
    } else if (action === 'setBanner') {
      checkAdmin(e);
      setBannerSettings(e.parameter);
      result = { success: true };

    } else if (action === 'getBookings') {
      checkAdmin(e);
      result = { success: true, bookings: getBookingsList() };

    } else if (action === 'updateBooking') {
      checkAdmin(e);
      updateBookingStatus(parseInt(e.parameter.row), e.parameter.status);
      result = { success: true };

    } else if (action === 'getReviews') {
      checkAdmin(e);
      result = { success: true, reviews: getReviewsList() };

    } else if (action === 'updateReview') {
      checkAdmin(e);
      updateReviewStatus(parseInt(e.parameter.row), e.parameter.status);
      result = { success: true };

    } else {
      result = { success: false, error: 'Unknown action' };
    }

  } catch (err) {
    result = { success: false, error: err.message };
  }

  // callback 있으면 JSONP, 없으면 plain JSON (fetch() 호환)
  if (callback && callback !== 'null' && callback !== '') {
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(result) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  } else {
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// 관리자 키 검증
function checkAdmin(e) {
  if (e.parameter.admin_key !== ADMIN_KEY) {
    throw new Error('Unauthorized');
  }
}

// =============================================
// 예약 가능 슬롯 계산
// =============================================
function getAvailableSlots(date, serviceDuration) {
  const slotsNeeded = Math.ceil(serviceDuration / SLOT_MIN);

  // 한빛한의원 시트 접근 실패해도 Kaylees 예약 데이터만으로 슬롯 반환
  let clinicBooked = new Set();
  try {
    const clinicSS = SpreadsheetApp.openById(CLINIC_SPREADSHEET_ID);
    clinicBooked = getClinicBookedMinutes(clinicSS, date);
  } catch (clinicErr) {
    Logger.log('Clinic spreadsheet access failed (non-fatal): ' + clinicErr.message);
  }

  const kayleesBooked = getKayleesBookedMinutes(date);
  const bookedMinutes = new Set([...clinicBooked, ...kayleesBooked]);

  const available = [];
  for (let h = START_HOUR; h < END_HOUR; h++) {
    for (let m = 0; m < 60; m += SLOT_MIN) {
      const startMin = h * 60 + m;
      const endMin   = startMin + slotsNeeded * SLOT_MIN;
      if (endMin > END_HOUR * 60) continue;

      let isFree = true;
      for (let s = 0; s < slotsNeeded; s++) {
        if (bookedMinutes.has(startMin + s * SLOT_MIN)) { isFree = false; break; }
      }
      if (isFree) {
        available.push(String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0'));
      }
    }
  }
  return available;
}

// =============================================
// 한빛한의원 시트 읽기 (읽기 전용)
// =============================================
function getClinicBookedMinutes(ss, date) {
  const booked = new Set();
  const sheetName = getClinicSheetName(date);
  if (!sheetName) return booked;
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) return booked;
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return booked;

  const headerRow = data[0];
  const colToMinutes = {};
  for (let col = 1; col < headerRow.length; col++) {
    const m = String(headerRow[col]).trim().match(/^(\d{1,2}):(\d{2})$/);
    if (!m) continue;
    const mins = parseInt(m[1]) * 60 + parseInt(m[2]);
    if (mins >= START_HOUR * 60 && mins < END_HOUR * 60) colToMinutes[col] = mins;
  }
  for (let i = 1; i < data.length; i++) {
    if (!String(data[i][0]).trim().startsWith(date)) continue;
    for (const col in colToMinutes) {
      const v = data[i][col];
      if (v !== '' && v !== null && v !== undefined) booked.add(colToMinutes[col]);
    }
    break;
  }
  return booked;
}

function getKayleesBookedMinutes(date) {
  const booked = new Set();
  const sheet  = SpreadsheetApp.openById(BOOKINGS_SPREADSHEET_ID).getSheets()[0];
  const data   = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (String(row[0]).trim() !== date) continue;
    if (row[10] === 'Cancelled') continue;
    const parts   = String(row[1]).split(':').map(Number);
    const startMin = parts[0] * 60 + parts[1];
    const numSlots = Math.ceil(parseInt(row[2]) / SLOT_MIN);
    for (let s = 0; s < numSlots; s++) booked.add(startMin + s * SLOT_MIN);
  }
  return booked;
}

function getClinicSheetName(date) {
  for (const p of CLINIC_SHEETS) {
    if (date >= p.startDate && date <= p.endDate) return p.name;
  }
  return null;
}

// =============================================
// 예약 저장 + 이메일
// =============================================
function saveBooking(d) {
  const sheet = SpreadsheetApp.openById(BOOKINGS_SPREADSHEET_ID).getSheets()[0];
  sheet.appendRow([
    d.date, d.time, d.duration, d.name, d.dob,
    d.phone, d.email, d.service, d.referral, d.notes,
    'Confirmed', new Date(), ''
  ]);
  if (d.email) sendClientEmail(d);
  sendKayleeEmail(d);
}

// =============================================
// 예약 목록 반환 (관리자용)
// =============================================
function getBookingsList() {
  const sheet = SpreadsheetApp.openById(BOOKINGS_SPREADSHEET_ID).getSheets()[0];
  const data  = sheet.getDataRange().getValues();
  const bookings = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[0]) continue;
    bookings.push({
      row:       i + 1,
      date:      String(row[0]),
      time:      String(row[1]),
      duration:  row[2],
      name:      String(row[3]),
      dob:       String(row[4]),
      phone:     String(row[5]),
      email:     String(row[6]),
      service:   String(row[7]),
      referral:  String(row[8]),
      notes:     String(row[9]),
      status:    String(row[10]),
      submitted: String(row[11])
    });
  }
  return bookings;
}

function updateBookingStatus(rowNum, status) {
  const sheet = SpreadsheetApp.openById(BOOKINGS_SPREADSHEET_ID).getSheets()[0];
  sheet.getRange(rowNum, 11).setValue(status);
}

// =============================================
// 리뷰 저장 + 조회 + 상태 변경
// =============================================
function saveReview(d) {
  const ss = SpreadsheetApp.openById(BOOKINGS_SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Reviews');
  if (!sheet) {
    sheet = ss.insertSheet('Reviews');
    sheet.appendRow(['Name', 'Service', 'Rating', 'Review', 'Submitted', 'Status']);
  }
  sheet.appendRow([d.name, d.service, d.rating, d.review, new Date(), 'Pending']);
}

function getReviewsList() {
  const ss    = SpreadsheetApp.openById(BOOKINGS_SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Reviews');
  if (!sheet) return [];
  const data    = sheet.getDataRange().getValues();
  const reviews = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[0]) continue;
    reviews.push({
      row:       i + 1,
      name:      String(row[0]),
      service:   String(row[1]),
      rating:    Number(row[2]),
      review:    String(row[3]),
      submitted: String(row[4]),
      status:    String(row[5])
    });
  }
  return reviews;
}

function updateReviewStatus(rowNum, status) {
  const ss    = SpreadsheetApp.openById(BOOKINGS_SPREADSHEET_ID);
  const sheet = ss.getSheetByName('Reviews');
  if (!sheet) return;
  sheet.getRange(rowNum, 6).setValue(status);
}

// =============================================
// 배너 설정 (Settings 탭)
// =============================================
function getBannerSettings() {
  const ss = SpreadsheetApp.openById(BOOKINGS_SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Settings');
  if (!sheet) {
    sheet = ss.insertSheet('Settings');
    sheet.appendRow(['Key', 'Value']);
    sheet.appendRow(['banner_active',  'false']);
    sheet.appendRow(['banner_title',   '']);
    sheet.appendRow(['banner_text',    '']);
    sheet.appendRow(['banner_cta',     'Book Now']);
    sheet.appendRow(['banner_color',   'green']);
    sheet.appendRow(['banner_expiry',  '']);
  }
  const data     = sheet.getDataRange().getValues();
  const settings = {};
  for (let i = 1; i < data.length; i++) {
    settings[data[i][0]] = String(data[i][1]);
  }
  return settings;
}

function setBannerSettings(params) {
  const ss = SpreadsheetApp.openById(BOOKINGS_SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Settings');
  if (!sheet) { getBannerSettings(); sheet = ss.getSheetByName('Settings'); }

  const data   = sheet.getDataRange().getValues();
  const keyMap = {};
  for (let i = 1; i < data.length; i++) keyMap[data[i][0]] = i + 1;

  const fields = ['banner_active','banner_title','banner_text','banner_cta','banner_color','banner_expiry'];
  fields.forEach(key => {
    if (params[key] !== undefined && keyMap[key]) {
      sheet.getRange(keyMap[key], 2).setValue(params[key]);
    }
  });
}

// =============================================
// 하루 전 리마인더 (트리거로 매일 오전 9~10시 실행)
// =============================================
function sendDailyReminders() {
  const sheet = SpreadsheetApp.openById(BOOKINGS_SPREADSHEET_ID).getSheets()[0];
  const data  = sheet.getDataRange().getValues();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = Utilities.formatDate(tomorrow, Session.getScriptTimeZone(), 'yyyy-MM-dd');

  for (let i = 1; i < data.length; i++) {
    const row      = data[i];
    const date     = String(row[0]).trim();
    const status   = String(row[10]).trim();
    const reminded = String(row[12]).trim();
    if (date !== tomorrowStr) continue;
    if (status === 'Cancelled') continue;
    if (reminded !== '') continue;
    const clientEmail = String(row[6]).trim();
    if (!clientEmail) continue;
    sendReminderEmail({ name: row[3], date: row[0], time: row[1], service: row[7] }, clientEmail);
    sheet.getRange(i + 1, 13).setValue(new Date());
  }
}

// =============================================
// 이메일 발송
// =============================================
function sendClientEmail(d) {
  MailApp.sendEmail(d.email,
    'Your booking is confirmed — Kaylees Massage & Skincare',
    `Hi ${d.name},\n\nYour booking is confirmed! ✨\n\n` +
    `Service : ${d.service}\nDate    : ${d.date}\nTime    : ${d.time}\n\n` +
    `Location: #318 4501 North Rd., Burnaby, BC\nPayment : e-Transfer or cash at the studio\n\n` +
    `Questions? DM us on Instagram @kaylees_van\n\nSee you soon!\nKaylee 💚`
  );
}

function sendKayleeEmail(d) {
  MailApp.sendEmail(KAYLEE_EMAIL,
    `✅ New Booking — ${d.name} | ${d.date} ${d.time}`,
    `New Kaylees booking received!\n\n` +
    `Name     : ${d.name}\nDOB      : ${d.dob || 'Not provided'}\nPhone    : ${d.phone}\n` +
    `Email    : ${d.email}\nReferral : ${d.referral || 'Not provided'}\n` +
    `Service  : ${d.service} (${d.duration} min)\nDate     : ${d.date}\nTime     : ${d.time}\n` +
    `Notes    : ${d.notes || 'None'}\n\n→ 예약 시트 보기:\n` +
    `https://docs.google.com/spreadsheets/d/${BOOKINGS_SPREADSHEET_ID}`
  );
}

function sendReminderEmail(d, clientEmail) {
  MailApp.sendEmail(clientEmail,
    'Reminder: Your appointment is tomorrow — Kaylees Massage & Skincare',
    `Hi ${d.name},\n\nJust a friendly reminder that your appointment is tomorrow! 💚\n\n` +
    `Service : ${d.service}\nDate    : ${d.date}\nTime    : ${d.time}\n\n` +
    `Location: #318 4501 North Rd., Burnaby, BC\nPayment : e-Transfer or cash at the studio\n\n` +
    `If you need to reschedule, please DM us on Instagram @kaylees_van as soon as possible.\n\n` +
    `See you tomorrow!\nKaylee 💚`
  );
}
