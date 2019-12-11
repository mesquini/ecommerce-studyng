const express = require('express')
//controllers
const ProductController = require('./controllers/ProductController')
const ProductPhotosController = require('./controllers/ProductPhotosController')

const routers = express.Router()

routers.get('/', (req, res) => {
    return res.json({message: 'Olá, Bem-vindo ao meu primeiro e-commerce'})
})

routers.post('/new-product', ProductController.store)
routers.get('/products', ProductController.index)

routers.post('/new-product/:id_product/photos', ProductPhotosController.store)
routers.get('/product/:id_product', ProductPhotosController.index)

module.exports = routers