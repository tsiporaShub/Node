const express = require('express')
const jwt = require("jsonwebtoken");
const app = express()
const PORT = 6000;

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const cors = require('cors')
const products = require('./controllers/productsController.js');
const categories = require('./controllers/categoryController.js');
const users = require('./controllers/usersController.js');

app.use(cors())
const options = {
    origin: ['http://localhost:3000', 'http://localhost:8080']
}
app.use(cors(options))

app.use((req, res, next) => {
    const date = new Date()
    console.log('time: ', date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds(), 'url: ', req.url)
    next()
})

app.use((req, res, next) => {
    console.log('Request Type:', req.method)
    if ((req.method == "POST" || req.method == "PUT") && JSON.stringify(req.body) === "{}") {
        next('router')
    } else {
        next()
    }
})

app.use(users)

const config = process.env;
app.use((req, res, next) => {
    const token =
        req.body.token || req.query.token || req.headers["token"]
    if (!token) {
        return res.status(403).send("A token is required for authen")
    }
    try {
        const decoded = jwt.verify(token, "790ae206da02412523e500667336d9abdd27b4fcce5227407f968194690da6eaad5efea6db9aeaa5cd67643e878178a62a52fb98268bea83ba65544c710209fc");
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
})

app.use((req, res, next) => {
    next()
})

app.use(products)
app.use(categories)

app.listen(PORT, (error) => {
    if (!error) {
        console.log("http://localhost:6000");
    } else
        console.log("Error occurred, server can't start", error);
});