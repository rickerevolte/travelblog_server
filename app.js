const express = require("express");
const cors = require("cors");

const mockData = require("./mockData.json");

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {

    res.json(mockData);
});

app.get("/location", function (req, res) {
    const getPos = req.query.position;
    const location = mockData[getPos];

    if (location) {
        res.json(location);
    } else {
        res.json("Location not found");
    }
});

app.get("/delete", function (req, res) {
    console.log("THERE WAS A DELETE REQUEST FOR LOCATION")
    const getPos = req.query.position;
    mockData[getPos] = undefined;

    res.json("Location deleted");
});

app.post("/newlocation", function (req, res) {
    console.log("THERE WAS A POST REQUEST FOR NEW LOCATION");
    console.log(req.body);

    mockData.push(req.body);

    res.json("Thanks");
});

app.listen(port, function () {
    console.log(`Running on port ${port}`);
});