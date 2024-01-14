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
}

class AppointmentBodyUser extends AppointmentBody {
  userId: string;

  constructor(userId: string, date: string, datetime: string, description: string, doctorId: string) {
    super(date, datetime, description, doctorId);
    this.userId = userId;
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
}

export { AppointmentBody, AppointmentBodyAdmin, AppointmentBodyUser, AppointmentBodyUnauthorized };
