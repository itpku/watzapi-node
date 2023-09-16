const express = require('express')
const controller = require('../controllers/blast.controller')
const keyVerify = require('../../api/middlewares/keyCheck')
const loginVerify = require('../../api/middlewares/loginCheck')

const router = express.Router()
// router.route('/scheduled').get(controller.Scheduled)
router.route('/now').post(controller.Now)
// trial only onward
router.route('/test').get(controller.test)
router.route('/text').get(controller.Text)

module.exports = router

