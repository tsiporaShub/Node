const fsPromises = require('fs').promises;
const category_model = require("../DB/categories.js");

class Category{
    idCategory;
    category;
    products=[];

    constructor(idCategory,category){
        this.idCategory=idCategory;
        this.category=category;
    }
    async save(req,res){
        try {
            category_model.insertMany(this);
            res.send('The action succfully');
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports={Category}