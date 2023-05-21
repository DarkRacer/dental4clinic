import {PostUrl} from "./service/service";
import {SelectFunctionalByRole} from "./main";

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
