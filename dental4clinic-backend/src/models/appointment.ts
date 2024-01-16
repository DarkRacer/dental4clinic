import { ObjectId } from "mongodb";

class AppointmentBody {
  date: string;
  datetime: string;
  description: string;
  doctorId: string;

  constructor(date: string, datetime: string, description: string, doctorId: string) {
    this.date = date;
    this.datetime = datetime;
    this.description = description;
    this.doctorId = doctorId;
  }
}

class AppointmentBodyAdmin extends AppointmentBody {
  requestId: string;

  constructor(requestId: string, date: string, datetime: string, description: string, doctorId: string) {
    super(date, datetime, description, doctorId);
    this.requestId = requestId;
  }

  toMongoObject(): any {
    return {
      _id: this.requestId == null ? null : new ObjectId(this.requestId),
      date: this.date,
      userId: null,
      doctorName: null, // Почему?
      datetime: this.datetime,
      description: this.description,
      doctorId: this.doctorId,
    };
  }
}

class AppointmentBodyUser extends AppointmentBody {
  userId: string;

  constructor(userId: string, date: string, datetime: string, description: string, doctorId: string) {
    super(date, datetime, description, doctorId);
    this.userId = userId;
  }

  toMongoObject(): any {
    return {
      _id: null,
      date: this.date,
      userId: this.userId,
      doctorName: null, // Почему?
      datetime: this.datetime,
      description: this.description,
      doctorId: this.doctorId,
    };
  }
}

class AppointmentBodyUnauthorized extends AppointmentBody {
  name: string;
  phone: string;
  surname: string;

  constructor(name: string, date: string, datetime: string, description: string, doctorId: string, phone: string, surname: string) {
    super(date, datetime, description, doctorId);
    this.name = name;
    this.phone = phone;
    this.surname = surname;
  }

  toMongoObject(): any {
    return {
      _id: null,
      name: this.name,
      phone: this.phone, // Почему?
      surname: this.surname,
      date: this.date,
      datetime: this.datetime,
      description: this.description,
      doctorId: this.doctorId,
    };
  }
}

export { AppointmentBody, AppointmentBodyAdmin, AppointmentBodyUser, AppointmentBodyUnauthorized };
