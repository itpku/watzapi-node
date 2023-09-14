const { WhatsAppInstance } = require('../class/instance')
const fs = require('fs')
const path = require('path')
const config = require('../../config/config')
const { Session } = require('../class/session')

const ctrl = require('./message.controller')
const { Outbox } = require("../models/outboox.model")
const { Device } = require("../models/device.model")
const { Text } = require("../models/text.model")

const WorkerBlast = require('../../mywapi/worker-blast')

// exports.Scheduled = async (req, res) => {
//     console.log('Job sedang dijalankan')
//     const worker = new Worker()
//     worker.runJob()
//     var d = "Result goes here..."
//     return res.status(201).json({ error: false, data: d })
// }

exports.Now = (req, res) => {
    const blastId = req.body.blastId;
    const worker = new WorkerBlast()
    worker.blastNow(blastId, null)
    var d = {
        'message': "BlastNow result goes here.................",
        'blastId': blastId,
    }
    return res.status(201).json({ error: false, data: d })
}








exports.test = async (req, res) => {

    try {
        const outboxes = await Outbox.findAll({
            where: {
                status: null
            },
        });
        iterate(outboxes)
        return res.status(201).json({ error: false, data: 'data' })
    } catch (err) {
        console.log(err);
    }
}

function iterate(outboxes) {
    outboxes.forEach(
        async (outbox) => {
            // console.log(outbox.toName)
            const device = await Device.findOne({ where: { phone_no: outbox.from } })
            const text = await Text.findOne({ where: { id: outbox.detail_id } })

            if (device === null) {
                console.log('Not found!');
            } else {
                const key = device.instance_key
                const id = outbox.to + '@s.whatsapp.net'
                const message = text.text
                sendText(key, id, message)
            }
        }
    )
}

async function sendText(key, id, message) {
    const data = await WhatsAppInstances[key].sendTextMessage(
        id,
        message
    )
}

exports.Text = async (req, res) => {
    const key = '254ad560-486b-45d0-b5e1-42d17047ce1b';
    const id = '6281363679955@s.whatsapp.net';
    const message = 'Test 1234';
    const data = await WhatsAppInstances[key].sendTextMessage(
        id,
        message
    )
    return res.status(201).json({ error: false, data: data })
}