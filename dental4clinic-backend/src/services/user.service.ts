import { connect } from "../mongo";
import { User } from '../models/user';
import { ObjectId } from "mongodb";

export async function getUser(userId: string): Promise<User> {
    const db = await connect();
    const collection = db.collection("users");
    try {
        const query = { _id: new ObjectId(userId) };
        const userData = await collection.findOne(query);

        if (!userData) {
            return null;
        }

        return new User(
            userData._id.toString(),
            userData.name,
            userData.surname,
            userData.patronymic,
            new Date(userData.dateOfBirthday),
            userData.phone,
            userData.email,
            userData.allergies,
            userData.photo,
            userData.photoName,
            userData.address
        );
    } catch (e) {
        console.error("Error fetching user from MongoDB", e);
        throw e;
    }
}

export async function editUser(userId: string, editedUserData: any) {
    const db = await connect();
    const collection = db.collection("users");
    try {
        await collection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: editedUserData }
        );
    } catch (e) {
        console.error("Error fetching user from MongoDB", e);
        throw e;
    }  
}
