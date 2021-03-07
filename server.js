const express = require('express')
const server = express()
const path = require('path')
const bodyParser = require('body-parser')
const userRouter = require('./router/userRouter')
const productRouter = require('./router/productRouter')
const adminRouter = require('./router/adminRouter')
const port = process.env.PORT || 3000

// Middleware
server.set('view engine', 'ejs')
server.set('views', path.join(__dirname, 'views'))
server.use(express.static(path.join(__dirname, 'public')))
server.use(bodyParser.urlencoded({extended: true}))
server.use('/', userRouter)
server.use('/products', productRouter)
server.use('/admin', adminRouter)

// Server
server.listen(port, () => {
    console.log('Server is running...')
})