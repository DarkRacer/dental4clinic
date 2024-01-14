import fs from 'fs';
import { Db } from 'mongodb';
import { RegistrationUserBody } from './models/registration-user';
import { RegistrationDoctorBody } from './models/registration-doctor';
import { Diagnosis } from './models/diagnosis';
import { ToothCard } from './models/tooth-card';
import { Tooth } from './models/tooth';
import { MyRequest } from './models/my-request';

function readUserDataFromFile(filePath: string): RegistrationUserBody {
  const rawData = fs.readFileSync(filePath, 'utf8');
  const userData = JSON.parse(rawData);
  return new RegistrationUserBody(
    userData.id, 
    userData.name, 
    userData.surname, 
    userData.patronymic,
    new Date(userData.dateOfBirthday), 
    userData.phone, userData.email, 
    userData.allergies,
    userData.photo, 
    userData.photoName, 
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
    doctorData.photoName, 
    doctorData.pluses, 
    doctorData.login, 
    doctorData.password
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
  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const toothDataArray = JSON.parse(rawData);
    return toothDataArray.map(toothData => new Tooth(
      toothData.id, 
      toothData.data, 
      toothData.userId
    ));
  } catch (error) {
    console.error('Error reading data from JSON file:', error);
    return [];
  }
}

function readRequestsFromFile(filePath: string): MyRequest[] {
  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const requestDataArray = JSON.parse(rawData);
    return requestDataArray.map(requestData => new MyRequest(
      requestData.date, 
      requestData.phone, 
      requestData.description, 
      requestData.userId
    ));
  } catch (error) {
    console.error('Error reading data from JSON file:', error);
    return [];
  }
}

async function createUsers(db: Db): Promise<void> {
  const migrateUser1 = readUserDataFromFile('./stub/responses/user/1.json');
  const migrateUser2 = readUserDataFromFile('./stub/responses/user/2.json');
  const migrateDoctor1 = readDoctorDataFromFile('./stub/responses/doctor/3.json');
  
  const migrateUsers = [
    migrateUser1.toMongoObject(), 
    migrateUser2.toMongoObject(), 
    migrateDoctor1.toMongoObject() 
  ];

  const usersCollection = await db.createCollection('users');
  await usersCollection.insertMany(migrateUsers);
  console.log('All users have been saved successfully.');
}

async function createAppointments(db: Db): Promise<void> {
  const appointmentsCollection = await db.createCollection('appointments');
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
  const paymentsCollection = await db.createCollection('payments');
}

async function createRequests(db: Db): Promise<void> {
  const migrateRequests = readRequestsFromFile('./stub/responses/user/requests/3.json');

  const requestsCollection = await db.createCollection('requests');
  for (const request of migrateRequests) {
    await requestsCollection.insertOne(request.toMongoObject());
}
}

async function createServices(db: Db): Promise<void> {
  const servicesCollection = await db.createCollection('services');
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

export async function createCollectionAndInsertData(db: Db): Promise<void> {
  await createUsers(db);
  await createAppointments(db);
  await createDiagnosis(db);
  await createPayments(db);
  await createRequests(db);
  await createServices(db);
  await createToothCard(db);
  await createTooth(db);

  console.log("Все коллекции успешно созданы и заполнены.");
}
