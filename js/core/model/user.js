class GenericUser {
  constructor(id, name, surname, patronymic, photo, photoName) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.patronymic = patronymic;
    this.photo = photo;
    this.photoName = photoName;
  }

  get fullName() {
    return `${this.surname}  ${this.name}  ${this.patronymic}`
  }
}

class User extends GenericUser {
  constructor(id, name, surname, patronymic, dateOfBirthday, phone, email, allergies, photo, photoName, address) {
    super(id, name, surname, patronymic, photo, photoName)
    this.dateOfBirthday = dateOfBirthday;
    this.phone = phone;
    this.email = email;
    this.allergies = allergies;
    this.address = address;
  }
}

class Doctor extends GenericUser {
  constructor(id, name, surname, patronymic, specialization, description, photo, photoName, pluses) {
    super(id, name, surname, patronymic, photo, photoName)
    this.specialization = specialization;
    this.description = description;
    this.pluses = pluses;
  }
}

export { GenericUser, User, Doctor }
