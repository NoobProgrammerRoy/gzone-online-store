const express = require('express')
const router = express.Router()
const session = require('express-session')
const Product = require('../models/productModel')
const User = require('../models/userModel')

// Display All Games
router.get('/', async (req, res) => {
    const user = req.session.user
    const products = await Product.find().sort({ name: 1 })
    res.render('products', { user: user, products: products })
})

// Search Individual Game
router.post('/', async (req, res) => {
    const user = req.session.user
    try {
        const product = await Product.findOne({ title: req.body.product })
        if (product) {
            res.redirect(`/products/${product.name}`)
        } else {
            res.redirect('/products')
        }
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

//Add Review to Product-item
router.post('/review/:game', async (req, res) => {
  if (!req.session.user) return res.redirect(`/login`)
  const user = req.session.user
  console.log(req.params.game);
  try {
      if (req.params.game) {
          const product = await Product.findOne({ name: req.params.game })
          if (product) {
              console.log(req.body.review);
              const game = await Product.updateOne({ name: req.params.game }, { $push: { reviews: { username: user.username, comment: req.body.review } } })
              //console.log(product);
              res.redirect(`/products/${req.params.game}`)
          }
          else {
              res.redirect('/products')
          }
      }
      else {
          res.redirect('/products')
      }
  }
  catch (err) {
      console.log(err)
      res.redirect('/')
  }
})



// Individual Game Page
router.get('/:game', async (req, res) => {
    const user = req.session.user
    try {
        if (req.params.game) {
            const product = await Product.findOne({ name: req.params.game })
            if (product) {
                res.render('product-items', { user: user, product: product })
            }
            else {
                res.redirect('/products')
            }
        }
        else {
            res.redirect('/products')
        }
    }
    catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

// Adding Items to Cart
router.get('/cart/add/:game', async (req, res) => {
    if (!req.session.user) return res.redirect(`/products/${req.params.game}`)
    const user = req.session.user
    try {
        if (req.params.game) {
            const product = await Product.findOne({ name: req.params.game })
            if (product) {
                const game = await User.updateOne({ email: user.email }, { $push: { cart: { name: product.name, title: product.title, description: product.description, price: product.price } } })
                if (game) {
                    req.session.user = await User.findOne({ email: user.email })
                    res.redirect(`/products/${req.params.game}`)
                }
            }
            else {
                res.redirect('/products')
            }
        }
        else {
            res.redirect('/products')
        }
    }
    catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

// Deleting Items from Cart
router.get('/cart/remove/:game', async (req, res) => {
    if (!req.session.user) return res.redirect(`/products/${req.params.game}`)
    const user = req.session.user
    try {
        if (req.params.game) {
            const product = await Product.findOne({ name: req.params.game })
            if (product) {
                const game = await User.updateOne({ email: user.email }, { $pull: { cart: { name: product.name, title: product.title, description: product.description, price: product.price } } })
                if (game) {
                    req.session.user = await User.findOne({ email: user.email })
                    res.redirect(`/products/${req.params.game}`)
                }
            }
            else {
                res.redirect('/products')
            }
        }
        else {
            res.redirect('/products')
        }
    }
    catch (err) {
        console.log(err)
        res.redirect('/')
    }
})


//Buying the game
router.get('/cart/buy/:game', async (req, res) => {
    if (!req.session.user) return res.redirect(`/products/${req.params.game}`)
    const user = req.session.user
    try {
        if (req.params.game) {
            const product = await Product.findOne({ name: req.params.game })
            if (product) {
                const game = await User.updateOne({ email: user.email }, { $push: { owned: { name: product.name } } })
                if (game) {
                    req.session.user = await User.findOne({ email: user.email })
                    res.redirect(`/products/cart/remove/${req.params.game}`)    //remove from cart after buy
                }
            }
            else {
                res.redirect('/products')
            }
        }
        else {
            res.redirect('/products')
        }
    }
    catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

module.exports = router
