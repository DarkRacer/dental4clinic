class Diagnosis {
    id: string;
    name: string;
    description: string;
    isActual: boolean;
    userId: string;
  
    constructor(id: string, name: string, description: string, isActual: boolean, userId: string) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.isActual = isActual;
      this.userId = userId;
    }
  
    toMongoObject(): any {
      return {
        _id: this.id,
        name: this.name,
        description: this.description,
        isActual: this.isActual,
        userId: this.userId
      };
    }
  }
  
  export { Diagnosis };