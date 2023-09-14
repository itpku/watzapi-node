const { WhatsAppInstance } = require('../class/instance')
const fs = require('fs')
const path = require('path')
const config = require('../../config/config')
const { Session } = require('../class/session')

const ctrl = require('./message.controller')
const { Outbox } = require("../models/outboox.model")
const { Device } = require("../models/device.model")
const { Text } = require("../models/text.model")

const WorkerOutbox = require('../../mywapi/worker-outbox')

exports.Message = (req, res) => {
    const outboxId = req.body.outboxId;
    const worker = new WorkerOutbox()
    worker.sendMessage(outboxId)
    var d = {
        'outboxId': outboxId,
        'message': "sendMessage result goes here.................",
    }
    return res.status(201).json({ error: false, data: d })
}

