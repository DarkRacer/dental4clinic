import { ObjectId } from "mongodb";
import { MyRequest } from "../models/my-request";
import { connect } from "../mongo";

export async function getRequestsByUserId(userId: string): Promise<MyRequest[]> {
    try {
        const db = await connect();
        const collection = db.collection("requests");

        const requestsData = await collection.find({ "userId": userId }).toArray();

        return requestsData.map(requestData => new MyRequest(
            requestData._id.toString(),
            requestData.userId,
            requestData.name,
            requestData.phone,
            requestData.description,
            requestData.isActual
        ));
    } catch (error) {
        console.error('Error getting requests by userId:', error);
        return [];
    }
}

export async function getRequestsById(id: string): Promise<MyRequest> {
  try {
    const db = await connect();
    const collection = db.collection("requests");

    const requestData = await collection.findOne({ _id: new ObjectId(id) });

    return new MyRequest(
      requestData._id.toString(),
      requestData.userId,
      requestData.name,
      requestData.phone,
      requestData.description,
      requestData.isActual
    );
  } catch (error) {
    console.error('Error getting requests by id:', error);
    return null;
  }
}


export async function getAllRequests(): Promise<MyRequest[]> {
    const db = await connect();
    const collection = db.collection("requests");

    const pricesData = await collection.find({}).toArray();
    return pricesData.map(request => new MyRequest(
        request._id.toString(),
        request.userId,
        request.name,
        request.phone,
        request.description,
        request.isActual
    ));
}

export async function getActiveRequests(): Promise<MyRequest[]> {
    const db = await connect();
    const collection = db.collection("requests");

    const pricesData = await collection.find({ isActual: true }).toArray();
    return pricesData.map(request => new MyRequest(
        request._id.toString(),
        request.userId,
        request.name,
        request.phone,
        request.description,
        request.isActual
    ));
}

export async function createRequestAndFetchAll(requestData: any, currentUser: any): Promise<void> {
    try {
        const db = await connect();
        const collection = db.collection("requests");

        const requestObj = new MyRequest(
            null,
            currentUser['id'],
            requestData.name,
            requestData.phone,
            requestData.description,
            true
        );

        await collection.insertOne(requestObj.toMongoObject());
    } catch (error) {
        console.error('Error in createRequestAndFetchAll:', error);
        throw error;
    }
}

export async function editRequestAndFetchAll(requestData: any): Promise<MyRequest[]> {
    try {
        const db = await connect();
        const collection = db.collection("requests");

        const requestObj = new MyRequest(
            requestData.id,
            requestData.userId,
            requestData.name,
            requestData.phone,
            requestData.description,
            requestData.isActual
        );

        const filter = { _id: new ObjectId(requestData.id) };
        const update = {
            $set: requestObj.toMongoObject()
        };
        await collection.updateOne(filter, update);

        const requests = await collection.find({}).toArray();
        return requests.map(request => new MyRequest(
            request._id.toString(),
            request.userId,
            request.name,
            request.phone,
            request.description,
            request.isActual
        ));
    } catch (error) {
        console.error('Error in editRequestAndFetchAll:', error);
        throw error;
    }
}

export async function disableRequest(requestId: any)  {
    try {
        const db = await connect();
        const collection = db.collection("requests");

        const filter = { _id: new ObjectId(requestId) };
        const update = {
          $set: {
            isActual: false
          }
        };
        await collection.updateOne(filter, update);
    } catch (error) {
        console.error('Error in disableRequest:', error);
        throw error;
    }
}

export async function deleteRequestAndFetchAll(requestData: any): Promise<MyRequest[]> {
    try {
        const db = await connect();
        const collection = db.collection("requests");

        const filter = { _id: new ObjectId(requestData.id) };
        await collection.deleteOne(filter);

        const requests = await collection.find({}).toArray();
        return requests.map(request => new MyRequest(
            request._id.toString(),
            request.userId,
            request.name,
            request.phone,
            request.description,
            request.isActual
        ));
    } catch (error) {
        console.error('Error in deleteRequestAndFetchAll:', error);
        throw error;
    }
}
