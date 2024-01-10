import {get, postWithoutResponse} from "../core/rest.js";
import {GenericUser} from "../core/model/user.js";

const query = window.location.href.split('/');
const userId = query[query.length - 2];

const editForm = document.getElementById("edit-form");
const saveButton = document.getElementById("save-button");
const photoField = document.getElementById("photo-field");
let imageString ='';
let fileName ='';


const getUserInfo = () => {
  get(`user/director/${userId}`).then(data => {
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

getUserInfo();

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
    location.assign('/profile/4');
  })
    .catch((error) => {
      console.error('Error:', error);
    });

})

photoField.addEventListener("change", (e) => {
  imageUploaded();
})

const imageUploaded = () => {
  const file = document.querySelector(
    'input[type=file]')['files'][0];

  const reader = new FileReader();
  fileName = file.name;

  reader.onload = () => imageString = reader.result;
  reader.readAsDataURL(file);
}
