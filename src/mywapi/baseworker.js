// const { info } = require("../api/controllers/instance.controller")

class Baseworker {

    key = undefined
    type = undefined
    data = undefined
    url = undefined

    constructor(key, type) {
        this.key = key
        this.type = type
    }

    async send(id, detail) { }

    async isOnline(key) {
        // const instance = WhatsAppInstances[req.query.key]
        const instance = WhatsAppInstance[key]
        let data
        data = await instance.getInstanceDetail(req.query.key)
    }


}

module.exports = Baseworker