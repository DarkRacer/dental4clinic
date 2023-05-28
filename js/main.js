const url ='https://localhost:8000/';
var token = GetCookie("access_token")

if (token) {
  GetUrl('role')
    .then(data => {
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
    headers: {'Authorization': `Bearer ${token}`}
  })
    .then(response => response.json())
}

function PostUrl(postUrl, body) {
  console.log("get " + postUrl);
  return fetch(url + postUrl, {
    method: 'POST',
    headers: {'Authorization': `Bearer ${token}`},
    body: JSON.stringify(body)
  })
    .then(response => response.json())
}
