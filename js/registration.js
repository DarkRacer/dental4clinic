const url = 'https://cc66-46-164-217-97.ngrok-free.app/';
var token = GetCookie("access_token")
const headers = {
  "Host":  'cc66-46-164-217-97.ngrok-free.app',
  "Origin":  'https://cc66-46-164-217-97.ngrok-free.app/',
  "Accept": "*/*",
  'ngrok-skip-browser-warning':true
}

const registrationForm = document.getElementById("registration-form");
const registrationButton = document.getElementById("save-button");
let imageString ='';

registrationButton.addEventListener("click", (e) => {
  e.preventDefault();

  const registrationBody = {
    name: registrationForm.name.value,
    surname: registrationForm.surname.value,
    patronymic: registrationForm.patronymic.value,
    dateOfBirthday: registrationForm.dateOfBirthday.value,
    address: registrationForm.address.value,
    allergies: registrationForm.allergies.value,
    login: registrationForm.login.value,
    password: registrationForm.password.value,
    phone: registrationForm.phone.value,
    email: registrationForm.email.value,
    photo: imageString
  }

  PostUrl("registration", registrationBody).then(data => {
    document.cookie =`access_token=${data['access_token']}`
    document.cookie =`id=${data['id']}`
    SelectFunctionalByRole(data['role'])
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

function PostUrl(postUrl, body) {
  console.log("get " + postUrl);
  return fetch(url + postUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
    .then(response => response.json())
}
