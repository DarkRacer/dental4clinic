import { get, postWithoutResponse } from "../core/rest.js";
import {GenericUser} from "../core/model/user.js";

const query = window.location.href.split('/');
const userId = query[query.length - 2];

const editForm = document.getElementById("edit-form");
const photoField = document.getElementById("photo-field");
const saveButton = document.getElementById("save-button");
let imageString ='';
let fileName ='';


getUserInfo();

function getUserInfo() {
  get(`user/admin/${userId}`).then(data => {
    const {id, name, surname, patronymic, photo, photoName} = data;
    const user = new GenericUser(
      id,
      name,
      surname,
      patronymic,
      photo,
      photoName
    )
    editForm.name.value = user.name;
    editForm.surname.value = user.surname;
    editForm.patronymic.value = user.patronymic;
    imageString = user.photo;
  }).catch(error => console.error(error));
}

saveButton.addEventListener("click", (e) => {
  e.preventDefault();

  const editBody = new GenericUser(
    userId,
    editForm.name.value,
    editForm.surname.value,
    editForm.patronymic.value,
    imageString,
    fileName
)

  postWithoutResponse(`user/edit/${userId}`, editBody).then(data => {
    alert('Данные обновлены');
    location.assign('/profile/3');
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

