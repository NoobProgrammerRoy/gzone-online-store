const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/gzone-online-store', { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', err => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established')
})

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true},
    price : { type: String, required: true },
    path: {type: String, required: true}
})

const product = mongoose.model('product', productSchema)
module.exports = product