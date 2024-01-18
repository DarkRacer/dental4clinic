import { ObjectId } from "mongodb";
import { Price } from "../models/price";
import { connect } from "../mongo";
import { Service } from "../models/service";

export async function getAllPrices(): Promise<Price[]> {
    const db = await connect();
    const collection = db.collection("prices");

    const pricesData = await collection.find({}).toArray();
    return pricesData.map(price => new Price(
        null,
        price.serviceId,
        price.name,
        price.description,
        price.pluses,
        price.price,
        price.group
    ));
}

export async function getPriceByServiceId(serviceId: string): Promise<Price | null> {
    const db = await connect();
    const collection = db.collection("prices");

    const price = await collection.findOne({ "serviceId": serviceId });
    if (!price) {
        return null;
    }

    return new Price(
        null,
        price.serviceId,
        price.name,
        price.description,
        price.pluses,
        price.price,
        price.group
    );
}

export function groupPricesByService(prices: Price[]): any {
    const grouped = {};

    prices.forEach(price => {
        if (!grouped[price.group]) {
            grouped[price.group] = { group: price.group, services: [] };
        }
        grouped[price.group].services.push({
            serviceId: price.serviceId,
            name: price.name,
            price: price.price
        });
    });

    return Object.values(grouped);
}

export async function createPriceAndGetUpdatedPrices(priceData: any): Promise<Price[]> {
    try {
        const db = await connect();

        const collectionService = db.collection("services");

        const serviceObj = new Service(
            null,
            priceData.name,
            priceData.description,
            priceData.price
        );
        const documentService = await collectionService.insertOne(serviceObj.toMongoObject());

        const collectionPrice = db.collection("prices");

        const priceObj = new Price(
            null,
            documentService.insertedId.toString(),
            priceData.name,
            priceData.description,
            priceData.pluses,
            priceData.price,
            priceData.group
        );

        await collectionPrice.insertOne(priceObj.toMongoObject());

        const prices = await collectionPrice.find({}).toArray();
        return prices.map(price => new Price(
            null,
            price.serviceId,
            price.name,
            null,
            null,
            price.price,
            price.group
        ));
    } catch (error) {
        console.error('Error in createPriceAndGetUpdatedPrices:', error);
        throw error;
    }
}

export async function editPriceAndGetUpdatedPrices(priceData: any): Promise<Price[]> {
    try {
        const db = await connect();

        const collectionService = db.collection("services");
        const filterService = { _id: new ObjectId(priceData.serviceId) };
        const updateService = {
            $set: {
                service: priceData.name,
                description: priceData.description,
                price: priceData.price
            }
        };
        await collectionService.updateOne(filterService, updateService);


        const collectionPrice = db.collection("prices");
        const filterPrice = { serviceId: priceData.serviceId };
        const updatePrice = {
            $set: {
                name: priceData.name,
                description: priceData.description,
                pluses: priceData.pluses,
                price: priceData.price,
                group: priceData.group
            }
        };
        await collectionPrice.updateOne(filterPrice, updatePrice);

        const prices = await collectionPrice.find({}).toArray();
        return prices.map(price => new Price(
            null,
            price.serviceId,
            price.name,
            null,
            null,
            price.price,
            price.group
        ));
    } catch (error) {
        console.error('Error in editPriceAndGetUpdatedPrices:', error);
        throw error;
    }
}

export async function deletePriceAndGetUpdatedPrices(priceData: any): Promise<Price[]> {
    try {
        const db = await connect();

        const collectionService = db.collection("services");
        const filterService = { _id: new ObjectId(priceData.serviceId) };
        await collectionService.deleteOne(filterService);

        const collectionPrice = db.collection("prices");
        const filterPrice = { "serviceId": priceData.serviceId };
        await collectionPrice.deleteOne(filterPrice);

        const collectionDoctorsService = db.collection("doctors-services");
        const filterDoctorsService = { serviceId: priceData.serviceId };
        await collectionDoctorsService.deleteOne(filterDoctorsService);

        const prices = await collectionPrice.find({}).toArray();
        return prices.map(price => new Price(
            null,
            price.serviceId,
            price.name,
            null,
            null,
            price.price,
            price.group
        ));
    } catch (error) {
        console.error('Error in editPriceAndGetUpdatedPrices:', error);
        throw error;
    }
}
