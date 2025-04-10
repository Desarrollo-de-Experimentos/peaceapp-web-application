class User {
    constructor(id, name, lastName, email, phoneNumber) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }
    
    getName() {
        return this.name;
    }
    
    getEmail() {
        return this.email;
    }
}

export default User;