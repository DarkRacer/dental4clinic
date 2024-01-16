import { ToothCard } from "../models/tooth-card";
import { connect } from "../mongo";

export async function getToothCardByUserId(userId: string): Promise<ToothCard | null> {
    try {
        const db = await connect();
        const collection = db.collection("tooth-card");

        const toothCardData = await collection.findOne({ "userId": userId });
        if (!toothCardData) {
            return null;
        }

        return new ToothCard(toothCardData.userId, toothCardData);
    } catch (error) {
        console.error('Error in getToothCardByUserId:', error);
        throw error;
    }
}

export async function updateToothCard(userId: string, toothData: any): Promise<void> {
    try {
        const db = await connect();
        const collection = db.collection("tooth-card");

        const toothCard = new ToothCard(userId, toothData);

        await collection.updateOne(
            { "userId": userId },
            { $set: toothCard.toMongoObject() },
            { upsert: true } 
        );
    } catch (error) {
        console.error('Error in updateToothCard service:', error);
        throw error;
    }
}