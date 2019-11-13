const express = require('express')
const { matchController } = require('../controllers')

const router = express.Router()

router.get('/getmatch', matchController.getMatch)
router.get('/getmatch/:id', matchController.getMatchById)
router.post('/addmatch', matchController.addMatch)
router.put('/editmatch/:id', matchController.editMatch)
router.delete('/deletematch/:id', matchController.deleteMatch)

module.exports = router