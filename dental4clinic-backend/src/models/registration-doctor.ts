import { ObjectId } from "mongodb";
import { Doctor } from "./user";

class RegistrationDoctorBody extends Doctor {
  login: string;
  password: string;

  constructor(id: string, name: string, surname: string, patronymic: string, specialization: string, description: string, photo: any, photoName: string, pluses: string, login: string, password: string) {
    super(id, name, surname, patronymic, specialization, description, photo, photoName, pluses);
    this.login = login;
    this.password = password;
  }

  toMongoObject(): any {
    return {
      _id: this.id == null ? null : new ObjectId(this.id),
      name: this.name,
      surname: this.surname,
      patronymic: this.patronymic,
      specialization: this.specialization,
      description: this.description,
      photo: this.photo,
      photoName: this.photoName,
      pluses: this.pluses,
      fullName: this.fullName,
      role: this.role,
      login: this.login,
      password: this.password
    };
  }
}

export { RegistrationDoctorBody };
