import { ObjectId } from "mongodb";

class AppointmentBody {
  date: string;
  datetime: string;
  description: string;
  doctorId: string;
  doctorName: string;
  userName: string;

  constructor(date: string, datetime: string, description: string, doctorId: string, doctorName: string, userName: string) {
    this.date = date;
    this.datetime = datetime;
    this.description = description;
    this.doctorId = doctorId;
    this.doctorName = doctorName
    this.userName = userName;
  }
}

class AppointmentBodyAdmin extends AppointmentBody {
  requestId: string;

  constructor(requestId: string, date: string, datetime: string, description: string, doctorId: string, doctorName: string, userName: string) {
    super(date, datetime, description, doctorId, doctorName, userName);
    this.requestId = requestId;
  }

  toMongoObject(): any {
    return {
      _id: this.requestId == null ? null : new ObjectId(this.requestId),
      date: this.date,
      userId: null,
      doctorName: this.doctorName,
      datetime: this.datetime,
      description: this.description,
      doctorId: this.doctorId,
      userName: this.userName
    };
  }
}

class AppointmentBodyUser extends AppointmentBody {
  userId: string;

  constructor(userId: string, date: string, datetime: string, description: string, doctorId: string, doctorName: string, userName: string) {
    super(date, datetime, description, doctorId, doctorName, userName);
    this.userId = userId;
  }

  toMongoObject(): any {
    return {
      _id: null,
      date: this.date,
      userId: this.userId,
      doctorName: this.doctorName,
      datetime: this.datetime,
      description: this.description,
      doctorId: this.doctorId,
      userName: this.userName
    };
  }
}

class AppointmentBodyUnauthorized extends AppointmentBody {
  name: string;
  phone: string;
  surname: string;

  constructor(name: string, date: string, datetime: string, description: string, doctorId: string, phone: string, surname: string, doctorName: string, userName: string) {
    super(date, datetime, description, doctorId, doctorName, userName);
    this.name = name;
    this.phone = phone;
    this.surname = surname;
  }

  toMongoObject(): any {
    return {
      _id: null,
      name: this.name,
      phone: this.phone,
      surname: this.surname,
      date: this.date,
      datetime: this.datetime,
      description: this.description,
      doctorId: this.doctorId,
      doctorName: this.doctorName,
      userName: this.userName
    };
  }
}

export { AppointmentBody, AppointmentBodyAdmin, AppointmentBodyUser, AppointmentBodyUnauthorized };
