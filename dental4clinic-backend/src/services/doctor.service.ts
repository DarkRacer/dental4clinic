import { connect } from "../mongo";
import { Doctor } from '../models/user';
import { ObjectId } from "mongodb";

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
            doctorData.photoName,
            doctorData.pluses
        );
    } catch (e) {
        console.error("Error fetching user from MongoDB", e);
        throw e;
    }
}