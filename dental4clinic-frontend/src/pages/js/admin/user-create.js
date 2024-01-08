import { post } from "../core/rest.js";
import {RegistrationBody} from "../core/model/registration.js";

const createForm = document.getElementById("createForm");
const saveButton = document.getElementById("save-button");
const notification = document.getElementById("notification");
const notificationText = document.getElementById("notificationText");

saveButton.addEventListener("click", (e) => {
  e.preventDefault();

  const registrationBody = new RegistrationBody(
    null,
    createForm.name.value,
    createForm.surname.value,
    createForm.patronymic.value,
    createForm.dateOfBirthday.value,
    createForm.phone.value,
    createForm.email.value,
    createForm.allergies.value,
    null,
    null,
    createForm.address.value,
    null,
    null
  )

  post("user/registration", registrationBody).then(data => {
    const { login, password } = data;
    notification.style.visibility = 'visible';
    notificationText.innerText = `
          Пользователь успешно создан
          Логин: ${login}
          Пароль: ${password}
          Не забудьте напомнить поменять пароль!
    `
  })
    .catch((error) => {
      notification.style.visibility = 'visible';
      notificationText.innerText = `Пользователь не создан`
    });

})
