class MyRequest {
    date: string;
    phone: string;
    description: string;
    userId: string;

    constructor(date: string, phone: string, description: string, userId: string) {
        this.date = date;
        this.phone = phone;
        this.description = description;
        this.userId = userId;
    }

    toMongoObject(): any {
        return {
            date: this.date,
            phone: this.phone,
            description: this.description,
            userId: this.userId
        };
    }
}

export { MyRequest };