const express = require('express')
const router = express.Router()
const fileUpload = require('express-fileupload')
const path = require('path')
const Product = require('../models/productModel')

router.use(fileUpload())

// Display Admin Portal
router.get('/', (req, res) => {
    if (!req.session.user || req.session.user !== 'admin') return res.redirect('/')
    res.render('admin', { user: req.session.user })
})

// Upload Game
router.post('/', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.send('Could not upload file')
    }
    try {
        const file = req.files.picture
        const filePath = path.join(__dirname, '../public/img/') + req.body.name + '.jpg'
        file.mv(filePath, err => {
            if (err) return console.log(err)
        })
        const product = new Product({
            name: req.body.name,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            path: filePath
        })
        product.save((err, product) => {
            if (err) return console.log(err)
        })
    } catch (err) {
        console.log(err)
    }
    res.redirect('/admin')
})

module.exports = router