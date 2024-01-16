import { ObjectId } from "mongodb";

enum Role {
  USER = 'USER',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN',
  DIRECTOR = 'DIRECTOR'
}

class GenericUser {
  id: string;
  name: string;
  surname: string;
  patronymic: string;
  photo: string;
  photoName: string;

  constructor(id: string, name: string, surname: string, patronymic: string, photo: any, photoName: string) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.patronymic = patronymic;
    this.photo = photo;
    this.photoName = photoName;
  }

  get fullName(): string {
    return `${this.surname} ${this.name} ${this.patronymic}`;
  }
}

class User extends GenericUser {
  dateOfBirthday: Date;
  phone: string;
  email: string;
  allergies: string[];
  address: string;
  role: Role;

  constructor(id: string, name: string, surname: string, patronymic: string, dateOfBirthday: Date, phone: string, email: string, allergies: string[], photo: string, photoName: string, address: string) {
    super(id, name, surname, patronymic, photo, photoName);
    this.dateOfBirthday = dateOfBirthday;
    this.phone = phone;
    this.email = email;
    this.allergies = allergies;
    this.address = address;
    this.role = Role.USER;
  }

  toMongoObject(): any {
    return {
      _id: this.id == null ? null : new ObjectId(this.id),
      name: this.name,
      surname: this.surname,
      patronymic: this.patronymic,
      dateOfBirthday: this.dateOfBirthday,
      phone: this.phone,
      "e-mail": this.email,
      allergies: this.allergies,
      photo: this.photo,
      "photo-name": this.photoName,
      address: this.address,
      fullName: this.fullName,
      role: this.role
    };
  }
}

class Doctor extends GenericUser {
  specialization: string;
  description: string;
  pluses: number;
  role: Role;

  constructor(id: string, name: string, surname: string, patronymic: string, specialization: string, description: string, photo: any, photoName: string, pluses: number) {
    super(id, name, surname, patronymic, photo, photoName);
    this.specialization = specialization;
    this.description = description;
    this.pluses = pluses;
    this.role = Role.DOCTOR;
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
      role: this.role
    };
  }
}

class Admin extends GenericUser {
  role: Role;

  constructor(id: string, name: string, surname: string, patronymic: string, 
              photo: string, photoName: string) {
    super(id, name, surname, patronymic, photo, photoName);
    this.role = Role.ADMIN;
  }
    
  toMongoObject(): any {
    return {
      _id: this.id == null ? null : new ObjectId(this.id),
      name: this.name,
      surname: this.surname,
      patronymic: this.patronymic,
      photo: this.photo,
      "photo-name": this.photoName,
      role: this.role
    };
  }
}

export { Role, GenericUser, User, Doctor, Admin };
