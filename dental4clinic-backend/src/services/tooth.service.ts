import { Tooth } from "../models/tooth";
import { connect } from "../mongo";

export async function getUserTooth(userId: string): Promise<Tooth[]> {
    try {
        const db = await connect();
        const collection = db.collection("tooth");
        const toothDataArray = await collection.find({ "userId": userId }).toArray();

        return toothDataArray.map((toothData: any) => {
            return new Tooth(
                toothData._id, 
                toothData.data, 
                toothData.userId
            );
        });
    } catch (error) {
        console.error('Error getting user tooth data:', error);
        return [];
    }
}