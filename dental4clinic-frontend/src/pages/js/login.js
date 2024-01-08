import { post, selectFunctionalByRole } from "./core/rest.js";
import {Login} from "./core/model/login.js";

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const login = loginForm.login.value;
  const password = loginForm.password.value;

  const loginBody = new Login(
    login,
    password
  )
  post("login", loginBody).then(data => {
    document.cookie =`access_token=${data['access_token']}`
    document.cookie =`id=${data['id']}`
    selectFunctionalByRole(data['role'])
  })
    .catch((error) => {
      console.error('Error:', error);
    });
})
