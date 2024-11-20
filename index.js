const express = require("express");
const app = express();

    //routes - to run this app in a browser 
//home route
app.get('/', (req, res) => {
    res.send("Welcome to homepage!")
})






app.listen(3030, () => {
    console.log("CRUD API is running on port 3030");
})