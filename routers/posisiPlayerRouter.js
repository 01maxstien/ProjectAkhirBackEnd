const express = require('express')
const { auth } = require('../helpers/auth')
const { posisiPlayerController } = require('../controllers')

const router = express.Router()

router.get('/getposisiplayer', posisiPlayerController.getPosisiPlayer)
router.get('/getposisilayer/:id', posisiPlayerController.getPosisiPlayerById)
router.post('/addposisiplayer', posisiPlayerController.addPosisiPlayer)
router.put('/editposisiplayer/:id', posisiPlayerController.editPosisiPLayer)
router.delete('/deleteposisiplayer/:id', posisiPlayerController.deletePosisiPlayer)

module.exports = router