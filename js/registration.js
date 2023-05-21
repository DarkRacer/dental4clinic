import {PostUrl} from "./service/service";
import {SelectFunctionalByRole} from "./main";

const registrationForm = document.getElementById("registration-form");
const registrationButton = document.getElementById("registration-form-submit");

registrationButton.addEventListener("click", (e) => {
  e.preventDefault();

  const registrationBody = {
    name: registrationForm.name.value,
    surname: registrationForm.surname.value,
    secondName: registrationForm.secondName.value,
    birthday: registrationForm.birthday.value,
    address: registrationForm.address.value,
    allergies: registrationForm.allergies.value,
    login: registrationForm.login.value,
    password: registrationForm.password.value,
    phone: registrationForm.phone.value,
    email: registrationForm.email.value
  }

  console.log(registrationBody)
  PostUrl("registration", registrationBody).then(data => {
    console.log('Success:', data);
    debugger
    document.cookie =`access_token=${data['access_token']}`
    document.cookie =`id=${data['id']}`
    SelectFunctionalByRole(data['role'])
  })
    .catch((error) => {
      console.error('Error:', error);
    });

})
