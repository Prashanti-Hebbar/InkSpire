const mongoose = require('mongoose');
// mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model your application data and includes built-in type casting, validation, query building, business logic hooks and more.

const MONGO_URL = "mongodb://localhost:27017/mernbe";
// mongodb://localhost:27017 = connection string
// mernbe = database name

const dbconnection = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("Connected to MongoDB");

    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
}

module.exports = dbconnection;
// we are exporting the dbconnection function so that we can use it in other files to establish a connection to the MongoDB database.