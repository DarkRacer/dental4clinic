const url = 'http://localhost:8888/';
const headers = {
  "Host":  'localhost',
  "Origin":  'http://localhost:8888/',
  "Accept": "*/*",
  'ngrok-skip-browser-warning':true
}

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

const token = getCookie("access_token");

const get = (path) => {
  return fetch(url+path, {
    method: 'GET',
    headers: headers
  })
    .then(response => response.json())
}

const post = (path, body) => {
  return fetch(url+path, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
    .then(response => response.json())
}

const postWithoutResponse = (path, body) => {
  return fetch(url + path, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
    .then(response => response)
}

const selectFunctionalByRole = (role) => {
  if (role === "USER") {
    location.assign('/user/home')
  } else if (role === "DOCTOR") {
    location.assign('/doctor/home')
  } else if (role === "ADMIN") {
    location.assign('/admin/home')
  } else if (role === "DIRECTOR") {
    location.assign('/director/home')
  } else {
    location.assign('/unauthorized/home')
  }
}

export { get, post, getCookie, token, postWithoutResponse, selectFunctionalByRole }
