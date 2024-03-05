const DB = require('../utils/db');
const bcrypt = require('bcryptjs');
class User {
    fullName;
    email;
    password;
    socialMediaAccount;

    constructor(fullName, email, password, socialMediaAccount) {
        this.fullName = fullName,
            this.email = email,
            this.password = password,
            this.socialMediaAccount = socialMediaAccount

    }
    static async InsertUser(fullName, email, password, socialMediaAccount) {
        console.log('step modal InsertUser :>> ');
        this.fullName = fullName;
        this.email = email;
        this.password = await bcrypt.hash(password, 10);
        console.log('this.password :>> ', this.password);
        this.socialMediaAccount = socialMediaAccount;
        return await new DB().InsertUser('Users', {
            ...this
        });
    }
    static async Login(email, password) {
        console.log('step 2:>> ');
        this.email = email;
        let user = await new DB().Login('Users', email);
        console.log('back to step 2 :>> ');
        let passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            return user;
        } else {
            return false;
        }
    }
    static async Check(email) {
        console.log('step 2:>> ');
        this.email = email;
        console.log('back to step 2 :>> ');
        const userEmail = await new DB().Check('Users', email);
        console.log('res 2:>> ', userEmail);
        return userEmail;
    }
}

module.exports = User;