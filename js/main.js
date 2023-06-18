const url = 'https://cc66-46-164-217-97.ngrok-free.app/';
var token = GetCookie("access_token")
const headers = {
  "Host":  'cc66-46-164-217-97.ngrok-free.app',
  "Origin":  'https://cc66-46-164-217-97.ngrok-free.app/',
  "Accept": "*/*",
  'ngrok-skip-browser-warning':true
}
var userId = '';

if (token) {
  GetUrl('role')
    .then(data => {
      userId = data.id;
      SelectFunctionalByRole(data['role'])
    })
    .catch((error) => {
      console.error('Error:', error);
      location.assign('/unauthorized/home')
    });
} else {
  location.assign('/unauthorized/home')
}

function SelectFunctionalByRole(role){
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
function GetCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function GetUrl(getUrl) {
  console.log("get " + getUrl);
  return fetch(url + getUrl, {
    method: 'GET',
    headers: headers
  })
    .then(response => response.json())
}

function PostUrl(postUrl, body) {
  console.log("get " + postUrl);
  return fetch(url + postUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
    .then(response => response.json())
}
