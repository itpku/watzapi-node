const { Blast } = require("../api/models/blast.model")
const { BlastTarget } = require("../api/models/blasttarget.model")
const { Device } = require("../api/models/device.model")
const { Text } = require("../api/models/text.model")
var db = require("../config/myconfig");
const { Op } = require('sequelize')
const moment = require('moment');
var { Sequelize } = require("sequelize");
const { info } = require("../api/controllers/instance.controller");
const Baseworker = require("./baseworker");
const { count } = require("../api/models/chat.model");
const { Message } = require("../api/models/message.model");
const TextHandler = require("./text-handler");

class WorkerBlast extends Baseworker {

    constructor() {
        super();
    }

    async runScheduled() {

        var d = new Date();
        var dt = moment();//.format('yyyy-mm-dd hh:mm:ss');
        try {
            const blasts = await Blast.findAll({
                where: {
                    status: null,
                    scheduled_at: {
                        [Op.lt]: dt
                    }
                },
            });
            blasts.forEach(async (blast) => {
                this.blastNow(blast.id, blast);
            });

        } catch (err) {
            console.log(err);
        }
    }

    async blastNow(blastId, blast) {

        try {

            if (blast === null) {
                blast = await Blast.findOne({
                    where: {
                        id: blastId
                    }
                });
            }

            if (blast === null) {
                console.log('Blast not found! id => ' + blastId);
            } else {
                const targets = await BlastTarget.findAll({
                    where: {
                        blast_id: blast.id,
                    },
                });

                if (targets.length > 0) {
                    const device = await Device.findOne({ where: { phone_no: blast.from } });
                    if (device === null) {
                        console.log('Device not found!');
                    } else {
                        // this.iterateTarget(targets, blast, device)
                        this.selectHandler(targets, blast, device)
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    async selectHandler(targets, blast, device) {
        let Detail, handler
        const key = device.instance_key

        switch (blast.type) {
            case 'text':
                Detail = Text;
                handler = new TextHandler(key)
                break;
            default: return;
        }

        Detail.findOne({
            where: {
                id: blast.detail_id
            }
        }).then((detail) => {
            this.iterateTarget(targets, blast, device, handler, detail)
        }).catch((error) => {
            console.log(error);
        });
    }

    async iterateTarget(targets, blast, device, handler, detail) {

        targets.forEach(

            async (target) => {

                const id = target.to
                const data = await handler.send(id, detail);
                const status = 'sent'
                const sentAt = new Date()

                await target.update({
                    'status': status,
                    'sent_at': sentAt,
                })
                await Message.create({
                    // "id": null,
                    "user_id": blast.user_id,
                    "from": device.phone_no,
                    "to": target.to,
                    "toName": target.toName,
                    "status": status,
                    "type": blast.type,
                    "detail_id": blast.detail_id,
                    "group": blast.group,
                    "scheduled_at": blast.scheduled_at,
                    "sent_at": sentAt,
                    // "created_at": null,
                    // "updated_at": null,
                });
            }
        );

        await blast.update({
            'status': 'sent',
            'sent_at': new Date(),
        });
    }

    async updateTarget() { }
    async updateMessage() { }
    async updateBlast() { }

}

module.exports = WorkerBlast
