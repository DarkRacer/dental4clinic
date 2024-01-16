import { ObjectId } from "mongodb";
import { Payment } from "../models/payment";
import { connect } from "../mongo";

export async function getAllPaymentsByUser(userId: string): Promise<Payment[]> {
    try {
        const db = await connect();
        const collection = db.collection("payments");
        const paymentsData = await collection.find({ "user-id": userId }).toArray();

        return paymentsData.map(payment => new Payment(
            payment._id.toString(),
            payment.date,
            payment['user-id'],
            payment['user-name'],
            payment['doctor-id'],
            payment['doctor-name'],
            payment.service,
            payment.price,
            payment.isActive
        ));
    } catch (error) {
        console.error('Error in getAllPayments:', error);
        throw error;
    }
}

export async function getAllPayments(): Promise<Payment[]> {
    try {
        const db = await connect();
        const collection = db.collection("payments");
        const paymentsData = await collection.find({}).toArray();

        return paymentsData.map(payment => new Payment(
            payment._id.toString(),
            payment.date,
            payment['user-id'],
            payment['user-name'],
            payment['doctor-id'],
            payment['doctor-name'],
            payment.service,
            payment.price,
            payment.isActive
        ));
    } catch (error) {
        console.error('Error in getPayments:', error);
        throw error;
    }
}

export async function updatePaymentAndFetchAll(updatedData: any): Promise<Payment[]> {
    try {
        const db = await connect();
        const collection = db.collection("payments");

        const payment = new Payment(
            updatedData.id,
            updatedData.date,
            updatedData['user-id'],
            updatedData['user-name'],
            updatedData['doctor-id'],
            updatedData['doctor-name'],
            updatedData.service,
            updatedData.price,
            updatedData.isActive
        );

        const query = { _id: new ObjectId(payment.id) };
        const update = { $set: payment.toMongoObject() };
        await collection.updateOne(query, update, { upsert: true });

        const paymentsData = await collection.find({}).toArray();
        return paymentsData.map(item => new Payment(
            item._id.toString(),
            item.date,
            item.userId,
            item.userName,
            item.doctorId,
            item.doctorName,
            item.service,
            item.price,
            item.isActive
        ));
    } catch (error) {
        console.error('Error in updatePaymentAndFetchAll:', error);
        throw error;
    }
}

export async function deletePaymentAndFetchAll(deletedData: any): Promise<Payment[]> {
    try {
        const db = await connect();
        const collection = db.collection("payments");

        const deleteQuery = { _id: new ObjectId(deletedData.id) };
        await collection.deleteOne(deleteQuery);

        const paymentsData = await collection.find({}).toArray();
        return paymentsData.map(item => new Payment(
            item._id.toString(),
            item.date,
            item.userId,
            item.userName,
            item.doctorId,
            item.doctorName,
            item.service,
            item.price,
            item.isActive
        ));
    } catch (error) {
        console.error('Error in updatePaymentAndFetchAll:', error);
        throw error;
    }
}