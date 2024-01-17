const url = 'http://localhost:8080/api/';
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const get = (path) => {
  const token = 'Bearer ' + getCookie("access_token");
  const headers = {
    "Host":  'localhost',
    "Origin":  'http://localhost:8080/',
    "Accept": "*/*",
    'ngrok-skip-browser-warning':true,
    "Authorization": token,
    'Content-Type': 'application/json'
  }
  return fetch(url+path, {
    method: 'GET',
    headers: headers
  })
    .then(response => response.json())
}

const post = (path, body) => {
  const token = 'Bearer ' + getCookie("access_token");
  const headers = {
    "Host":  'localhost',
    "Origin":  'http://localhost:8080/',
    "Accept": "*/*",
    'ngrok-skip-browser-warning':true,
    "Authorization": token,
    'Content-Type': 'application/json'
  }
  return fetch(url+path, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
    .then(response => response.json())
}

const postWithoutResponse = (path, body) => {
  const token = 'Bearer ' + getCookie("access_token");
  const headers = {
    "Host":  'localhost',
    "Origin":  'http://localhost:8080/',
    "Accept": "*/*",
    'ngrok-skip-browser-warning':true,
    "Authorization": token,
    'Content-Type': 'application/json'
  }
  return fetch(url + path, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
    .then(response => response)
}

export { get, post, getCookie, postWithoutResponse }
