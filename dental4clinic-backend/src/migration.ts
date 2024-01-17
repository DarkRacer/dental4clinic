import fs from 'fs';
import { Db } from 'mongodb';
import { RegistrationUserBody } from './models/registration-user';
import { RegistrationDoctorBody } from './models/registration-doctor';
import { Diagnosis } from './models/diagnosis';
import { ToothCard } from './models/tooth-card';
import { Tooth } from './models/tooth';
import { MyRequest } from './models/my-request';
import { Service } from './models/service';
import { Price } from './models/price';
import { Appointment } from './models/appointment-body';
import { Payment } from './models/payment';
import { RegistrationAdminBody } from './models/registration-admin';
import { RegistrationDirectorBody } from './models/registration-director';

// File readers and converters
function readUserDataFromFile(filePath: string): RegistrationUserBody {
  const rawData = fs.readFileSync(filePath, 'utf8');
  const userData = JSON.parse(rawData);
  return new RegistrationUserBody(
    userData.id,
    userData.name,
    userData.surname,
    userData.patronymic,
    new Date(userData.dateOfBirthday),
    userData.phone,
    userData['e-mail'],
    userData.allergies,
    userData.photo,
    userData['photo-name'],
    userData.address,
    userData.login,
    userData.password
  );
}

function readDoctorDataFromFile(filePath: string): RegistrationDoctorBody {
  const rawData = fs.readFileSync(filePath, 'utf8');
  const doctorData = JSON.parse(rawData);
  return new RegistrationDoctorBody(
    doctorData.id,
    doctorData.name,
    doctorData.surname,
    doctorData.patronymic,
    doctorData.specialization,
    doctorData.description,
    doctorData.photo,
    doctorData['photo-name'],
    doctorData.pluses,
    doctorData.login,
    doctorData.password
  );
}

function readAdminDataFromFile(filePath: string): RegistrationAdminBody {
  const rawData = fs.readFileSync(filePath, 'utf8');
  const adminData = JSON.parse(rawData);
  return new RegistrationAdminBody(
    adminData.id,
    adminData.name,
    adminData.surname,
    adminData.patronymic,
    adminData.photo,
    adminData['photo-name'],
    adminData.login,
    adminData.password
  );
}

function readDirectorDataFromFile(filePath: string): RegistrationDirectorBody {
  const rawData = fs.readFileSync(filePath, 'utf8');
  const directorData = JSON.parse(rawData);
  return new RegistrationDirectorBody(
    directorData.id,
    directorData.name,
    directorData.surname,
    directorData.patronymic,
    directorData.photo,
    directorData['photo-name'],
    directorData.login,
    directorData.password
  );
}

function readUserDiagnosisDataFromFile(filePath: string): Diagnosis[] {
  const rawData = fs.readFileSync(filePath, 'utf8');
  const diagnosesData = JSON.parse(rawData);
  return diagnosesData.map(diagnosisData => new Diagnosis(
    diagnosisData.id,
    diagnosisData.name,
    diagnosisData.description,
    diagnosisData.isActual,
    diagnosisData['user-id']
  ));
}

function readToothCardDataFromFile(filePath: string): ToothCard {
  const rawData = fs.readFileSync(filePath, 'utf8');
  const toothData = JSON.parse(rawData);
  return new ToothCard(toothData.userId, toothData);
}

function readToothsFromFile(filePath: string): Tooth[] {
  const rawData = fs.readFileSync(filePath, 'utf8');
  const toothDataArray = JSON.parse(rawData);
  return toothDataArray.map(toothData => new Tooth(
    toothData.id,
    toothData.data,
    toothData.userId
  ));
}

function readRequestsFromFile(filePath: string): MyRequest[] {
  const rawData = fs.readFileSync(filePath, 'utf8');
  const requestDataArray = JSON.parse(rawData);
  return requestDataArray.map(requestData => new MyRequest(
    requestData.id,
    requestData.userId,
    requestData.name,
    requestData.phone,
    requestData.description,
    requestData.isActual
  ));
}

function readServicesFromFile(filePath: string): MyRequest[] {
  const rawData = fs.readFileSync(filePath, 'utf8');
  const servicesData = JSON.parse(rawData);
  return servicesData.map(serviceData => new Service(
    serviceData['doctor-id'],
    serviceData.doctor,
    serviceData.services,
    null,
    null,
    null
  ));
}

function readPricesFromFile(filePath: string): Price[] {
  const rawData = fs.readFileSync(filePath, 'utf8');
  const jsonData = JSON.parse(rawData);

  const prices: Price[] = [];

  jsonData.forEach(groupData => {
      const group = groupData.group;
      groupData.services.forEach(service => {
          prices.push(new Price(
              service['service-id'],
              service.name,
              service.description || null,
              service.pluses || null,
              service.price,
              group
          ));
      });
  });

  return prices;
}

function readAppointmentsFromFile(filePath: string): Appointment[] {
  const rawData = fs.readFileSync(filePath, 'utf8');
  const appointmentsData = JSON.parse(rawData);
  return appointmentsData.map(appointmentData => new Appointment(
    appointmentData.id.toString(),
    appointmentData['user-id'].toString(),
    appointmentData['user-name'],
    appointmentData.doctorId.toString(),
    appointmentData['doctor-name'],
    appointmentData.date,
    appointmentData.datetime,
    appointmentData['service-name'],
    appointmentData.description
  ));
}

