/**
 * Перечень пользовательских ошибок
 */

'use strict'

//  todo: Добавить коды ошибок

/**
 * @class
 * Объект не найден
 */
class NotFoundError extends Error {
  constructor (...arg) {
    super(arg)
  }
}

/**
 * @class
 * Превышено время ожидания
 */
class TimeoutError extends Error {
  constructor (...arg) {
    super(arg)
  }
}
/**
 * @class
 * Данные не валидны
 */
class ValidateDataError extends Error {
  constructor (...arg) {
    super(arg)
  }
}


module.exports = {
  NotFoundError,
  TimeoutError,
  ValidateDataError
}
