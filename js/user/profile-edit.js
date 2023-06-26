import { get, postWithoutResponse } from "../core/rest.js";
import {User} from "../core/model/user.js";

const query = window.location.href.split('/');
const userId = query[query.length - 2];

const editForm = document.getElementById("edit-form");
const saveButton = document.getElementById("save-button");
const photo = document.getElementById("photo");
let imageString ='';
let fileName ='';

const getUserInfo = () => {
  get(`user/${userId}`).then(data => {
    const {id, name, surname, patronymic, dateOfBirthday, phone, allergies, photo, photoName, address} = data;
    const email = data['e-mail'];
    const user = new User(
      id,
      name,
      surname,
      patronymic,
      dateOfBirthday,
      phone,
      email,
      allergies,
      photo,
      photoName,
      address
    )
    editForm.name.value = user.name;
    editForm.surname.value = user.surname;
    editForm.patronymic.value = user.patronymic;
    editForm.dateOfBirthday.value = user.dateOfBirthday
    editForm.phone.value = user.phone
    editForm.email.value = user.email
    editForm.address.value = user.address
    editForm.allergies.value = user.allergies
    imageString = user.photo;
  }).catch(error => console.error(error));
}

getUserInfo();


saveButton.addEventListener("click", (e) => {
  e.preventDefault();

  const editBody = new User(
    userId,
    editForm.name.value,
    editForm.surname.value,
    editForm.patronymic.value,
    editForm.dateOfBirthday.value,
    editForm.phone.value,
    editForm.email.value,
    editForm.allergies.value,
    imageString,
    fileName,
    editForm.address.value
)

  postWithoutResponse(`user/edit/${userId}`, editBody).then(data => {
    alert('Данные обновлены');
    location.assign('/profile/1');
  })
    .catch((error) => {
      console.error('Error:', error);
    });

})

photo.addEventListener("change", (e) => {
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
