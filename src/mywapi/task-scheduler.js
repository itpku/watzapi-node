const schedule = require('node-schedule')
const ObxWorker = require('./worker-outbox')
const worker = new ObxWorker()

exports.runTask = function () {

    const job = schedule.scheduleJob('*/2 * * * * *', function () {
        // console.log((new Date()).toLocaleTimeString() + ' => Scheduled job sedang dijalankan')
        worker.runScheduled()
    });

}