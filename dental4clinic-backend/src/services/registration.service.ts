import { connect } from "../mongo";
import { RegistrationUserBody } from "../models/registration-user";
import * as authService from "./auth.service";

export const registration = async (userData) => {
    const db = await connect();

    const collection = db.collection("users");
    try {
        const existingUser = await collection.findOne({ login: userData.login });

        if (existingUser) {
            return { error: 'User with this login already exists', statusCode: 409 };
        }

        const allergiesArray = typeof userData.allergies === 'string' ? userData.allergies.split('\n') : userData.allergies;
        const registrationUser = new RegistrationUserBody(
            null,
            userData.name,
            userData.surname,
            userData.patronymic,
            new Date(userData.dateOfBirthday),
            userData.phone,
            userData.email,
            allergiesArray,
            userData.imageString,
            userData.fileName,
            userData.address,
            userData.login,
            userData.password
        );

        const insertResult = await collection.insertOne(registrationUser.toMongoObject());

        const savedUserId = insertResult.insertedId;
        const savedUser = await collection.findOne({ _id: savedUserId });

        if (!savedUser) {
            return { error: 'Error retrieving the saved user', statusCode: 500 };
        }

        const tokenResponse = authService.createToken(savedUser);
        return { token: tokenResponse, user: registrationUser, userData: userData, statusCode: 200 };
    } catch (error) {
        console.error('Registration Error:', error);
        return { error: 'Error registering user', statusCode: 500 };
    }
};
