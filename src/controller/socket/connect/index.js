/**
 * Контроллер для логирования нового подключения
 * 
 * server.js на текущий момент не поддерживает event синоним connection.
 * событие connect обрабатывается по особому для инициализации логики роутинга сокетов
 */
'use strict'

const Controller = require('../../../lib/controller')

module.exports = new Controller({
  name: 'connect',
  main (ctx) {
    const { socket, log } = ctx
    
    log.info(`[${this.tag}] New socket`, {id: socket.id})
  }
})
