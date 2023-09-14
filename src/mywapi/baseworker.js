// const { info } = require("../api/controllers/instance.controller")

class Baseworker {

    constructor() {
    }

    async isOnline(key) {
        // const instance = WhatsAppInstances[req.query.key]
        const instance = WhatsAppInstance[key]
        let data
        data = await instance.getInstanceDetail(req.query.key)
    }


}

module.exports = Baseworker