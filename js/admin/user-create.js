const url = 'https://af2f-46-164-217-97.ngrok-free.app/';
var token = GetCookie("access_token")
const headers = {
  "Host":  'af2f-46-164-217-97.ngrok-free.app',
  "Origin":  'https://af2f-46-164-217-97.ngrok-free.app/',
  "Accept": "*/*",
  'ngrok-skip-browser-warning':true
}

let createForm = document.getElementById("createForm");
let saveButton = document.getElementById("save-button");
let notification = document.getElementById("notification");
let notificationText = document.getElementById("notificationText");

notification.style.visibility = 'hidden';

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
    notification.style.visibility = 'visible';
    notificationText.innerText = `
          Пользователь успешно создан
          Логин: ${data.login}
          Пароль: ${data.password}
          Не забудьте напомнить поменять пароль!
    `
  })
    .catch((error) => {
      notification.style.visibility = 'visible';
      notificationText.innerText = `Пользователь не создан`
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
