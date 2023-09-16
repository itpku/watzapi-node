const express = require('express')
const router = express.Router()
const instanceRoutes = require('./instance.route')
const messageRoutes = require('./message.route')
const miscRoutes = require('./misc.route')
const groupRoutes = require('./group.route')
// Ddy: 20230916
const blastRoutes = require('../../mywapi/routes/blast.route')
const sendRoutes = require('../../mywapi/routes/send.route')

router.get('/status', (req, res) => res.send('OK'))
router.use('/instance', instanceRoutes)
router.use('/message', messageRoutes)
router.use('/group', groupRoutes)
router.use('/misc', miscRoutes)
// Ddy: 20230830
// router.use('/coba', (req, res) => res.send('coba'))
router.use('/blast', blastRoutes)
router.use('/send', sendRoutes)

module.exports = router
