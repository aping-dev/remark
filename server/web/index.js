// 避免循环依赖
// https://www.yangyang.cloud/blog/2016/06/28/nodejs-circular-dependencies/
const Module = module.exports

const https = require('https');
const fs = require('fs');
const express = require('express')
const next = require('next')
const SocketIO = require('socket.io')

const CONFIG = require('../config')
const log = require('../logger')
const routes = require('./routes')

const backend = express()
backend.disable('x-powered-by')
backend.use('/api', routes.ApiRouter)

const frontend = next({dev: false, dir: 'client'})
const frontendHandler = frontend.getRequestHandler()

backend.get('*', (req, res) => frontendHandler(req, res))

const server = https.createServer({
  cert: fs.readFileSync(CONFIG.CERT_PATH),
  key: fs.readFileSync(CONFIG.KEY_PATH),
}, backend)

const io = SocketIO(server, {
  transports: ['polling', 'websocket'],
})

io.on('connection', (socket) => {
  log.debug('a user connected')
  console.log('a user connected')
})

async function start() {
  const port = CONFIG.PORT
  await server.listen(port)
  log.info(`Server listening on port ${port}!`)
  console.log(`Server listening on port ${port}!`)
}

Module.io = io
Module.start = start
