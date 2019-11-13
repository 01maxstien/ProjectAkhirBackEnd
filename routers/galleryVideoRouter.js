const express = require('express')
const { auth } = require('../helpers/auth')
const { galleryVideoController } = require('../controllers')

const router = express.Router()

router.get('/getVideo', galleryVideoController.getVideo)
router.get('/getVideo/:id', galleryVideoController.getVideoById)
router.post('/addVideo', galleryVideoController.addVideo)
router.delete('/deleteVIdeo/:id', galleryVideoController.deleteVideo)

module.exports = router