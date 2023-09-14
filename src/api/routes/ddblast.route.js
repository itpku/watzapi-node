const express = require('express')
const controller = require('../controllers/ddblast.controller')
const keyVerify = require('../middlewares/keyCheck')
const loginVerify = require('../middlewares/loginCheck')

const router = express.Router()
// router.route('/scheduled').get(controller.Scheduled)
router.route('/now').post(controller.Now)
// trial only onward
router.route('/test').get(controller.test)
router.route('/text').get(controller.Text)

module.exports = router

