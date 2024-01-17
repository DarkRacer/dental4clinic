import { ObjectId } from "mongodb";
import { Admin, Role } from "../models/user";
import { connect } from "../mongo";


export async function getAdmins(): Promise<Admin[]> {
    try {
        const db = await connect();
        const collection = db.collection("users");

        const admins = await collection.find({ role: Role.ADMIN }).toArray();

        return admins.map(admin => new Admin(
            admin._id.toString(),
            admin.name,
            admin.surname,
            admin.patronymic,
            admin.photo,
            admin.photoName
        ));
    } catch (error) {
        console.error('Error in createPriceAndGetUpdatedPrices:', error);
        throw error;
    }
}

export async function createAdminAndFetchAll(admin: any): Promise<Admin[]> {
    try {
        const db = await connect();
        const collection = db.collection("users");

        const creatingAdmin = new Admin(
            null,
            admin.name,
            admin.surname,
            admin.patronymic,
            admin.photo,
            admin.photoName
        );

        await collection.insertOne(creatingAdmin.toMongoObject());

        const admins = await collection.find({ role: Role.ADMIN }).toArray();
        return admins.map(admin => new Admin(
            admin._id.toString(),
            admin.name,
            admin.surname,
            admin.patronymic,
            admin.photo,
            admin.photoName
        ));
    } catch (e) {
        console.error("Error fetching in createAdminAndFetchAll", e);
        throw e;
    }
}

export async function editAdminAndFetchAll(admin: any): Promise<Admin[]> {
    try {
        const db = await connect();
        const collection = db.collection("users");

        const editingAdmin = new Admin(
            admin.id,
            admin.name,
            admin.surname,
            admin.patronymic,
            admin.photo,
            admin.photoName
        );

        const filter = { _id: new ObjectId(admin.id) };
        const update = {
            $set: editingAdmin.toMongoObject()
        };
        await collection.updateOne(filter, update);

        const admins = await collection.find({ role: Role.ADMIN }).toArray();
        return admins.map(admin => new Admin(
            admin._id.toString(),
            admin.name,
            admin.surname,
            admin.patronymic,
            admin.photo,
            admin.photoName
        ));
    } catch (e) {
        console.error("Error fetching in editAdminAndFetchAll", e);
        throw e;
    }
}

export async function deleteAdminAndFetchAll(admin: any): Promise<Admin[]> {
    try {
        const db = await connect();
        const collection = db.collection("users");

        const filter = { _id: new ObjectId(admin.id) };
        await collection.deleteOne(filter);

        const admins = await collection.find({ role: Role.ADMIN }).toArray();
        return admins.map(admin => new Admin(
            admin._id.toString(),
            admin.name,
            admin.surname,
            admin.patronymic,
            admin.photo,
            admin.photoName
        ));
    } catch (e) {
        console.error("Error fetching in deleteAdminAndFetchAll", e);
        throw e;
    }
}
