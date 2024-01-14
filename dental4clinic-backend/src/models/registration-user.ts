import { User } from "./user";

class RegistrationUserBody extends User {
  login: string;
  password: string;

  constructor(id: string, name: string, surname: string, patronymic: string, 
    dateOfBirthday: Date, phone: string, email: string, allergies: string[], 
    photo: string, photoName: string, address: string, login: string, password: string) {
    super(id, name, surname, patronymic, dateOfBirthday, phone, email, allergies, photo, photoName, address);
    this.login = login;
    this.password = password;
  }

  toMongoObject(): any {
    return {
      _id: this.id,
      name: this.name,
      surname: this.surname,
      patronymic: this.patronymic,
      dateOfBirthday: this.dateOfBirthday,
      phone: this.phone,
      email: this.email,
      allergies: this.allergies,
      photo: this.photo,
      photoName: this.photoName,
      address: this.address,
      fullName: this.fullName,
      role: this.role,
      login: this.login,
      password: this.password
    };
  }
}

export { RegistrationUserBody };
