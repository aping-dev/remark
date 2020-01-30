const fs = require('fs')
const yaml = require('yaml')

const c = yaml.parse(fs.readFileSync('config.yml', 'utf-8'))

const config = {
  'DEBUG': true,
  'PORT': 3000,
  'CERT_PATH': c.CERT_PATH,
  'KEY_PATH': c.KEY_PATH,
  'logDir': '/data/logs',
}

module.exports = config

