import {connect} from "../mongo";
import {Doctor, Role} from '../models/user';
import {ObjectId} from "mongodb";
import {RegistrationDoctorBody} from "../models/registration-doctor";
import { Service } from "../models/service";
import {DoctorService} from "../models/doctor.service";

export async function getDoctor(doctorId: string): Promise<Doctor> {
    const db = await connect();
    const collection = db.collection("users");
    try {
        const query = { _id: new ObjectId(doctorId) };
        const doctorData = await collection.findOne(query);

        if (!doctorData) {
            return null;
        }

        return new Doctor(
            doctorData._id.toString(),
            doctorData.name,
            doctorData.surname,
            doctorData.patronymic,
            doctorData.specialization,
            doctorData.description,
            doctorData.photo,
            doctorData['photo-name'],
            doctorData.pluses
        );
    } catch (e) {
        console.error("Error fetching user from MongoDB", e);
        throw e;
    }
}

export async function getAllDoctorsServices(): Promise<DoctorService[]> {
  try {
    const db = await connect();
    const collection = db.collection("doctors-services");
    const servicesData = await collection.find({}).toArray();
    return servicesData.map(service => new DoctorService(
      service._id.toString(),
      service.doctorId,
      service.doctor,
      service.services,
      service.serviceId
    ));
  } catch (e) {
    console.error("Error fetching doctor services from MongoDB", e);
    throw e;
  }
}

export async function getAllDoctors(): Promise<any[]> {
    try {
      const db = await connect();
      const collection = db.collection("users");
      const doctorsData = await collection.find({ role: Role.DOCTOR }).toArray();
      const doctorArray = []
      for (const doctor of doctorsData) {
        doctorArray.push(new Doctor(
          doctor._id.toString(),
          doctor.name,
          doctor.surname,
          doctor.patronymic,
          doctor.specialization,
          doctor.description,
          doctor.photo,
          doctor.photoName,
          doctor.pluses
        ));
      }
      return doctorArray;
    } catch (e) {
        console.error("Error fetching doctors from MongoDB", e);
        throw e;
    }
}

export async function createDoctor(doctorData: any): Promise<Doctor[]> {
    try {
        const db = await connect();
        const collection = db.collection("users");

        const doctor = new RegistrationDoctorBody(
            null,
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

        await collection.insertOne(doctor.toMongoObject());

        const doctorsData = await collection.find({ role: Role.DOCTOR }).toArray();
            return doctorsData.map(item => new Doctor(
                item._id.toString(),
                item.name,
                item.surname,
                item.patronymic,
                item.specialization,
                item.description,
                item.photo,
                item.photoName,
                item.pluses
        ));
    } catch (e) {
        console.error("Error fetching doctor services from MongoDB", e);
        throw e;
    }
}

export async function editDoctor(editDoctor): Promise<Doctor[]> {
    try {
        const db = await connect();
        const collection = db.collection("users");

        const doctor = new Doctor(
            editDoctor.id,
            editDoctor.name,
            editDoctor.surname,
            editDoctor.patronymic,
            editDoctor.specialization,
            editDoctor.description,
            editDoctor.photo,
            editDoctor.photoName,
            editDoctor.pluses,
        );

        const query = { _id: new ObjectId(editDoctor.id) };
        const update = { $set: doctor.toMongoObject() };
        await collection.updateOne(query, update, { upsert: true });

        const doctorsData = await collection.find({ role: Role.DOCTOR }).toArray();
            return doctorsData.map(item => new Doctor(
                item._id.toString(),
                item.name,
                item.surname,
                item.patronymic,
                item.specialization,
                item.description,
                item.photo,
                item.photoName,
                item.pluses
        ));
    } catch (e) {
        console.error("Error fetching doctor services from MongoDB", e);
        throw e;
    }
}

export async function deleteDoctor(deleteDoctor): Promise<Doctor[]> {
    try {
        const db = await connect();
        const collection = db.collection("users");

        const deleteQuery = { _id: new ObjectId(deleteDoctor.id) };
        await collection.deleteOne(deleteQuery);

        const doctorsData = await collection.find({ role: Role.DOCTOR }).toArray();
            return doctorsData.map(item => new Doctor(
                item._id.toString(),
                item.name,
                item.surname,
                item.patronymic,
                item.specialization,
                item.description,
                item.photo,
                item.photoName,
                item.pluses
        ));
    } catch (e) {
        console.error("Error fetching doctor services from MongoDB", e);
        throw e;
    }
}
