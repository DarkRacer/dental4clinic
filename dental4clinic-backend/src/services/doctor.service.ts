import { connect } from "../mongo";
import { Doctor, Role } from '../models/user';
import { ObjectId } from "mongodb";
import { RegistrationDoctorBody } from "../models/registration-doctor";

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

export async function getAllServices(): Promise<any[]> {
    try {
        const db = await connect();
        const collection = db.collection("services");
        const servicesData = await collection.find({}, { projection: { _id: 0 } }).toArray();
        return servicesData;
    } catch (e) {
        console.error("Error fetching doctor services from MongoDB", e);
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
        
        const doctor = new RegistrationDoctorBody(
            editDoctor.id,
            editDoctor.name,
            editDoctor.surname,
            editDoctor.patronymic,
            editDoctor.specialization,
            editDoctor.description,
            editDoctor.photo,
            editDoctor.photoName,
            editDoctor.pluses,
            editDoctor.login,
            editDoctor.password
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