const express = require('express');
const dbconnection = require('./db');
const cors = require('cors');

// express is a web framework which is responsible to handle incoming request and send response to the client

const app = express();
// app is an instance of express which we will use to define our routes and middleware and handle incoming requests and send response to the client

const PORT = 3000;
// port number on which our server will listen for incoming requests

// we will use app.listen() method to start our server and listen for incoming requests on the specified port number
// the callback function is executed when the server starts successfully and is ready to handle incoming requests
app.listen(PORT, ()=>{
    console.log(`server is running on port number ${PORT}`)
})

dbconnection();

// we will use app.get() method to define a route for our API endpoint and handle incoming (post,put,get,delete) requests to that endpoint
// /apitest is the endpoint for our API and the callback function is executed when a request is made to that endpoint and we will send a response back to the client using res.send() method
app.get('/apitest',(req, res)=>{
    res.send("API is working fine") // response text from server
})

// enable CORS so the Vite dev server can proxy or clients on other origins may access
app.use(cors())
// parse JSON bodies
app.use(express.json())

// register API route modules
app.use('/user', require('./Routes/userRoutes')) // user-related endpoints
app.use('/product', require('./Routes/productRoutes')) // product-related endpoints
app.use('/category', require('./Routes/categoryRoutes'));
app.use('/uploads', express.static('./uploads')) // serve uploaded images from the 'Uploads' directory
app.use("/admin", require("./Routes/adminRoutes"))
app.use("/booking", require('./Routes/bookingRoute'))