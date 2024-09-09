const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URL = 'mongodb://127.0.0.1:27017/voyage';

app.get("/", (req, res) => {
    res.send("Hello");
});

main().then((res) => {
    console.log("Connected to DB");
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(MONGO_URL);
}



app.listen(8080, () => {
    console.log("Listening on port no. 8080");
});

