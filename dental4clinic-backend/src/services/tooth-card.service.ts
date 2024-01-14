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