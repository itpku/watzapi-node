const dotenv = require('dotenv')
const mongoose = require('mongoose')
const logger = require('pino')()
dotenv.config()

const app = require('./config/express')
const config = require('./config/config')

const { Session } = require('./api/class/session')
const connectToCluster = require('./api/helper/connectMongoClient')

// Ddy
const schedule = require('node-schedule')
// const WorkerBlast = require('./mywapi/worker-blast')
const ObxBlast = require('./mywapi/worker-outbox')
const WorkerOutbox = require('./mywapi/worker-outbox')
const worker = new WorkerOutbox()
const job = schedule.scheduleJob('*/2 * * * * *', function () {
    // console.log((new Date()).toLocaleTimeString() + ' => Scheduled job sedang dijalankan')
    // 20230911, ubah menjadi send outbox
    // ...
    worker.runScheduled()
});

let server

if (config.mongoose.enabled) {
    mongoose.set('strictQuery', true);
    mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
        logger.info('Connected to MongoDB')
    })
}

server = app.listen(config.port, async () => {
    logger.info(`Listening on port ${config.port}`)
    global.mongoClient = await connectToCluster(config.mongoose.url)
    if (config.restoreSessionsOnStartup) {
        logger.info(`Restoring Sessions`)
        const session = new Session()
        let restoreSessions = await session.restoreSessions()
        logger.info(`${restoreSessions.length} Session(s) Restored`)
    }
})

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed')
            process.exit(1)
        })
    } else {
        process.exit(1)
    }
}

const unexpectedErrorHandler = (error) => {
    logger.error(error)
    exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
    logger.info('SIGTERM received')
    if (server) {
        server.close()
    }
})

module.exports = server
