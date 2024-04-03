const fsPromises = require('fs').promises;
const data_model = require("../DB/categories.js");

class Product{
    id;
    name;
    constructor(id,name){
        this.id=id;
        this.name=name;
    }
    async save(req,res){
        try {
            const products_list=await data_model.find()
            let this_category = products_list.find(p => p.category === req.params.category);
            if (!this_category) {
                res.status(404).send('Category not found')
            }
            let arr;
            products_list.forEach(p => {
                if (p.category === req.params.category) {
                    arr=p.products;
                }
            });
            arr.push(this);
            await data_model.updateOne({
                category:req.params.category
            }, {
                $set: {
                    products:arr
                }
            })

            res.send('saccfully!!!!!!!!!!!!!!!');
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports={Product}