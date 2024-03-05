const UserModel = require('../models/userModel');
const UsersRoutes = require('express').Router();

UsersRoutes.put('/Register', async (req, res) => {
    try {
        console.log('regi :>> ');
        let {
            fullName,
            email,
            password,
            socialMediaAccount
        } = req.body;
        let data = await UserModel.InsertUser(fullName, email, password, socialMediaAccount);
        console.log('data :>> ', data);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            error
        });
    }
});
UsersRoutes.post('/Login', async (req, res) => {
    try {
        console.log('step 1 :>> ');
        const {
            email,
            password
        } = req.body;
        let user = await UserModel.Login(email, password);
        console.log('back to step 1 :>> ');
        if (user) {
            res.status(200).json({
                fullName: user.fullName,
                email: user.email,
                socialMediaAccount: user.socialMediaAccount
            });
        } else {
            throw error;
        }
    } catch (error) {
        console.log('error :>> ', error);
        res.status(500).json();
    }

});
UsersRoutes.post('/Check', async (req, res) => {
    try {
        console.log('step 1 :>> ');
        const {
            email
        } = req.body;
        let resEmail = await UserModel.Check(email);
        console.log('back to step 1 :>> ');
        if (resEmail) {
            res.status(200).send(resEmail);
        } else {
            res.status(404).send(!resEmail);
        }
    } catch (error) {
        console.log('error :>> ', error);
        res.status(500).json();
    }

});
module.exports = UsersRoutes;