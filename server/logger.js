const bunyan = require('bunyan')
const RotatingFileStream = require('bunyan-rotating-file-stream')
const CONFIG = require('./config')
const {promisify} = require('util')
const fs = require('fs')
const mkdirAsync = promisify(fs.mkdir)

async function makeLogDir(dir) {
  try {
    await mkdirAsync(dir)
  } catch (err) {
    if (err.code === 'EEXIST') {
      // ingore this error
    }
    else {
      console.log('Error to create folder: ' + err)
    }
  }
}

makeLogDir(CONFIG.logDir)

const logger = bunyan.createLogger({
  name: "remark",
  level: CONFIG.DEBUG ? bunyan.DEBUG : bunyan.INFO,
  //src: CONFIG.DEBUG ? true : false,
  //serializers: bunyan.stdSerializers,
  streams: [{
    stream: new RotatingFileStream({
        type: 'rotating-file',
        path: CONFIG.logDir + '/runner-%Y%m%d.log',
        period: '1d',          // daily rotation 
        totalFiles: 7,         // keep up to 7 back copies 
        rotateExisting: true,  // Give ourselves a clean file when we start up, based on period 
        threshold: '10m',      // Rotate log files larger than 10 megabytes 
        totalSize: '20m',      // Don't keep more than 20mb of archived log files 
        gzip: true,            // Compress the archive log files to save space 
        template: 'runner-%Y%m%d.log' //you can add. - _ before datestamp.
    })
  }]
})

// adding log.child

module.exports = logger

