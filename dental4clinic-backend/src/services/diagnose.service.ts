import { ObjectId } from "mongodb";
import { Diagnosis } from "../models/diagnosis";
import { connect } from "../mongo";

async function fetchAllDiagnosesForUser(userId: string, collection: any): Promise<Diagnosis[]> {
    const userDiagnoses = await collection.find({ "user-id": userId }).toArray();
    return userDiagnoses.map(diagnose => new Diagnosis(
        diagnose._id.toString(),
        diagnose.name,
        diagnose.description,
        diagnose.isActual,
        diagnose.userId
    ));
}

async function fetchAllDiagnoses(collection: any): Promise<Diagnosis[]> {
    const userDiagnoses = await collection.find({}).toArray();
    return userDiagnoses.map(diagnose => new Diagnosis(
        diagnose._id.toString(),
        diagnose.name,
        diagnose.description,
        diagnose.isActual,
        diagnose.userId
    ));
}

export async function getDiagnosesByUserId(userId: string): Promise<Diagnosis[]> {
    try {
        const db = await connect();
        const collection = db.collection("diagnosis");
        return await fetchAllDiagnosesForUser(userId, collection);
    } catch (error) {
        console.error('Error in getDiagnosesByUserId:', error);
        throw error;
    }
}

export async function getAllDiagnosis(): Promise<Diagnosis[]> {
    try {
        const db = await connect();
        const collection = db.collection("diagnosis");
        return await fetchAllDiagnoses(collection);
    } catch (error) {
        console.error('Error in getAllDiagnosis:', error);
        throw error;
    }
}

export async function addDiagnoseAndGetAll(userId: string, diagnoseData: any): Promise<Diagnosis[]> {
    try {
        const db = await connect();
        const collection = db.collection("diagnosis");

        const newDiagnose = new Diagnosis(
            null,
            diagnoseData.name,
            diagnoseData.description,
            diagnoseData.isActual,
            userId
        );
        await collection.insertOne(newDiagnose.toMongoObject());

        return await fetchAllDiagnosesForUser(userId, collection);
    } catch (error) {
        console.error('Error in addDiagnoseAndGetAll:', error);
        throw error;
    }
}

export async function updateDiagnosisAndGetAll(userId: string, diagnoseData: any): Promise<Diagnosis[]> {
    try {
        const db = await connect();
        const collection = db.collection("diagnosis");

        const updatedDiagnose = new Diagnosis(
            null,
            diagnoseData.name,
            diagnoseData.description,
            diagnoseData.isActual,
            userId
        );

        await collection.updateOne(
            { _id: new ObjectId(diagnoseData.id), "userId": userId },
            { $set: updatedDiagnose.toMongoObject() }
        );

        return await fetchAllDiagnosesForUser(userId, collection);
    } catch (error) {
        console.error('Error in updateDiagnosisAndGetAll:', error);
        throw error;
    }
}