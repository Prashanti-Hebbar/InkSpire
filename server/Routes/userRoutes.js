const express = require('express');
const {registerUser, loginUser,  getUser, getUserById, deleteUserById, updateUser, getprofile, updateProfile,updateUserRole} = require('../Controller/userController');
const { authuser, adminMiddleware } = require("../Middleware/Auth")

const route = express.Router();

route.post('/registerUser', registerUser);
route.post('/login', loginUser);
route.get('/getUser', authuser, adminMiddleware, getUser);
route.get('/getUserById/:id', getUserById); // we are using :id to get the user by id from the database
route.delete('/deleteUserById/:id',authuser, adminMiddleware, deleteUserById) // we are using :id to delete the user by id from the database
route.put('/updateuser/:id',authuser, adminMiddleware, updateUser) // we are using :id to update the user by id from the database
route.get('/getprofile',authuser, getprofile)
route.put('/updateprofile',authuser, updateProfile)
route.put('/updateRole/:id', authuser, adminMiddleware, updateUserRole)

// export the configured router so it can be used by the main application
module.exports = route;