'use strict'

const server = require('server')

const config = require('config')
const options = config.get('server')

const appInit = require('./src/app')

async function initServer () {
  const app = await appInit()
  const ctx = await server(options, app)

  ctx
    .log
    .info('[Server] Your server is listening on port %d (http://localhost:%d)', config.server.port, config.server.port)
}

initServer()
