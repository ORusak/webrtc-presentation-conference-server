/**
 * Контроллер для обработки обмена ICE пакетами
 */
'use strict'

const Controller = require('_/lib/controller')
const ExchangeService = require('_/service/participant-exchange-protocol')

module.exports = new Controller({
  name: 'ice',
  main (ctx) {
    const { socket, log } = ctx

    log.info(`[${this.tag}] Get ICE data`, { id: socket.id })

    ExchangeService.send(ctx, 'ice')
  }
})
