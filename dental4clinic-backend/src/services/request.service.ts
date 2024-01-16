import { MyRequest } from "../models/my-request";
import { connect } from "../mongo";

export async function getRequestsByUserId(userId: string): Promise<MyRequest[]> {
    try {
        const db = await connect();
        const collection = db.collection("request");

        const requestsData = await collection.find({ "userId": userId }).toArray();

        return requestsData.map(requestData => new MyRequest(
            requestData.date, 
            requestData.phone, 
            requestData.description, 
            requestData.userId
        ));
    } catch (error) {
        console.error('Error getting requests by userId:', error);
        return [];
    }
}