const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8000;

// Importing routes
const urlShortenerRoute = require("./routes/url-shortener");

// Database connection
const admin = encodeURIComponent(process.env.ADMIN);
const password = encodeURIComponent(process.env.PASSWORD);
const cluster = process.env.CLUSTER;
const mongoDBURI = `mongodb+srv://${admin}:${password}@${cluster}/?retryWrites=true&w=majority`;

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB CONNECTED")
}).catch((error) => {
    console.log("DB CONNECTION FAILED\nLOGS:", error);
})

app.use(cors());
app.use(bodyParser.json());
app.use(urlShortenerRoute);

app.listen(PORT, () => console.log(`app is live at port ${PORT}`));