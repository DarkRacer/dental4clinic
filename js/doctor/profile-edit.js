const url ='https://localhost:8000/';
var token = GetCookie("access_token")
const headers = {
  "Host": "localhost:8000",
  "Origin": "https://localhost:8000",
  "Accept": "*/*"
}


let query = window.location.href.split('/');
let userId = query[query.length - 2];

let editForm = document.getElementById("edit-form");
let saveButton = document.getElementById("save-button");
let imageString ='';


getUserInfo();

function getUserInfo() {
  GetUrl(`user/doctor/${userId}`).then(data => {
    editForm.name.value = data.name;
    editForm.surname.value = data.surname;
    editForm.patronymic.value = data.patronymic;
    imageString = data.photo;
  }).catch(error => console.error(error));
}

saveButton.addEventListener("click", (e) => {
  e.preventDefault();

  const editBody = {
    name: editForm.name.value,
    surname: editForm.surname.value,
    patronymic: editForm.patronymic.value,
    photo: imageString
  }

  PostUrl(`user/edit/${userId}`, editBody).then(data => {
    alert('Данные обновлены');
    location.assign('/profile/2');
  })
    .catch((error) => {
      console.error('Error:', error);
    });

})

function imageUploaded() {
  var file = document.querySelector(
    'input[type=file]')['files'][0];

  var reader = new FileReader();

  reader.onload = function () {
    imageString = reader.result;
  }
  reader.readAsDataURL(file);
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
    .then(response => response)
}
