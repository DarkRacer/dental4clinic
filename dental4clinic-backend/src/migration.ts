import fs from 'fs';
import { Db } from 'mongodb';
import { Doctor, User, UserArgs, DoctorArgs } from './models/user';

function readUserDataFromFile(filePath: string): User {
  const rawData = fs.readFileSync(filePath, 'utf8');
  const userData: UserArgs = JSON.parse(rawData);
  return new User({
    id: userData.id,
    name: userData.name,
    surname: userData.surname,
    patronymic: userData.patronymic,
    dateOfBirthday: userData.dateOfBirthday,
    phone: userData.phone,
    email: userData["e-mail"],
    allergies: userData.allergies,
    photo: userData.photo,
    photoName: userData["photo-name"],
    address: userData.address
  });
}

function readDoctorDataFromFile(filePath: string): Doctor {
  const rawData = fs.readFileSync(filePath, 'utf8');
  const doctorData: DoctorArgs = JSON.parse(rawData);
  return new Doctor({
    id: doctorData.id,
    name: doctorData.name,
    surname: doctorData.surname,
    patronymic: doctorData.patronymic,
    photo: doctorData.photo,
    photoName: doctorData["photo-name"],
    specialization: doctorData.specialization,
    description: doctorData.description,
    pluses: doctorData.pluses
  });
}

async function createUsers(db: Db): Promise<void> {
  const migrateUser1 = readUserDataFromFile('./stub/responses/user/1.json');
  const migrateUser2 = readUserDataFromFile('./stub/responses/user/2.json');
  const migrateDoctor1 = readUserDataFromFile('./stub/responses/doctor/3.json');
  const usersData = [
    migrateUser1.toMongoObject(), 
    migrateUser2.toMongoObject(), 
    migrateDoctor1.toMongoObject() 
  ];

  const usersCollection = await db.createCollection('users');
  await usersCollection.insertMany(usersData);
  console.log("Коллекция пользователей создана и данные добавлены.");
}

async function createAppointments(db: Db): Promise<void> {
  const appointmentsCollection = await db.createCollection('appointments');
}

async function createDiagnosis(db: Db): Promise<void> {
    const diagnosisCollection = await db.createCollection('diagnosis');
}

async function createPayments(db: Db): Promise<void> {
  const paymentsCollection = await db.createCollection('payments');
}

async function createRequests(db: Db): Promise<void> {
    const requestsCollection = await db.createCollection('requests');
}

async function createServices(db: Db): Promise<void> {
    const servicesCollection = await db.createCollection('services');
}

async function createTeeth(db: Db): Promise<void> {
    const toothCollection = await db.createCollection('tooth');
}

export async function createCollectionAndInsertData(db: Db): Promise<void> {
  await createUsers(db);
  await createAppointments(db);
  await createDiagnosis(db);
  await createPayments(db);
  await createRequests(db);
  await createServices(db);
  await createTeeth(db);

  console.log("Все коллекции успешно созданы и заполнены.");
}
