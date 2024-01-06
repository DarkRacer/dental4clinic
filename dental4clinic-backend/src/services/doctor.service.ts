import { connect } from "../mongo";
import { Doctor, DoctorArgs } from '../models/user';

export async function getDoctor(doctorId: number): Promise<Doctor> {
    const db = await connect();
    const collection = db.collection("users");
    try {
        const doctorDoc = await collection.findOne({ _id: doctorId.toString });
        const doctorArgs: DoctorArgs = {
            id: doctorDoc._id.toString(),
            name: doctorDoc.name,
            surname: doctorDoc.surname,
            patronymic: doctorDoc.patronymic,
            photo: doctorDoc.photo,
            photoName: doctorDoc.photoName,
            specialization: doctorDoc.specialization,
            description: doctorDoc.description,
            pluses: doctorDoc.pluses
        };

        return new Doctor(doctorArgs);
    } catch (e) {
        console.error("Error fetching user from MongoDB", e);
        throw e;
    }
}