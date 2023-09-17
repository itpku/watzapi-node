const { info } = require("../api/controllers/instance.controller");
const { Text } = require("./models/text.model");
const Baseworker = require("./baseworker");

class TextHandler extends Baseworker {
    key = null

    constructor(key) {
        super()
        this.key = key
    }

    async send(id, detail) {
        let data
        const message = detail.text
        // console.log(detail)
        console.log("TextHandler::send")
        try {
            data = await WhatsAppInstances[this.key].sendTextMessage(
                id,
                message
            )
        } catch (error) {
            console.log(error)
        }
        return data
    }
}

module.exports = TextHandler