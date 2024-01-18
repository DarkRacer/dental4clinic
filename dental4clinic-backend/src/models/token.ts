class Token {
    id: string;
    access_token: string;
    role: string;
  
    constructor(id: string, access_token: string, role: string) {
      this.id = id;
      this.access_token = access_token;
      this.role = role;
    }
  }
  
  export { Token };