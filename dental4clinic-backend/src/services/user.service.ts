import { connect } from "../mongo";
import { User, UserArgs } from '../models/user';

export async function getUser(userId: number): Promise<User> {
    const db = await connect();
    const collection = db.collection("users");
    try {
        const userDoc = await collection.findOne({ _id: userId.toString });
        const userArgs: UserArgs = {
            id: userDoc._id.toString(),
            name: userDoc.name,
            surname: userDoc.surname,
            patronymic: userDoc.patronymic,
            dateOfBirthday: userDoc.dateOfBirthday,
            phone: userDoc.phone,
            email: userDoc.email,
            allergies: userDoc.allergies,
            photo: userDoc.photo,
            photoName: userDoc.photoName,
            address: userDoc.address
        };

        return new User(userArgs);
    } catch (e) {
        console.error("Error fetching user from MongoDB", e);
        throw e;
    }
}