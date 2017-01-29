const express = require('express');
const path = require('path');
var logger = require('morgan');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');


var app = express();
var server = require('http').createServer(app);

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

app.use((req, res, next) => { //allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    // res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Origin", "http://vps365877.ovh.net/");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

function storage(type) {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/${type}`)
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname)
        }

    })
}

function upload(type) {
    return multer({ storage: storage(type) });
}

// app.post('/upload', upload(req.query.option).single('imageFile'), (req, res) => {
//     res.send(req.file);
// });

app.post('/upload_original', upload('original').single('imageFile'), (req, res) => {
    res.send(req.file);
});

app.post('/upload_processed', upload('processed').single('imageFile'), (req, res) => {
    res.send(req.file);
});

app.get('/image_list', (req, res) => {
    if (req.query.option) {
        fs.readdir(`./uploads/${req.query.option}`, (err, files) => {
            if (err) {
                res.status(500).send('could not retrieve images');
            } else {
                console.log(files);
                res.status(200).send(files);
            }
        })
    } else {
        res.status(400).send('please state options');
    }

})

app.get('/image', (req, res) => {
    if (req.query.option) {
        res.sendFile(req.query.id, {
            root: path.join(__dirname, `./uploads/${req.query.option}/`)
        });
    } else {
        res.status(400).send('please state options');
    }

})

app.delete('/image', (req, res) => {
    if (req.query.option) {
        fs.unlink(`./uploads/${req.query.option}/` + req.query.id, (err) => {
            if (err) return console.log(err);
            res.status(200).send('deleted: ' + req.query.id);
        })
    } else {
        res.status(400).send('please state options');
    }

})

app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: path.join(__dirname, './dist')
    });
});

server.listen(3000, () => {
    console.log("listening on port 3000...")
});