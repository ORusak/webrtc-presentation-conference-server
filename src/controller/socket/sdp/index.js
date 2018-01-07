/**
 * Контроллер для обработки обмена SDP пакетами
 *
 * Точка для конвертации пакетов, если клиенты используют разные
 * спецификации.
 */
'use strict'

const Controller = require('_/lib/controller')
const { ValidateDataError } = require('_/lib/error')

//  связь комнат и владельцев
const listRoomOwner = require('_/instance/list-owner-room')

module.exports = new Controller({
  name: 'sdp',
  main (ctx) {
    const { socket, log } = ctx
    const { desc, room } = socket.data

    //  todo: заменить на полную проверку
    const isDataValid = desc && desc.type && room

    if (!isDataValid) {
      throw new ValidateDataError(`[${this.tag}] Data not valid`)
    }

    const type = desc.type

    log.info(`[${this.tag}] Get SDP data`, { id: socket.id, typeSDP: type })

    // если пакет - предложение соединения значит отправляем хозяину комнаты
    // с данными для обратной связи

    //  !!!!!!!!
    //  переработать на признак socket.id === room.owner.id
    if (type === 'offer') {
      const roomOwner = listRoomOwner.getOwnerByRoom(room)

      if (!roomOwner) {
        throw new ValidateDataError(`[${this.tag}] Expected room owner id`)
      }

      log.info(`[${this.tag}] Send SDP data to room owner`, {id: socket.id})

      socket.to(roomOwner).emit('sdp', {
        author: socket.id,
        desc
      })

      return null
    }

    // если пакет - ответ соединения значит отправляем поситителю-инициатору комнаты
    if (type === 'answer') {
      const author = socket.data.author

      if (!author) {
        throw new ValidateDataError(`[${this.tag}] Expected author offer id`)
      }

      socket.to(author).emit('sdp', {
        desc
      })

      return null
    }

    throw new ValidateDataError(`[${this.tag}] Expected desc type equal: offer, answer`)
  }
})
