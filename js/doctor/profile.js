import {get} from "../core/rest.js";
import {Doctor} from "../core/model/user.js";

const nameField = document.getElementById("name");
const photoField = document.getElementById("photo");
const specField = document.getElementById("spec");
const descriptionField = document.getElementById("description");
const plusesField = document.getElementById("pluses");


const getUserInfo = () => {
  const query = window.location.href.split('/');
  const userId = query[query.length - 1]
  get(`user/doctor/${userId}`).then(data => {
    const { id, name, surname, patronymic, specialization, description, photo, photoName, pluses } = data;
    const doctor = new Doctor(
      id,
      name,
      surname,
      patronymic,
      specialization,
      description,
      photo,
      photoName,
      pluses
    )
    nameField.innerText = doctor.fullName;
    photoField.src = doctor.photo;
    specField.innerText = doctor.specialization;
    descriptionField.innerText = doctor.description;
    plusesField.innerText = doctor.pluses;
  }).catch(error => console.error(error));
}

getUserInfo()
