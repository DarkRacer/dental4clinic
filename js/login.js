const url = 'https://af2f-46-164-217-97.ngrok-free.app/';
var token = GetCookie("access_token")
const headers = {
  "Host":  'af2f-46-164-217-97.ngrok-free.app',
  "Origin":  'https://af2f-46-164-217-97.ngrok-free.app/',
  "Accept": "*/*",
  'ngrok-skip-browser-warning':true
}
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const login = loginForm.login.value;
  const password = loginForm.password.value;
  console.log(login)
  console.log(password)

  const loginBody = {
    login: login,
    password: password
  }
  PostUrl("login", loginBody).then(data => {
    document.cookie =`access_token=${data['access_token']}`
    document.cookie =`id=${data['id']}`
    SelectFunctionalByRole(data['role'])
  })
    .catch((error) => {
      console.error('Error:', error);
    });
})
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
  console.log("Post " + postUrl);
  return fetch(url + postUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
    .then(response => response.json())
}
function SelectFunctionalByRole(role) {
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
