/**
 * Класс обертка над контроллерами socket для абстрагирования бизнес логики
 * контроллера от транспорта и добавления слоя общей обработки.
 */
'use strict'

class Controller {
  constructor (options) {
    //  todo: добавить проверку обязательных параметров
    Object.assign(this, options)

    this.tag = `socket.controller.${this.name}`

    this.run = this.run.bind(this)
  }

  async run (ctx) {
    const { log, socket, data } = ctx

    try {
      log.debug('[Controller.Socket] Run', { data, id: socket.id })

      //  основная функция может выполнять как синхронный так и асинхронный код
      //  (с возвратом promise).
      //  требуется обрабатывать оба типа ошибок
      await this.main(ctx, data)
    } catch (error) {
      //  todo: добавить библиотеку для общей обработки ошибок
      log.error('[Controller.Socket]', { data, id: socket.id }, error)
    }
  }
}

module.exports = Controller
