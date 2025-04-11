class User {
    constructor({id, name, lastname, email, phonenumber, profile_image = null}) {
        this.user_id = id;
        this.name = name;
        this.email = email;
        this.lastname = lastname;
        this.phonenumber = phonenumber;
        this.profile_image = profile_image;
    }
    
    getName() {
        return this.name;
    }
    
    getEmail() {
        return this.email;
    }
}

export default User;