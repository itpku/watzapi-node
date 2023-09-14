const express = require('express')
const controller = require('../controllers/ddsend.controller')
const keyVerify = require('../middlewares/keyCheck')
const loginVerify = require('../middlewares/loginCheck')

const router = express.Router()
router.route('/message').post(controller.Message)

module.exports = router

