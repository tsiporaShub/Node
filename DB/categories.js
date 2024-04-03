const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb://127.0.0.1/data";
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}
const Schema = mongoose.Schema;

const category_schema = new Schema({
    idCategory: { type: Number },
    category: { type: String },
    products: [{ id: { type: Number }, name: { type: String } }]
});

module.exports = mongoose.model("category_model", category_schema);
