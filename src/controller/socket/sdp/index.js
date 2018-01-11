/**
 * Контроллер для обработки обмена SDP пакетами
 *
 * Точка для конвертации пакетов, если клиенты используют разные
 * спецификации.
 */
'use strict'

const _ = require('lodash')

const Controller = require('../../../lib/controller')
const { ValidateDataError } = require('../../../lib/error')
const ExchangeService = require('../../../service/participant-exchange-protocol')

module.exports = new Controller({
  name: 'sdp',
  main (ctx) {
    const { socket, log, data } = ctx

    //  todo: заменить на полную проверку
    //  проверим наличие типа у пакета. пока как проверка того что пакет SDP
    const type = _.get(data, 'payload.desc.type')
    const isDataNotValid = _.isNil(type)

    if (isDataNotValid) {
      throw new ValidateDataError(`[${this.tag}] Data not valid`)
    }

    log.info(`[${this.tag}] Get SDP data`, { id: socket.id, typeSDP: type })

    ExchangeService.send(ctx, 'sdp')
  }
})
