'use strict'

const server = require('server')
const { socket } = server.router

const init = require('_/controller/socket/init')
const connect = require('_/controller/socket/connect')
const disconnect = require('_/controller/socket/disconnect')

//  todo: добавить валидацию входящих/исходящих данных событий сокетов 
//  на основе json schema
module.exports = [
  socket(init.name, init.run),
  socket(connect.name, connect.run),
  socket(disconnect.name, disconnect.run)
]
