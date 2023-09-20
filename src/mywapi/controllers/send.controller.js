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
    const id = req.body.id;
    const worker = new WorkerOutbox()
    worker.sendMessage(id)
    var data = {
        'id': id,
        'message': "sendMessage result goes here.................",
    }
    return res.status(201).json({ error: false, data: data })
}

exports.Messages = (req, res) => {
    const group = req.body.outboxId;
    const worker = new WorkerOutbox()
    worker.sendMessages(group)
    var data = {
        'group': group,
        'message': "sendMessage result goes here.................",
    }
    return res.status(201).json({ error: false, data: data })
}

