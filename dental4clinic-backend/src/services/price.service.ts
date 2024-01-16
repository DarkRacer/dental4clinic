import { ObjectId } from "mongodb";
import { Price } from "../models/price";
import { connect } from "../mongo";

export async function getAllPrices(): Promise<Price[]> {
    const db = await connect();
    const collection = db.collection("prices");

    const pricesData = await collection.find({}).toArray();
    return pricesData.map(doc => new Price(
        doc._id.toString(),
        doc.name,
        doc.description || '',
        doc.pluses || '',
        doc.price,
        doc.group
    ));
}

export async function getPriceByServiceId(priceId: string): Promise<Price | null> {
    const db = await connect();
    const collection = db.collection("prices");

    const doc = await collection.findOne({ "_id": new ObjectId(priceId) });
    if (!doc) return null;

    return new Price(
        doc._id.toString(),
        doc.name,
        doc.description || '',
        doc.pluses || '',
        doc.price,
        doc.group
    );
}

export function groupPricesByService(prices: Price[]): any {
    const grouped = {};

    prices.forEach(price => {
        if (!grouped[price.group]) {
            grouped[price.group] = { group: price.group, services: [] };
        }
        grouped[price.group].services.push({
            'service-id': price.serviceId,
            name: price.name,
            price: price.price
        });
    });

    return Object.values(grouped);
}

export async function createPriceAndGetUpdatedPrices(priceData: any): Promise<Price[]> {
    try {
        const db = await connect();
        const collection = db.collection("prices");

        const priceObj = new Price(
            priceData["service-id"],
            priceData.name,
            priceData.description,
            priceData.pluses,
            priceData.price,
            priceData.group
        );

        await collection.insertOne(priceObj.toMongoObject());

        const prices = await collection.find({}).toArray();
        return prices.map(pr => new Price(
            pr._id.toString(),
            pr.name,
            pr.description,
            pr.pluses,
            pr.price,
            pr.group
        ));
    } catch (error) {
        console.error('Error in createPriceAndGetUpdatedPrices:', error);
        throw error;
    }
}

export async function editPriceAndGetUpdatedPrices(priceData: any): Promise<Price[]> {
    try {
        const db = await connect();
        const collection = db.collection("prices");

        const priceObj = new Price(
            priceData.serviceId,
            priceData.name,
            priceData.description,
            priceData.pluses,
            priceData.price,
            priceData.group
        );

        const filter = { _id: new ObjectId(priceObj.serviceId) };
        const update = {
            $set: priceObj.toMongoObject()
        };
        await collection.updateOne(filter, update);

        const prices = await collection.find({}).toArray();
        return prices.map(pr => new Price(
            pr._id.toString(),
            pr.name,
            pr.description,
            pr.pluses,
            pr.price,
            pr.group
        ));
    } catch (error) {
        console.error('Error in createPriceAndGetUpdatedPrices:', error);
        throw error;
    }
}

export async function deletePriceAndGetUpdatedPrices(priceData: any): Promise<Price[]> {
    try {
        const db = await connect();
        const collection = db.collection("prices");

        const filter = { _id: new ObjectId(priceData.serviceId) };
        await collection.deleteOne(filter);

        const prices = await collection.find({}).toArray();
        return prices.map(pr => new Price(
            pr._id.toString(),
            pr.name,
            pr.description,
            pr.pluses,
            pr.price,
            pr.group
        ));
    } catch (error) {
        console.error('Error in createPriceAndGetUpdatedPrices:', error);
        throw error;
    }
}
