import { ObjectId } from "mongodb";
import { Diagnosis } from "../models/diagnosis";
import { connect } from "../mongo";

async function fetchAllDiagnosesForUser(userId: string, collection: any): Promise<Diagnosis[]> {
    const userDiagnoses = await collection.find({ "user-id": userId }).toArray();
    return userDiagnoses.map(doc => new Diagnosis(
        doc._id.toString(),
        doc.name,
        doc.description,
        doc.isActual,
        doc["user-id"]
    ));
}

async function fetchAllDiagnoses(collection: any): Promise<Diagnosis[]> {
    const userDiagnoses = await collection.find({}).toArray();
    return userDiagnoses.map(doc => new Diagnosis(
        doc._id.toString(),
        doc.name,
        doc.description,
        doc.isActual,
        doc["user-id"]
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
            { _id: new ObjectId(diagnoseData.id), "user-id": userId },
            { $set: updatedDiagnose.toMongoObject() }
        );

        return await fetchAllDiagnosesForUser(userId, collection);
    } catch (error) {
        console.error('Error in updateDiagnosisAndGetAll:', error);
        throw error;
    }
}