'use strict'

const socketRouter = require('./router/socket')

module.exports = function init () {
  try {
    return appInit()
  } catch (error) {
    console.log.error('[App] Error on init application: ', error, error.stack)

    throw new Error('[App] Error init express app')
  }
}

async function appInit () {
  return socketRouter
}
