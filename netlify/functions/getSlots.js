// Netlify Function: getSlots
// 서버에서 Google Apps Script를 호출하여 모바일 브라우저 제한 우회
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzQWWM2s_haW6N9IGsyE5C5x0h5TAn3zp6qpIQfMJYo-Z6HBLFPoYydGs728-8mmmODJw/exec';

exports.handler = async function(event) {
  const { date, duration } = event.queryStringParameters || {};
  console.log('getSlots called — date:', date, '| duration:', duration);

  try {
    const url = `${APPS_SCRIPT_URL}?action=getSlots&date=${encodeURIComponent(date)}&duration=${encodeURIComponent(duration)}`;
    const response = await fetch(url);
    const text = await response.text();

    // JSONP 또는 plain JSON 모두 처리
    let data;
    const jsonpMatch = text.match(/^[^(]+\((.+)\)[\s;]*$/s);
    if (jsonpMatch) {
      data = JSON.parse(jsonpMatch[1]);
    } else {
      data = JSON.parse(text);
    }

    console.log('Apps Script response slots:', JSON.stringify(data).substring(0, 200));
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
