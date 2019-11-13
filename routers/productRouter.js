const express = require('express')
const { auth } = require('../helpers/auth')
const { productController } = require('../controllers')

const router = express.Router()

router.get('/getproduct', productController.getProduct)
router.get('/getproduct/:id', productController.getProductById)
router.post('/addproduct', productController.addProduct)
router.put('/editproduct/:id', productController.editProduct)
router.delete('/deleteproduct/:id', productController.deleteProduct)
router.post('/addimageproduct', productController.addImageProduct)
router.get('/imageproduct/:id', productController.getImageProductByCategoryId)
router.put('/imageproduct/:id', productController.editImageProductById)
router.delete('/imageproduct/:id', productController.deleteImageProductById)

module.exports = router