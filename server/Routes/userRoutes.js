const express = require('express');
const {registerUser, loginUser,  getUser, getUserById, deleteUserById, updateUser, getprofile, updateProfile} = require('../Controller/userController');
const auth = require("../Middleware/Auth")

const route = express.Router();

route.post('/registerUser', registerUser);
route.post('/login', loginUser);
route.get('/getUser', auth, getUser);
route.get('/getUserById/:id', getUserById); // we are using :id to get the user by id from the database
route.delete('/deleteUserById/:id',auth, deleteUserById) // we are using :id to delete the user by id from the database
route.put('/updateuser/:id',auth, updateUser) // we are using :id to update the user by id from the database
route.get('/getprofile',auth, getprofile)
route.put('/updateprofile',auth, updateProfile)

// export the configured router so it can be used by the main application
module.exports = route;
