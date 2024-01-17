import { ObjectId } from "mongodb";
import { Service } from "../models/service";
import { connect } from "../mongo";

export async function getServicesByDoctorId(doctorId: string): Promise<Service[]> {
    try {
        const db = await connect();
        const collection = db.collection("services");

        const services = await collection.find({ "doctorId": doctorId }).toArray();

        return services.map(service => new Service(
            service._id.toString(),
            service.doctorId,
            service.doctor,
            service.service,
            service.description,
            service.price
        ));
    } catch (error) {
        console.error('Error in createPriceAndGetUpdatedPrices:', error);
        throw error;
    }
}

export async function getAllService(): Promise<Service[]> {
    try {
        const db = await connect();
        const collection = db.collection("prices");

        const services = await collection.find({}).toArray();

        return services.map(service => new Service(
            service._id.toString(),
            service.doctorId,
            service.doctor,
            service.service,
            service.description,
            service.price
        ));
    } catch (error) {
        console.error('Error in createPriceAndGetUpdatedPrices:', error);
        throw error;
    }
}

export async function deleteDoctorFromService(doctorId: string, requestData: any): Promise<Service[]> {
    try {
        const db = await connect();
        const collection = db.collection("services");

        const filter = { _id: new ObjectId(requestData.id), doctorId: doctorId };
        const update = {
            $set: {
                doctorId: null,
                doctor: null
            }
        };
        await collection.updateOne(filter, update);

        const services = await collection.find({}).toArray();
        return services.map(service => new Service(
            service._id.toString(),
            service.doctorId,
            service.doctor,
            service.service,
            service.description,
            service.price
        ));
    } catch (error) {
        console.error('Error in deleteDoctorService:', error);
        throw error;
    }
}

export async function addDoctorFromService(doctorId: string, requestData: any): Promise<Service[]> {
    try {
        const db = await connect();
        const collection = db.collection("services");

        const filter = { _id: new ObjectId(requestData.id) };
        const update = {
            $set: {
                doctorId: doctorId,
                doctor: requestData.doctor
            }
        };
        await collection.updateOne(filter, update);

        const services = await collection.find({}).toArray();
        return services.map(service => new Service(
            service._id.toString(),
            service.doctorId,
            service.doctor,
            service.service,
            service.description,
            service.price
        ));
    } catch (error) {
        console.error('Error in createPriceAndGetUpdatedPrices:', error);
        throw error;
    }
}
