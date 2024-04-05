const app = require('express').Router()
const bodyParser = require('body-parser')
const category_model = require('../services/categories.js')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

async function requireCategories() {
    app.get('/category', async(req, res) => {
        const category_list = await category_model.find()
        const arr = []
        category_list.forEach(c => {
            arr.push(c.category)
        })
        res.send(arr.toSorted())
    })

    app.get('/:category/:id', async(req, res) => {
        const category_list = await category_model.find()
        const id = Number(req.params.id)
        const category = category_list.find(c => c.idCategory === id)
        if (!category) {
            res.status(404).send('category not found')
        }
        res.send(category.category)
    })

    app.post('/category', (req, res) => {
        const { Category } = require('../models/Category')
        const c = new Category(Number(req.body.id), req.body.name)
        c.save(req, res)
    })

    app.delete('/category/:id', async(req, res) => {
        try {
            await category_model.deleteOne({ idCategory: req.params.id })
        } catch (err) {
            console.error(err)
        }
        res.send('Delete ' + req.params.id)
    })

    app.put('/category', async(req, res) => {
        try {
            const id = Number(req.body.id)
            const data = req.body
            await category_model.updateOne({
                idCategory: id
            }, {
                $set: {
                    category: data.name
                }
            })
            res.send('Update ' + id)
        } catch (err) {
            res.send('error!!!')
        }
    })
}

requireCategories()

module.exports = app