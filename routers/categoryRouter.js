const express = require('express')
const { auth } = require('../helpers/auth')
const { categoryController } = require('../controllers')

const router = express.Router()

router.get('/getcategory', categoryController.getCategory)
router.get('/getcategory/:id', categoryController.getCategoryById)
router.post('/addcategory', categoryController.addCategory)
router.put('/editcategory/:id', categoryController.editCategory)
router.delete('/deletecategory/:id', categoryController.deleteCategory)

module.exports = router