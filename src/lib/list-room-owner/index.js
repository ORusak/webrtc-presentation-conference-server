/**
 * Библиотека связи комнат и владельцев 
 */
'use strict'

const _ = require('lodash')

class ListRoomOwner {
  constructor () {

    this._map = {}
  }

  has (room) {

    return !_.isNil(this._map[room])
  }

  registrationOwner (room, id) {

    this._map[room] = id

    return null
  }

  leave (room) {

    return Reflect.deleteProperty(this._map, room)
  }

  getRoomByOwnerId (id) {

    return _.reduce(this._map, (result, value, key) => {

      if (id === value) {
        return key
      }

      return result
    }, null)
  }

  getOwnerByRoom (room) {

    return this._map[room]
  }
}

module.exports = ListRoomOwner
