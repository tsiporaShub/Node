const fs = require('fs');
const fsPromises = require('fs').promises;

const app = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { log } = require('console');

//
const users_model = require("../DB/users.js");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

async function requireCategories() {

    const users_list = await users_model.find()
    console.log(users_list);

    const secret = "790ae206da02412523e500667336d9abdd27b4fcce5227407f968194690da6eaad5efea6db9aeaa5cd67643e878178a62a52fb98268bea83ba65544c710209fc";

    app.post("/login", async(req, res) => {
        try {
            const { email, password } = req.body;
            if (!(email && password)) {
                res.status(400).send("All input is required");
            }
            const user = await users_model.findOne({ email: email });

            console.log(user);

            console.log(password + "--" + user.password + "--" + (await bcrypt.compare(password, String(user.password))));
            if (user && (await bcrypt.compare(password, user.password))) {
                // if (user) {
                console.log("if");
                const token = jwt.sign({ user_id: user._id, email },
                    secret, {
                        expiresIn: "2h",
                    }
                )

                res.status(200).json(token);
            } else {
                console.log("else");
                res.status(400).send("Invalid Credentials");
            }
        } catch (err) {
            console.log(err);
        }
    });

    app.post('/signup', async(req, res) => {
        const hasPassword = await bcrypt.hash(req.body.password, 10);

        const user = {
            email: req.body.email,
            name: req.body.name,
            password: hasPassword,
            dob: req.body.dob
        };

        users_model.insertMany(user)

        res.send(user);
    })
}

requireCategories()

module.exports = app;