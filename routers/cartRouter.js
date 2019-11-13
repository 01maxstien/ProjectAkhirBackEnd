const express = require('express')
const { auth } = require('../helpers/auth')
const { cartController } = require('../controllers')

const router = express.Router()

router.get('/getcart', cartController.getCart)
router.get('/getcart/:id', cartController.getCartById)
router.get('/getcartoutjoin', cartController.getCartWithoutJoin)
router.post('/addcart', cartController.addcart)
router.put('/editcart/:id', cartController.editCart)
router.delete('/deletecart/:id', cartController.deleteCart)


module.exports = router