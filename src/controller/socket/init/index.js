/**
 * Контроллер события инициализации комнаты.
 * 
 * В первичной реализации устанавливает хозяина комнаты.
 */
'use strict'
const Controller = require('_/lib/controller')

//  связь комнат и владельцев 
const listRoomOwner = require('_/instance/list-owner-room')

function getNameRoom (id) {

  return `presentation_room_${id}`
}

module.exports = new Controller({
  name: 'init',
  main (ctx) {
    const { log, socket } = ctx
    const { room } = ctx.data
    //  генерим имя комнаты с префиксом чтобы было пространство имен
    const nameRoom = getNameRoom(room)

    log.info(`[${this.tag}] Run with room id`, { room })
  
    /**
     * В первичной реализации кто собственник комнаты решает сервер.
     * На основании того кто первый занял комнату.
     * - Владелец в комнате не присутсвует
     * - Владелец тот кто первый заявляет право владения комнатой
     * - Дальнейшие соединения только добавляются в комнату.
     * 
     * На основании этого клиент может определить собственника. В дальнейшем когда 
     * клиент сам будет говорить кто собственник алгоритм можно будет доработать. В 
     * том числе добавить проверку прав собственности.
     */

    const isOwnerEmpty = !listRoomOwner.has(room)

    //  если владельца нет, то регистрируем свое право
    if (isOwnerEmpty) {
      listRoomOwner.registrationOwner(room, socket.id)

      log.info(`[${this.tag}] Registration as owner room`, { room })
      socket.emit('message', `Registration as owner room [${room}]`)
      socket.emit('init', {
        type: 'owner'
      })
      
      return null
    }

    //  если уже занято, то заходим в комнату
    socket.join(nameRoom, () => {
      log.info(`[${this.tag}] Registration as room visitor`, { room })
      socket.emit('message', `Registration as room visitor [${room}]`)
      socket.emit('init', {
        type: 'visitor'
      })
    })
  }
})
