import { post, selectFunctionalByRole } from "./core/rest.js";
import {RegistrationBody} from "./core/model/registration.js";

const registrationForm = document.getElementById("registration-form");
const registrationButton = document.getElementById("save-button");
const photoField = document.getElementById("photo-field");
let imageString ='';
let fileName ='';

registrationButton.addEventListener("click", (e) => {
  e.preventDefault();

  const registrationBody = new RegistrationBody(
    null,
    registrationForm.name.value,
    registrationForm.surname.value,
    registrationForm.patronymic.value,
    registrationForm.dateOfBirthday.value,
    registrationForm.phone.value,
    registrationForm.email.value,
    registrationForm.allergies.value,
    imageString,
    fileName,
    registrationForm.address.value,
    registrationForm.login.value,
    registrationForm.password.value
)

  post("registration", registrationBody).then(data => {
    document.cookie =`access_token=${data['access_token']}`
    document.cookie =`id=${data['id']}`
    selectFunctionalByRole(data['role'])
  })
    .catch((error) => {
      console.error('Error:', error);
    });

})

photoField.addEventListener("change", (e) => {
  imageUploaded();
})

function imageUploaded() {
  const file = document.querySelector(
    'input[type=file]')['files'][0];

  const reader = new FileReader();
  fileName = file.name;

  reader.onload = () => imageString = reader.result;
  reader.readAsDataURL(file);
}
