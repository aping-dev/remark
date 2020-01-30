const express = require('express')
const bodyParser = require('body-parser')

const log = require('../../logger')
const api = require('../../api')

const ApiRouter = express.Router()

// middleware that is specific to this router
ApiRouter.use((req, res, next) => {
  const startTime = Date.now()
  function afterResponse() {
    let duration = Date.now() - startTime
    console.log(`${res.statusCode} ${req.method} ${req.originalUrl} [${duration} ms]`)
    //log.info(`${res.statusCode} ${req.method} ${req.originalUrl} [${duration} ms]`)
  }
  res.on('finish', afterResponse);
  res.on('close', afterResponse);
  next()
})

ApiRouter.use(bodyParser.json())

/*
 * api route
 */
ApiRouter.put('/', async (req, res) => {
  const command = req.query.command
  const params = req.body
  try {
    controller = api[command+'Ctrl']
    const result = await controller.run(params, {}, {user: req.user})
    res.json({
      'code': 'SUCCESS',
      'message': `API '${command}' Success`,
      'data': result,
    })
  } catch(err) {
    if (err.name == 'API_ERROR') {
      res.json({'code': err.code, 'message': `API '${command}' Failure: ${err.message}`, 'data': {}})
    }
    else {
      log.error(err)
      res.json({'code': 'UNKNOWN_FAILURE', 'message': `API '${command}' Unknown Failure`,'data': {}})
    }
  }
})

module.exports = ApiRouter
