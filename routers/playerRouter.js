const express = require('express')
const { auth } = require('../helpers/auth')
const { playerController } = require('../controllers')

const router = express.Router()

router.get('/getplayer', playerController.getPlayer)
router.get('/getplayer/:id', playerController.getPlayerById)
router.post('/addplayer', playerController.addPlayer)
router.put('/editplayer/:id', playerController.editPlayer)
router.delete('/deleteplayer/:id', playerController.deletePlayer)


module.exports = router