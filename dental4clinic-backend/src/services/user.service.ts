import { connect } from "../mongo";
import { User } from '../models/user';
import { ObjectId } from "mongodb";

export async function getUser(userId: string): Promise<User> {
    const db = await connect();
    const collection = db.collection("users");
    try {
        const query = { _id: new ObjectId(userId) };
        const userData = await collection.findOne(query);
        console.log("userData:", userData)
        if (!userData) {
            return null;
        }

        const user = new User(
            userData._id.toString(),
            userData.name,
            userData.surname,
            userData.patronymic,
            new Date(userData.dateOfBirthday),
            userData.phone,
            userData['e-mail'],
            userData.allergies,
            userData.photo,
            userData['photo-name'],
            userData.address
        );
        console.log("userData2:", user)
        return user;
    } catch (e) {
        console.error("Error fetching user from MongoDB", e);
        throw e;
    }
}

export async function editUser(userId: string, editedUserData: any) {
    const db = await connect();
    const collection = db.collection("users");
    try {
        const user = new User(
            editedUserData.id,
            editedUserData.name,
            editedUserData.surname,
            editedUserData.patronymic,
            new Date(editedUserData.dateOfBirthday),
            editedUserData.phone,
            editedUserData.email,
            editedUserData.allergies,
            editedUserData.photo,
            editedUserData.photoName,
            editedUserData.address
        );

        await collection.updateOne(
            { _id: new ObjectId(userId) },
            { $set: user.toMongoObject }
        );
    } catch (e) {
        console.error("Error fetching user from MongoDB", e);
        throw e;
    }  
}
