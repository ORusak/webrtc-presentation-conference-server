'use strict'

const server = require('server')
const { socket } = server.router

//  todo: заменить на requireAll при разрастании логики
const connect = require('../../controller/socket/connect')
const disconnect = require('../../controller/socket/disconnect')
const init = require('../../controller/socket/init')
const sdp = require('../../controller/socket/sdp')
const ice = require('../../controller/socket/ice')

//  todo: добавить валидацию входящих/исходящих данных событий сокетов 
//  на основе json schema
module.exports = [
  socket(init.name, init.run),
  socket(connect.name, connect.run),
  socket(disconnect.name, disconnect.run),
  socket(sdp.name, sdp.run),
  socket(ice.name, ice.run)
]