function readPaymentsFromFile(filePath: string): Payment[] {
  const rawData = fs.readFileSync(filePath, 'utf8');
  const paymentsData = JSON.parse(rawData);
  return paymentsData.map(paymentData => new Payment(
    paymentData.id,
    paymentData.date,
    paymentData['user-id'],
    paymentData['user-name'],
    paymentData['doctor-id'],
    paymentData['doctor-name'],
    paymentData.service,
    paymentData.price,
    paymentData.isActive
  ));
}


// Migrations
async function createUsers(db: Db): Promise<void> {
  const migrateUser1 = readUserDataFromFile('./stub/responses/user/1.json');
  const migrateUser2 = readUserDataFromFile('./stub/responses/user/2.json');
  const migrateDoctor1 = readDoctorDataFromFile('./stub/responses/doctor/3.json');
  const migrateAdmin1 = readAdminDataFromFile('./stub/responses/admin/1.json');
  const migrateAdmin2 = readAdminDataFromFile('./stub/responses/admin/3.json');
  const migrateDirector1 = readDirectorDataFromFile('./stub/responses/director/4.json');

  const migrateUsers = [
    migrateUser1.toMongoObject(),
    migrateUser2.toMongoObject(),
    migrateDoctor1.toMongoObject(),
    migrateAdmin1.toMongoObject(),
    migrateAdmin2.toMongoObject(),
    migrateDirector1.toMongoObject()
  ];

  const usersCollection = await db.createCollection('users');
  await usersCollection.insertMany(migrateUsers);
  console.log('All users have been saved successfully.');
}

async function createAppointments(db: Db): Promise<void> {
  // const migrateAppointments = readAppointmentsFromFile('./stub/responses/appointments/admin/appointments.json');
  const appointmentsCollection = await db.createCollection('appointments');

  // for (const appointment of migrateAppointments) {
  //   await appointmentsCollection.insertOne(appointment.toMongoObject());
  // }
  console.log('All appointments have been saved successfully.');
}

async function createDiagnosis(db: Db): Promise<void> {
  const migrateDiagnosis = readUserDiagnosisDataFromFile('./stub/responses/user/diagnosis/diagnosis_created.json');

  const diagnosisCollection = await db.createCollection('diagnosis');
  for (const diagnosis of migrateDiagnosis) {
    await diagnosisCollection.insertOne(diagnosis.toMongoObject());
  }
  console.log('All diagnoses have been saved successfully.');
}

async function createPayments(db: Db): Promise<void> {
  const migratePayments = readPaymentsFromFile('./stub/responses/payments/payments.json');

  const paymentsCollection = await db.createCollection('payments');
  for (const payment of migratePayments) {
    await paymentsCollection.insertOne(payment.toMongoObject());
  }
  console.log('All payment have been saved successfully.');
}

async function createRequests(db: Db): Promise<void> {
  const migrateRequests = readRequestsFromFile('./stub/responses/user/requests/3.json');

  const requestsCollection = await db.createCollection('requests');
  for (const request of migrateRequests) {
    await requestsCollection.insertOne(request.toMongoObject());
  }
  console.log('All requests have been saved successfully.');
}

async function createServices(db: Db): Promise<void> {
  const migrateServices = readServicesFromFile('./stub/responses/doctors_services.json');

  const servicesCollection = await db.createCollection('services');
  for (const service of migrateServices) {
    await servicesCollection.insertOne(service.toMongoObject());
  }
  console.log('All services have been saved successfully.');
}

async function createToothCard(db: Db): Promise<void> {
  const migrateToothCard = readToothCardDataFromFile('./stub/responses/user/tooth-card/3.json');

  const toothCollection = await db.createCollection('tooth-card');
  await toothCollection.insertOne(migrateToothCard.toMongoObject());
  console.log('Tooth card data has been saved successfully.');
}

async function createTooth(db: Db): Promise<void> {
  const migrateTooth = readToothsFromFile('./stub/responses/user/tooth/tooths_1.json');
  const toothCollection = await db.createCollection('tooth');

  for (const tooth of migrateTooth) {
    await toothCollection.insertOne(tooth.toMongoObject());
  }
  console.log('All tooths have been saved successfully.');
}

async function createPrices(db: Db): Promise<void> {
  const migratePrices = readPricesFromFile('./stub/responses/prices/prices.json');
  // console.log(migratePrices);
  const pricesCollection = await db.createCollection('prices');
  // for (const price of migratePrices) {
  //   await pricesCollection.insertOne(price.toMongoObject());
  // }
  console.log('All prices have been saved successfully.');

}

export async function createCollectionAndInsertData(db: Db): Promise<void> {
  await createUsers(db);
  await createAppointments(db);
  await createDiagnosis(db);
  await createPayments(db);
  await createRequests(db);
  await createServices(db);
  await createToothCard(db);
  await createTooth(db);
  await createPrices(db);

  console.log("All collections have been successfully created and populated.");
}
