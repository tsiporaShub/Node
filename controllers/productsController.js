
const fs = require('fs');
const fsPromises = require('fs').promises;

const app = require('express').Router();
const bodyParser = require('body-parser');
const { log } = require('console');

const category_model = require("../DB/categories.js");

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))


async function requireProducts() {

    app.get('/product/:category',async (req, res) => {
        const products=await category_model.find();
        arr = products.find(p => p.category === String(req.params.category));
        if (!arr) {
            res.status(404).send('Category not found')
            return;
        }
        arr=arr.products;
        res.send(arr.toSorted((a, b) => a.name.localeCompare(b.name)));
    });

    app.get('/product/:category/:id',async (req, res) => {
        const products=await category_model.find();
        arr = products.find(p => p.category === req.params.category);
        if (!arr) {
            res.status(404).send('Category not found')
            return;
        }
        arr=arr.products;      
        const id = Number(req.params.id);
        const product = arr.find(product => product.id === id);
        if (!product) {+
            res.status(404).send('product not found')
        }
        res.send(product);
    });

    app.post('/product/:category',async (req, res) => {
        const{Product}=require('../models/Product');
        let p=new Product(Number(req.body.id),req.body.name);
        p.save(req,res);
    })

    app.delete('/product/:category/:id',async (req, res) => {
        try {
            const products=await category_model.find()
            let arr = products.find(p => p.category === req.params.category);
            if (!arr) {
                res.status(404).send('Category not found')
                return;
            }
            arr=arr.products;
            const id = req.params.id;
            arr=arr.filter(e=>e.id != id);
            await category_model.updateOne({
                category:req.params.category
            }, {
                $set: {
                    products:arr
                }
            })
        } catch (err) {
            console.error(err);
        }
        res.send('Delete!');
    })

    app.put('/product/:category',async (req, res) => {
        try {
            const products=await category_model.find();
            arr = products.find(p => p.category === req.params.category);
            if (!arr) {
                res.status(404).send('Category not found');
                return;
            }
            arr=arr.products;
            let id = Number(req.body.id);
            let data = req.body;
            let product = arr.find(p => p.id === id);
            if (product == null) {
                console.log('the product not found');
            }
            product.name != null && data.name != null ? product.name = data.name : console.log('name was not updated');
            await category_model.updateOne({
                category:req.params.category
            }, {
                $set: {
                    products:arr
                }
            })
            res.send('Update: '+JSON.stringify(product));
        } catch (err) {
            res.send('error!!!');
        }
    })

}

requireProducts()

module.exports = app;