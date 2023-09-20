const { info } = require("../../../api/controllers/instance.controller");
const { Text } = require("../../models/text.model");
const Baseworker = require("../../baseworker");
const multer = require("multer")
const axios = require("axios")
const FormData = require("form-data")
const fs = require("fs")

class MediaSender extends Baseworker {

    constructor(key, type) {
        super(key, type)
        this.url = "http://localhost:3333/message/" + type // this.url = "http://localhost:3333/message/image"
    }

    async send(id, detail) {

        const fn = "/var/www/watzapi/watzapi/storage/media" + "/" + detail.file

        let formData = new FormData()
        let file = fs.createReadStream(fn)
        formData.append('file', file)
        formData.append('id', id)
        formData.append('caption', detail.caption)
        formData.append('filename', detail.filename)

        let config = {
            params: {
                key: this.key,
            },
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
            },
            onUploadProgress: function (progressEvent) {
                let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                console.log(percentCompleted);
            }
        }

        this.data = await axios.post(this.url, formData, config)
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
        return this.data
    }

    async send1(id, detail) {
        let data

        // const file = fs.readFileSync(detail.file, 'utf8')
        try {
            data = await WhatsAppInstances[this.key].sendMediaFile(
                id,
                upload,
                'image',
                detail.caption
            )
        } catch (error) {
            console.log(error)
        }
        return data
    }

}

module.exports = MediaSender