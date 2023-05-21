const url ='https://localhost:8000/';
var token = GetCookie("access_token")
const headers = {
  "Host": "localhost:8000",
  "Origin": "https://localhost:8000",
  "Accept": "*/*"
}

export function GetCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export function GetUrl(getUrl) {
  console.log("get " + getUrl);
  return fetch(url+getUrl, {
    method: 'GET',
    headers: headers
  })
    .then(response => response.json())
}

export function PostUrl(getUrl, body) {
  console.log("get " + getUrl);
  return fetch(url+getUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
    .then(response => response.json())
}


