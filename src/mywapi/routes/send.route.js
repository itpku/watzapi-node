const express = require('express')
const controller = require('../controllers/send.controller')
const keyVerify = require('../../api/middlewares/keyCheck')
const loginVerify = require('../../api/middlewares/loginCheck')

const router = express.Router()
router.route('/message').post(controller.Message)
router.route('/messages').post(controller.Messages)

module.exports = router

