const url = 'https://cc66-46-164-217-97.ngrok-free.app/';
var token = GetCookie("access_token")
const headers = {
  "Host":  'cc66-46-164-217-97.ngrok-free.app',
  "Origin":  'https://cc66-46-164-217-97.ngrok-free.app/',
  "Accept": "*/*",
  'ngrok-skip-browser-warning':true
}

let createForm = document.getElementById("createForm");
let saveButton = document.getElementById("save-button");
let notificationSuccess = document.getElementById("notificationSuccess");
let notificationSuccessText = document.getElementById("notificationSuccessText");
let notificationFailed = document.getElementById("notificationFailed");
let notificationFailedText = document.getElementById("notificationFailedText");

notificationSuccess.style.visibility = 'hidden';
notificationFailed.style.visibility = 'hidden';

saveButton.addEventListener("click", (e) => {
  e.preventDefault();

  const registrationBody = {
    name: createForm.name.value,
    surname: createForm.surname.value,
    patronymic: createForm.patronymic.value,
    dateOfBirthday: createForm.dateOfBirthday.value,
    address: createForm.address.value,
    allergies: createForm.allergies.value,
    phone: createForm.phone.value,
    email: createForm.email.value
  }

  PostUrl("user/registration", registrationBody).then(data => {
    notificationFailed.style.visibility = 'hidden';
    notificationSuccess.style.visibility = 'visible';
    notificationSuccessText.innerText = `
          Пользователь успешно создан
          Логин: ${data.login}
          Пароль: ${data.password}
          Не забудьте напомнить поменять пароль!
    `
  })
    .catch((error) => {
      notificationSuccess.style.visibility = 'hidden';
      notificationFailed.style.visibility = 'visible';
      notificationFailedText.innerText = `Пользователь не создан`
    });

})


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
