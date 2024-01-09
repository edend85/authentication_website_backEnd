const UserModel = require('../models/userModel');
const UsersRoutes = require('express').Router();

UsersRoutes.put('/Register', async (req, res) => {
    try {
        console.log('regi :>> ');
        let { firstName,lastName,email,password,socialMediaAccount } = req.body;
        let data = await UserModel.InsertUser(firstName,lastName,email,password,socialMediaAccount);
        console.log('data :>> ',data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error });
    }
});
UsersRoutes.post('/Login', async (req, res) => {
    try {
        console.log('step 1 :>> ');
        const {email,password } = req.body;
        let user = await UserModel.Login(email,password);
        console.log('back to step 1 :>> ');
        if(user){
             res.status(200).json({
                firstName:user.firstName,
                lastName:user.lastName,
                email:user.email,
                socialMediaAccount : user.socialMediaAccount
            });
        }
        else{
            throw error;
        }
    } catch (error) {
        console.log('error :>> ', error);
        res.status(500).json();
    }
});
module.exports = UsersRoutes;