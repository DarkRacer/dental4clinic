import { connect } from "../mongo";
import { Admin, Director, Doctor, User } from '../models/user';
import { ObjectId } from "mongodb";
import { RegistrationUserBody } from "../models/registration-user";

export async function getUser(userId: string): Promise<any> {
    const db = await connect();
    const collection = db.collection("users");
    try {
        const query = { _id: new ObjectId(userId) };
        const userData = await collection.findOne(query);

        if (!userData) {
            return null;
        }

        switch (userData.role) {
            case "DOCTOR":
                const doctor = new Doctor(
                    userData._id.toString(),
                    userData.name,
                    userData.surname,
                    userData.patronymic,
                    userData.specialization,
                    userData.description,
                    userData.photo,
                    userData.photoName,
                    userData.pluses
                );
                return doctor;
            case "USER":
                const user = new User(
                    userData._id.toString(),
                    userData.name,
                    userData.surname,
                    userData.patronymic,
                    userData.dateOfBirthday,
                    userData.phone,
                    userData.email,
                    userData.allergies,
                    userData.photo,
                    userData.photoName,
                    userData.address
                );
                return user;
                case "ADMIN":
                    const admin = new Admin(
                        userData._id.toString(),
                        userData.name,
                        userData.surname,
                        userData.patronymic,
                        userData.photo,
                        userData.photoName
                    );
                    return admin;
                case "DIRECTOR":
                    const director = new Director(
                        userData._id.toString(),
                        userData.name,
                        userData.surname,
                        userData.patronymic,
                        userData.photo,
                        userData.photoName
                    );
                    return director;
            default:
                throw new Error("Unsupported role");
        }
    } catch (e) {
        console.error("Error fetching user from MongoDB", e);
        throw e;
    }
}

export async function saveUserToMongo(userData: any): Promise<any> {
    const db = await connect();
    const collectionUser = db.collection("users");
    
    const existingUser = await collectionUser.findOne({ login: userData.login });
    if (existingUser) {
        return Error("User already exists");
    }

    const registrationUser = new RegistrationUserBody(
        null,
        userData.name,
        userData.surname,
        userData.patronymic,
        userData.dateOfBirthday,
        userData.phone,
        userData.email,
        userData.allergies,
        userData.imageString,
        userData.fileName,
        userData.address,
        userData.login,
        userData.password
    );

    const insertResult = await collectionUser.insertOne(registrationUser.toMongoObject());
    console.log("inserted data     ", insertResult)
    
    const savedUserId = insertResult.insertedId;
    const savedUser = await collectionUser.findOne({ _id: savedUserId });

    return savedUser;
}

export async function editUser(userId: string, editedUserData: any) {
    const db = await connect();
    const collection = db.collection("users");
    try {
        const filter = { _id: new ObjectId(userId) };
        const update = {
            $set: {
                name: editedUserData.name,
                surname: editedUserData.surname,
                patronymic: editedUserData.patronymic,
                dateOfBirthday: editedUserData.dateOfBirthday,
                phone: editedUserData.phone,
                email: editedUserData.email,
                allergies: editedUserData.allergies,
                photo: editedUserData.photo,
                photoName: editedUserData.photoName,
                address: editedUserData.address
            }
        };

        await collection.updateOne(filter, update);
    } catch (e) {
        console.error("Error fetching user from MongoDB", e);
        throw e;
    }
}
