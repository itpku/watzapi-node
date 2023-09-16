const { WhatsAppInstance } = require('../../api/class/instance')
const fs = require('fs')
const path = require('path')
const config = require('../../config/config')
const { Session } = require('../../api/class/session')

const ctrl = require('../../api/controllers/message.controller')
const { Outbox } = require("../models/outboox.model")
const { Device } = require("../models/device.model")
const { Text } = require("../models/text.model")

const WorkerOutbox = require('../worker-outbox')

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

