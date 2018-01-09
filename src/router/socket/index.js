'use strict'

const server = require('server')
const { socket } = server.router

//  todo: заменить на requireAll при разрастании логики
const connect = require('_/controller/socket/connect')
const disconnect = require('_/controller/socket/disconnect')
const init = require('_/controller/socket/init')
const sdp = require('_/controller/socket/sdp')
const ice = require('_/controller/socket/ice')

//  todo: добавить валидацию входящих/исходящих данных событий сокетов 
//  на основе json schema
module.exports = [
  socket(init.name, init.run),
  socket(connect.name, connect.run),
  socket(disconnect.name, disconnect.run),
  socket(sdp.name, sdp.run),
  socket(ice.name, ice.run)
]
