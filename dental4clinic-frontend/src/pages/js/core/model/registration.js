import {User} from "./user.js";

class RegistrationBody extends User {
  constructor(id = null, name, surname, patronymic, dateOfBirthday, phone, email, allergies, photo, photoName, address, login, password) {
    super(id, name, surname, patronymic, dateOfBirthday, phone, email, allergies, photo, photoName, address);
    this.login = login;
    this.password = password;
  }
}

export { RegistrationBody }
