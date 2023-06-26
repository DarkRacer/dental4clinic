class AppointmentBody {
  constructor(date, datetime, description, doctorId) {
    this.date = date;
    this.datetime = datetime;
    this.doctorId = datetime;
  }
}

class AppointmentBodyAdmin extends AppointmentBody {
  constructor(requestId, date, datetime, description, doctorId) {
    super(date, datetime, description, doctorId);
    this.requestId = requestId;
  }
}

class AppointmentBodyUser extends AppointmentBody {
  constructor(userId, date, datetime, description, doctorId) {
    super(date, datetime, description, doctorId);
    this.userId = userId;
  }
}

class AppointmentBodyUnauthorized extends AppointmentBody {
  constructor(name, date, datetime, description, doctorId, phone, surname) {
    super(date, datetime, description, doctorId);
    this.name = name;
    this.phone = phone;
    this.surname = surname;
  }
}

export { AppointmentBody, AppointmentBodyAdmin, AppointmentBodyUser, AppointmentBodyUnauthorized }
