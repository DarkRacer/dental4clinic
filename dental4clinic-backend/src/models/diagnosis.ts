import { ObjectId } from "mongodb";

class Diagnosis {
    id: string;
    name: string;
    description: string;
  
    constructor(id: string, name: string, description: string) {
      this.id = id;
      this.name = name;
      this.description = description;
    }
  
    toMongoObject(): any {
      return {
        _id: this.id == null ? null : new ObjectId(this.id),
        name: this.name,
        description: this.description
      };
    }
  }
  
  export { Diagnosis };