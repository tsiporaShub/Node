require('dotenv').config()
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const mongoDB = process.env.DATABASE_URL
main().catch((err) => console.log(err))
async function main () {
  await mongoose.connect(mongoDB)
}
const Schema = mongoose.Schema

const users_schema = new Schema({
  email: { type: String },
  name: { type: String },
  password: { type: String },
  dob: { type: String }
})

module.exports = mongoose.model('users_model', users_schema)
