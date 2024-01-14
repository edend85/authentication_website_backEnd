const DB = require('../utils/db');
const bcrypt = require('bcryptjs');
class User{
    firstName;
    lastName;
    email;
    password;
    socialMediaAccount;

    constructor(firstName,lastName,email,password,socialMediaAccount)
    {
        this.firstName = firstName,
        this.lastName = lastName,
        this.email = email,
        this.password = password,
        this.socialMediaAccount = socialMediaAccount

    }
    static async InsertUser(firstName,lastName,email,password,socialMediaAccount){
        console.log('step modal InsertUser :>> ');
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = await bcrypt.hashSync(password,10);
        console.log('this.password :>> ', this.password);
        this.socialMediaAccount = socialMediaAccount;
         return await new DB().InsertUser('Users',{...this});
     }
     static async Login(email,password){
        console.log('step 2:>> ');
        this.email = email;
        let user = await new DB().Login('Users',email);
        console.log('back to step 2 :>> ');
        let passwordMatch = await bcrypt.compareSync(password,user.password);
        if(passwordMatch){
            return user;
        }
        else{
            return false;
        }
     }
}

module.exports = User;