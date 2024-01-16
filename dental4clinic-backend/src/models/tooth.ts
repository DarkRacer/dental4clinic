import { ObjectId } from "mongodb";

class Tooth {
    id: string;
    data: string;
    userId: string;

    constructor(id: string, data: string, userId: string) {
        this.id = id;
        this.data = data;
        this.userId = userId;
    }

    toMongoObject(): any {
        return {
            _id: this.id == null ? null : new ObjectId(this.id),
            data: this.data,
            userId: this.userId
        };
    }
}

export { Tooth };