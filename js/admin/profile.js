const url = 'https://af2f-46-164-217-97.ngrok-free.app/';
var token = GetCookie("access_token")
const headers = {
  "Host":  'af2f-46-164-217-97.ngrok-free.app',
  "Origin":  'https://af2f-46-164-217-97.ngrok-free.app/',
  "Accept": "*/*",
  'ngrok-skip-browser-warning':true
}

let nameField = document.getElementById("name");
let photoField = document.getElementById("photo");


getUserInfo()

function getUserInfo() {
  let query = window.location.href.split('/');
  let userId = query[query.length - 1]
  GetUrl(`user/admin/${userId}`).then(data => {
    nameField.innerText = data['full-name'];
    photoField.src = data.photo;
  }).catch(error => console.error(error));
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
