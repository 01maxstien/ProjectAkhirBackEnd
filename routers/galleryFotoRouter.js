const express = require('express')
const { auth } = require('../helpers/auth')
const { galleryFotoController } = require('../controllers')

const router = express.Router()

router.get('/getFoto', galleryFotoController.getFoto)
router.get('/getFoto/:id', galleryFotoController.getFotoById)
router.post('/addFoto', galleryFotoController.addFoto)
router.delete('/deleteFoto/:id', galleryFotoController.deleteFoto)

module.exports = router