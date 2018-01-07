/**
 * Контроллер для обработки отключения владельца комнаты
 */
'use strict'

const Controller = require('_/lib/controller')

//  связь комнат и владельцев 
const listRoomOwner = require('_/instance/list-owner-room')

module.exports = new Controller({
  name: 'disconnect',
  main (ctx) {
    const { socket, log } = ctx
    const id = socket.id
    
    log.info(`[${this.tag}] Socket`, {id})

    const room = listRoomOwner.getRoomByOwnerId(id)
    const isOwner = room !== null

    if (isOwner) {
      listRoomOwner.leave(room)

      log.info(`[${this.tag}] Room owner disconnected. Room clear.`)

      return null
    }

    log.info(`[${this.tag}] Room visitor disconnected`)
  }
})
