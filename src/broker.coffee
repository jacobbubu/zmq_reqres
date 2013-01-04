ZMQ = require 'zmq'
Defaults = require './defaults'

module.exports = class Broker
  constructor: ( @options = {} ) ->
    @_initSockets()
    @_bindRouter()
    @_bindDealer()

  _initSockets: ->
    @router = ZMQ.socket "router"
    @dealer = ZMQ.socket "dealer"

  _bindRouter: ->
    endpoint = @options.router or Defaults.routerAddress
    @router.on "message", @_routerRx
    @router.bindSync endpoint

  _bindDealer: ->
    endpoint = @options.dealer or Defaults.dealerAddress
    @dealer.on "message", @_dealerRx
    @dealer.bindSync endpoint

  _routerRx: (envelopes..., payload) =>
    @dealer.send [envelopes, payload]
        
  _dealerRx: (envelopes..., payload) =>
    @router.send [envelopes, payload]

  close: =>
    @dealer.close()
    @router.close()
