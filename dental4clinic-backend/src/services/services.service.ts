import { ObjectId } from "mongodb";
import { Service } from "../models/service";
import { connect } from "../mongo";
import { DoctorService } from "../models/doctor.service";

export async function getServicesByDoctorId(doctorId: string): Promise<Service[]> {
    try {
        const db = await connect();
        const collectionDS = db.collection("doctors-services");
        const collectionS = db.collection("services");

        let services = [];
        const doctorsServices = await collectionDS.find({ doctorId: doctorId }).toArray();
        for (const doctorService of doctorsServices) {
            const serviceId = doctorService.serviceId;
            console.log(serviceId);
            const query = { _id: new ObjectId(serviceId) };
            const serviceObj = await collectionS.findOne(query);
            console.log(serviceObj);
            const doctorServices = new Service(
                serviceObj._id.toString(),
                serviceObj.service,
                serviceObj.description,
                serviceObj.price
            );

            services.push(doctorServices);
        }

        return services;
    } catch (error) {
        console.error('Error in createPriceAndGetUpdatedPrices:', error);
        throw error;
    }
}

export async function getAllService(): Promise<Service[]> {
    try {
        const db = await connect();
        const collection = db.collection("services");

        const services = await collection.find({}).toArray();

        return services.map(service => new Service(
            service._id.toString(),
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
        const collectionDS = db.collection("doctors-services");
        const filter = { serviceId: requestData.id, doctorId: doctorId };
        await collectionDS.deleteOne(filter);

        return getServicesByDoctorId(doctorId);
    } catch (error) {
        console.error('Error in deleteDoctorService:', error);
        throw error;
    }
}

export async function addDoctorFromService(doctorId: string, requestData: any): Promise<Service[]> {
    try {
        const db = await connect();
        const collectionU = db.collection("users");
        const query = { _id: new ObjectId(doctorId) };
        const doctorData = await collectionU.findOne(query);

        const collectionDS = db.collection("doctors-services");
        const doctorService = new DoctorService(
            null,
            doctorId,
            doctorData.surname + doctorData.name + doctorData.patronymic,
            requestData.service,
            requestData.id
        );

        await collectionDS.insertOne(doctorService.toMongoObject());
        return getServicesByDoctorId(doctorId);
    } catch (error) {
        console.error('Error in createPriceAndGetUpdatedPrices:', error);
        throw error;
    }
}
