import { ObjectId } from "mongodb";

class UserDiagnosis {
    id: string;
    name: string;
    description: string;
    isActual: boolean;
    userId: string;
    diagnosisId: string;
  
    constructor(id: string, name: string, description: string, isActual: boolean, userId: string, diagnosisId: string) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.isActual = isActual;
      this.userId = userId;
    }
  
    toMongoObject(): any {
      return {
        _id: this.id == null ? null : new ObjectId(this.id),
        name: this.name,
        description: this.description,
        isActual: this.isActual,
        userId: this.userId,
        diagnosisId: this.diagnosisId
      };
    }
  }
  
  export { UserDiagnosis };