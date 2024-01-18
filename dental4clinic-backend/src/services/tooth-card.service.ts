import { ToothCard } from "../models/tooth-card";
import { connect } from "../mongo";

export async function getToothCardByUserId(userId: string): Promise<ToothCard | null> {
    const toothData = {
        left8Up: 0,
        left8Down: 0,
        left7Up: 0,
        left7Down: 0,
        left6Up: 0,
        left6Down: 0,
        left5Up: 0,
        left5Down: 0,
        left4Up: 0,
        left4Down: 0,
        left3Up: 0,
        left3Down: 0,
        left2Up: 0,
        left2Down: 0,
        left1Up: 0,
        left1Down: 0,
        right1Up: 0,
        right1Down: 0,
        right2Up: 0,
        right2Down: 0,
        right3Up: 0,
        right3Down: 0,
        right4Up: 0,
        right4Down: 0,
        right5Up: 0,
        right5Down: 0,
        right6Up: 0,
        right6Down: 0,
        right7Up: 0,
        right7Down: 0,
        right8Up: 0,
        right8Down: 0
    };

    try {
        const db = await connect();
        const collection = db.collection("tooth-card");

        const toothCardData = await collection.findOne({ "userId": userId });
        if (!toothCardData) {
            const defaultToohtCard = new ToothCard(userId, toothData);
            await collection.insertOne(defaultToohtCard.toMongoObject());
            const toothCardDataDef = await collection.findOne({ "userId" : userId });
            const t = new ToothCard(toothCardDataDef.userId, toothCardDataDef);
            t.convertStringsToNumbers();
            return t;
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