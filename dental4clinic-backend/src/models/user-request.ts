import { ObjectId } from "mongodb";

class UserRequest {
  id: string;
  name: string;
  phone: string;
  description: string;

  constructor(id: string, name: string, phone: string, description: string) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.description = description;
  }

  toMongoObject(): any {
    return {
      _id: this.id == null ? null : new ObjectId(this.id),
      name: this.name,
      phone: this.phone,
      description: this.description
  };
  }
}

export { UserRequest };
