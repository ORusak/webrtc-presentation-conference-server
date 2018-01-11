/**
 * Фукнции для отправки данных между участниками
 */

'use strict'

const { ValidateDataError } = require('../../lib/error')

//  связь комнат и владельцев
const listRoomOwner = require('../../instance/list-owner-room')

const ExchangeService = {

  /**
   * Функция абстрагирует обмен данными от автора к участникам и обратно.
   * Автор только участникам, участники только автору.
   * 
   * @param {object} ctx -
   * @param {object} ctx.socket -
   * @param {object} ctx.data -
   * @param {string} ctx.data.room -
   * @param {string} ctx.data.payload -
   * @param {string} event тип события
   * 
   * @exception {ValidateDataError} не верные данные
   * 
   * @return {null} успешная отправка
   */
  send (ctx, event) {
    const { log, socket, data } = ctx
    const { payload, room } = data
    const isDataValid = !!room

    if (!isDataValid) {
      throw new ValidateDataError(`[ExchangeService] Data not valid`)
    }

    const roomOwner = listRoomOwner.getOwnerByRoom(room)

    if (!roomOwner) {
      throw new ValidateDataError(`[ExchangeService] Expected room owner id`)
    }

    const { id } = socket

    //  если сокет владелец комнаты, то он отправляет данные участнику
    if (id === roomOwner) {
      const { author } = data

      if (!author) {
        throw new ValidateDataError(`[ExchangeService] Expected author id for replay data`)
      }

      log.info(`[ExchangeService] Send data to room visitor`, { id })

      socket.to(author).emit(event, {
        payload
      })

      return null
    } else {
      // если сокет не автор, то отправляем автору комнаты
      log.info(`[ExchangeService] Send data to room owner`, { id })

      socket.to(roomOwner).emit(event, {
        //  добавляем обратную связь
        author: id,
        payload
      })
    }
  }
}

module.exports = ExchangeService
