class UserRequest {
  name: string;
  phone: string;
  description: string;

  constructor(name: string, phone: string, description: string) {
    this.name = name;
    this.phone = phone;
    this.description = description;
  }
}

export { UserRequest };
