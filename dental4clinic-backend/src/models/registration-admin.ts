import { ObjectId } from "mongodb";
import { Admin } from "./user";

class RegistrationAdminBody extends Admin {
    login: string;
    password: string;
  
    constructor(id: string, name: string, surname: string, patronymic: string, 
                photo: string, photoName: string, 
                login: string, password: string) {
      super(id, name, surname, patronymic, photo, photoName);
      this.login = login;
      this.password = password;
    }
  
    toMongoObject(): any {
      return {
        _id: this.id == null ? null : new ObjectId(this.id),
        name: this.name,
        surname: this.surname,
        patronymic: this.patronymic,
        photo: this.photo,
        "photo-name": this.photoName,
        role: this.role,
        login: this.login,
        password: this.password
      };
    }
  }
  
  export { RegistrationAdminBody };