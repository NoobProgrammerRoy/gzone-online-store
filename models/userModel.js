const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/gzone-online-store', { useNewUrlParser: true, useUnifiedTopology: true})
const db = mongoose.connection

db.on('error', err => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Established')
})

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email : { type: String, required: true },
    password: { type: String, required: true },
    cart: [{
        name: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: String, required: true }
    }],
    owned: [{
      name: { type: String, required: true },
    }]

})

const user = mongoose.model('user', userSchema)
module.exports = user
