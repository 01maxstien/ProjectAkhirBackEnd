const express = require('express')
const { auth } = require('../helpers/auth')
const { beritaController } = require('../controllers')

const router = express.Router()

router.get('/getberita', beritaController.getBerita)
router.get('/getberita/:id', beritaController.getBeritaById)
router.post('/addberita', beritaController.addBerita)
router.put('/editberita/:id', beritaController.editBerita)
router.delete('/deleteberita/:id', beritaController.deleteBerita)


module.exports = router