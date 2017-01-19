const express = require('express');
const path = require('path');
var logger = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');

var app = express();
var router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './dist')));

app.use((req, res, next) => {
    if (req.body)
        console.log("======== BODY ========= \n " +
            JSON.stringify(req.body) +
            "\n=======================");
    next();
});

app.use(function (req, res, next) { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.post("/upload", multer({dest: "uploads/"}).array("imageFile", 1), function(req, res) {
    res.send(req.files);
});

app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './dist')
    });
});

app.listen(3000, () => {
    console.log("listening on port 3000...")
});