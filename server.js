const express = require("express");
const dotenv = require("dotenv").config()
const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.listen(port, () => console.log(`Server started in port ${port}`));
