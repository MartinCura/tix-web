import 'whatwg-fetch'

function getAuthentication(token) {
  if(token) {
    return { 'Authorization': `JWT ${token}` }
  }
  return {};
}

export default function isoFetch(url, options = {}) {
  const method = options.method || 'GET';
  const body = JSON.stringify(options.body) || {};
  const fullUrl = `https://tix.innova-red.net/api${url}`;
  return (token) => {
    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...getAuthentication(token)
    }
    return fetch(fullUrl, { headers: headers , method,  body: body });
  }
}