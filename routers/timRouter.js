const express = require('express')
const { auth } = require('../helpers/auth')
const { timController } = require('../controllers')

const router = express.Router()

router.get('/gettim', timController.getTim)
router.get('/gettim/:id', timController.getTimById)
router.post('/addtim', timController.addTim)
router.put('/edittim/:id', timController.editTim)
router.delete('/deletetim/:id', timController.deleteTim)

module.exports = router