const express = require('express')
const router = express.Router()
const session = require('express-session')
const flash = require('express-flash')
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const User = require('../models/userModel')
const Product = require('../models/productModel')

// Middleware
router.use(cookieParser('secret'))
router.use(session({
    cookie: { maxAge: 600000 },
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}))
router.use(flash())

// Home Page
router.get('/', async (req, res) => {
    const user = req.session.user
    const products = await Product.find({}).sort({ name: 1 }).limit(4)
    res.render('index', { user: user, products: products })
})

// Login Page
router.get('/login', (req, res) => {
    if (req.session.user) return res.redirect('/')
    res.render('login')
})

router.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (email.trim().length == 0 || password.trim().length == 0) {
        req.flash('error', 'Email or password cannot be empty!')
        return res.redirect('/login')
    }
    try {
        const result = await User.findOne({ email: email })
        if (result && await bcrypt.compare(password, result.password)) {
            if (email == 'admin@admin.com') {
                req.session.user = 'admin'
                req.flash('success', 'Login successful!')
                return res.redirect('/admin')
            } else {
                req.session.user = result
                req.flash('success', 'Login successful!')
                return res.redirect('/')
            }
        }
        req.flash('error', 'Invalid credentials!')
        return res.redirect('/login')
    }
    catch (err) {
        console.log(err)
        req.flash('error', 'An error occured! Please try again')
        return res.redirect('/login')
    }
})

// Sign up Page
router.get('/signup', (req, res) => {
    if (req.session.user) return res.redirect('/')
    res.render('signup')
})

router.post('/signup', async (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    if (username.trim().length == 0 || email.trim().length == 0 || password.trim().length == 0 || confirmPassword.trim().length == 0) {
        req.flash('error', 'Sign up failed! Please try again.')
        return res.redirect('/signup')
    }
    else if (username.trim().length > 16 || email.trim().length > 64 || password.trim().length > 16 || confirmPassword.trim().length > 16) {
        req.flash('error', 'Sign up failed! Please try again.')
        return res.redirect('/signup')
    }
    else if (password !== confirmPassword) {
        req.flash('error', 'Passwords do not match!')
        return res.redirect('/signup')
    }
    try {
        const result = await User.findOne({ email: email })
        if (!result) {
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                username: username,
                email: email,
                password: hashedPassword
            })
            newUser.save((err, newUser) => {
                if (err) return console.log(err)
            })
            req.flash('success', 'Account created successfully!')
            return res.redirect('/')
        }
        req.flash('error', 'Email address already exists!')
        return res.redirect('/signup')
    }
    catch (err) {
        console.log(err)
        req.flash('error', 'An error occured! Please try again.')
        res.redirect('/signup')
    }
})

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return console.log(err)
        return res.redirect('/')
    })
})

// Profile Page
router.get('/profile', (req, res) => {
    if (!req.session.user) return res.redirect('/')
    const user = req.session.user
    if (user == 'admin') {
        res.redirect('/admin')
    } else {
        res.render('profile', { user: user })
    }
})

// Cart Page
router.get('/cart', (req, res) => {
    if (!req.session.user) return res.redirect('/')
    const user = req.session.user
    res.render('cart', { user: user })
})

// Delete Cart Item
router.get('/cart/:game', async (req, res) => {
    if (!req.session.user) return res.redirect('/cart')
    const user = req.session.user
    try {
        if (req.params.game) {
            const product = await Product.findOne({ name: req.params.game })
            if (product) {
                const game = await User.updateOne({ email: user.email }, { $pull: { cart: { name: product.name, title: product.title, description: product.description, price: product.price } } })
                if (game) {
                    req.session.user = await User.findOne({ email: user.email })
                    res.redirect('/cart')
                }
            }
            else {
                res.redirect('/')
            }
        }
        else {
            res.redirect('/')
        }
    }
    catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

module.exports = router