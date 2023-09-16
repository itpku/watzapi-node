const { Message } = require("./models/message.model")
const { Outbox } = require("./models/outboox.model")
const { Device } = require("./models/device.model")
const { Text } = require("./models/text.model")
const { Blast } = require("./models/blast.model")
var db = require("../config/myconfig");
const { Op } = require('sequelize')
const moment = require('moment');
var { Sequelize } = require("sequelize");
const Baseworker = require("./baseworker");
const { WhatsAppInstance } = require("../api/class/instance");
const TextHandler = require("./text-handler");

class WorkerOutbox extends Baseworker {

    constructor() {
        super()
    }

    async sendMessage(group) {
        try {
            const outboxes = await Outbox.findAll({
                where: {
                    group: group,
                },
            });
            await this.iterateOutbox(outboxes);

        } catch (err) {
            console.log(err);
        }
    }

    async runScheduled() {

        // console.log((new Date()).toLocaleTimeString() + ' => Scheduled job sedang dijalankan')

        var d = new Date();
        var dt = moment();//.format('yyyy-mm-dd hh:mm:ss');
        try {

            const groups = await Outbox.findAll({
                where: {
                    status: null,
                    scheduled_at: {
                        [Op.lt]: dt
                    }
                },
                attributes: [
                    [Sequelize.fn('DISTINCT', Sequelize.col('group')), 'group'],
                ]
            });

            groups.forEach(async (group) => {
                const outboxes = await Outbox.findAll({
                    where: {
                        status: null,
                        group: group.group,
                        scheduled_at: {
                            [Op.lt]: dt
                        }
                    },
                });
                const qty = outboxes.length
                await this.iterateOutbox(outboxes);
                await this.updateBlast(group.group, qty)
            });

        } catch (err) {
            console.log(err);
        }
    }

    async iterateOutbox(outboxes) {

        let prevGroup
        let device
        let detail
        let handler
        let status
        let remark
        let data

        outboxes.forEach(async (outbox) => {

            if (outbox.group !== prevGroup) {
                const x = await this.mkHandler(outbox)
                device = x.device
                handler = x.handler
                detail = x.detail
            }

            if (!device) {
                remark = "No device"
            } else {
                if (!handler) {
                    remark = "No handler"
                } else
                    if (!detail) {
                        remark = "No detail"
                    } else {
                        status = 'sent'
                        data = handler.send(outbox.to, detail)
                    }
            }

            outbox.update({
                'status': status,
                'remark': remark,
                'sent_at': new Date(),
            });

            // relocate ke messages table
            await Message.create({
                // "id": outbox.id,
                "user_id": outbox.user_id,
                "from": outbox.from,
                "to": outbox.to,
                "toName": outbox.toName,
                "status": outbox.status,
                "type": outbox.type,
                "detail_id": outbox.detail_id,
                "group": outbox.group,
                "remark": outbox.remark,
                "scheduled_at": outbox.scheduled_at,
                "sent_at": outbox.sent_at,
                "created_at": outbox.created_at,
                "updated_at": outbox.updated_at,
            });

            await Outbox.destroy({
                where: {
                    id: outbox.id
                }
            });

            prevGroup = outbox.group

        })

    }

    async mkHandler(outbox) {
        const device = await Device.findOne({ where: { phone_no: outbox.from } })
        let detail
        let handler
        switch (outbox.type) {
            case 'text':
                detail = await Text.findOne({ where: { id: outbox.detail_id } })
                handler = new TextHandler(device.instance_key)
                break;
            default: return;
        }
        const result = {
            device: device,
            detail: detail,
            handler: handler
        }
        return result
    }

    async updateBlast(group, qty) {
        var blast = await Blast.findOne({ where: { group: group } })
        if (blast !== null) {
            blast.update({
                status: "closed",
                sent_at: new Date(),
                qty: qty
            })
        }
    }

}

module.exports = WorkerOutbox
