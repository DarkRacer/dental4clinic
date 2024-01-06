type UserConstructorArgs = {
  id: string;
  name: string;
  surname: string;
  patronymic: string;
  photo: string;
  photoName: string;
};

class GenericUser {
  id: string;
  name: string;
  surname: string;
  patronymic: string;
  photo: string;
  photoName: string;

  constructor({ id, name, surname, patronymic, photo, photoName }: UserConstructorArgs) {
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

type UserArgs = UserConstructorArgs & {
  dateOfBirthday: string;
  phone: string;
  email: string;
  allergies: string;
  address: string;
};

class User extends GenericUser {
  dateOfBirthday: string;
  phone: string;
  email: string;
  allergies: string;
  address: string;

  constructor({ dateOfBirthday, phone, email, allergies, address, ...genericUserArgs }: UserArgs) {
    super(genericUserArgs);
    this.dateOfBirthday = dateOfBirthday;
    this.phone = phone;
    this.email = email;
    this.allergies = allergies;
    this.address = address;
  }

  toMongoObject(): any {
    return {
      _id: this.id,
      name: this.name,
      surname: this.surname,
      patronymic: this.patronymic,
      dateOfBirthday: new Date(this.dateOfBirthday),
      phone: this.phone,
      email: this.email,
      allergies: this.allergies,
      photo: this.photo,
      photoName: this.photoName,
      address: this.address,
      fullName: this.fullName
    };
  }
}

type DoctorArgs = UserConstructorArgs & {
  specialization: string;
  description: string;
  pluses: string;
};

class Doctor extends GenericUser {
  specialization: string;
  description: string;
  pluses: string;

  constructor({ specialization, description, pluses, ...genericUserArgs }: DoctorArgs) {
    super(genericUserArgs);
    this.specialization = specialization;
    this.description = description;
    this.pluses = pluses;
  }

  toMongoObject(): any {
    return {
      _id: this.id,
      name: this.name,
      surname: this.surname,
      patronymic: this.patronymic,
      specialization: this.specialization,
      description: this.description,
      photo: this.photo,
      photoName: this.photoName,
      pluses: this.pluses,
      fullName: this.fullName
    };
  }
}

export { GenericUser, User, Doctor, UserArgs, DoctorArgs };
