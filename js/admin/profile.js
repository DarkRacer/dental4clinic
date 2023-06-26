import { get } from '../core/rest.js';
import { GenericUser } from '../core/model/user.js';

const nameField = document.getElementById("name");
const photoField = document.getElementById("photo");

const getUserInfo = () => {
  const query = window.location.href.split('/');
  const userId = query[query.length - 1]
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
    nameField.innerText = user.fullName;
    photoField.src = user.photo;
  }).catch(error => console.error(error));
}

getUserInfo()
