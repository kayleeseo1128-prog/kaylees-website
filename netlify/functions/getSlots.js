// Netlify Function: getSlots
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzQWWM2s_haW6N9IGsyE5C5x0h5TAn3zp6qpIQfMJYo-Z6HBLFPoYydGs728-8mmmODJw/exec';

exports.handler = async function(event) {
  const { date, duration } = event.queryStringParameters || {};
  console.log('getSlots called — date:', date, '| duration:', duration);

  let text = '';
  try {
    const url = `${APPS_SCRIPT_URL}?action=getSlots&date=${encodeURIComponent(date || '')}&duration=${encodeURIComponent(duration || '60')}`;
    const response = await fetch(url);
    text = await response.text();
    console.log('Raw response:', text.substring(0, 300));

    // plain JSON 또는 JSONP 둘 다 처리
    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      const m = text.indexOf('(');
      const n = text.lastIndexOf(')');
      if (m !== -1 && n !== -1) {
        data = JSON.parse(text.substring(m + 1, n));
      } else {
        throw new Error('Cannot parse response: ' + text.substring(0, 150));
      }
    }

    console.log('Slots returned:', data.slots ? data.slots.length : 'no slots field', '| success:', data.success);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data)
    };

  } catch (err) {
    console.error('getSlots ERROR:', err.message, '| raw text was:', text.substring(0, 200));
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
};
