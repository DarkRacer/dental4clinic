import { ObjectId } from "mongodb";
import { Diagnosis } from "../models/diagnosis";
import { connect } from "../mongo";
import { UserDiagnosis } from "../models/user.diagnosis";

export async function getDiagnosesByUserId(userId: string): Promise<UserDiagnosis[]> {
    try {
        const db = await connect();
        const collection = db.collection("users-diagnosis");
        const userDiagnoses = await collection.find({ "userId": userId }).toArray();
        return userDiagnoses.map(diagnose => new UserDiagnosis(
            diagnose._id.toString(),
            diagnose.name,
            diagnose.description,
            diagnose.isActual,
            diagnose.userId,
            diagnose.diagnosisId
        ));
    } catch (error) {
        console.error('Error in getAllDiagnosisByUserId:', error);
        throw error;
    }
}

export async function getAllDiagnosis(): Promise<Diagnosis[]> {
    try {
        const db = await connect();
        const collection = db.collection("diagnosis");
        const userDiagnoses = await collection.find({}).toArray();
        return userDiagnoses.map(diagnose => new Diagnosis(
        diagnose._id.toString(),
        diagnose.name,
        diagnose.description
        ));
    } catch (error) {
        console.error('Error in getAllDiagnosis:', error);
        throw error;
    }
}

export async function addDiagnoseAndGetAll(userId: string, diagnoseData: any): Promise<Diagnosis[]> {
    try {
        const db = await connect();
        const collection = db.collection("users-diagnosis");

        const newDiagnose = new UserDiagnosis(
            null,
            diagnoseData.name,
            diagnoseData.description,
            true,
            userId,
            diagnoseData.id
        );
        await collection.insertOne(newDiagnose.toMongoObject());

        const userDiagnoses = await collection.find({ "userId": userId }).toArray();
        return userDiagnoses.map(diagnose => new UserDiagnosis(
            diagnose._id.toString(),
            diagnose.name,
            diagnose.description,
            diagnose.isActual,
            null,
            null
        ));
    } catch (error) {
        console.error('Error in addDiagnoseAndGetAll:', error);
        throw error;
    }
}

export async function updateDiagnosisAndGetAll(userId: string, diagnoseData: any): Promise<Diagnosis[]> {
    try {
        const db = await connect();
        const collection = db.collection("users-diagnosis");

        const filterPrice = { _id: new ObjectId(diagnoseData.id), userId : userId };
        const updatePrice = {
            $set: {
                isActual: diagnoseData.isActual
            }
        };

        await collection.updateOne(filterPrice, updatePrice);

        const userDiagnoses = await collection.find({ "userId": userId }).toArray();
        return userDiagnoses.map(diagnose => new UserDiagnosis(
            diagnose._id.toString(),
            diagnose.name,
            diagnose.description,
            diagnose.isActual,
            null,
            null
        ));
    } catch (error) {
        console.error('Error in updateDiagnosisAndGetAll:', error);
        throw error;
    }
}
