// Generated by CoffeeScript 1.4.0
var Broker, Defaults, ZMQ,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __slice = [].slice;

ZMQ = require('zmq');

Defaults = require('./defaults');

module.exports = Broker = (function() {

  function Broker(options) {
    this.options = options != null ? options : {};
    this._dealerRx = __bind(this._dealerRx, this);

    this._routerRx = __bind(this._routerRx, this);

    this._initSockets();
    this._bindRouter();
    this._bindDealer();
  }

  Broker.prototype._initSockets = function() {
    this.router = ZMQ.socket("router");
    return this.dealer = ZMQ.socket("dealer");
  };

  Broker.prototype._bindRouter = function() {
    var endpoint;
    endpoint = this.options.router || Defaults.routerAddress;
    this.router.on("message", this._routerRx);
    return this.router.bindSync(endpoint);
  };

  Broker.prototype._bindDealer = function() {
    var endpoint;
    endpoint = this.options.dealer || Defaults.dealerAddress;
    this.dealer.on("message", this._dealerRx);
    return this.dealer.bindSync(endpoint);
  };

  Broker.prototype._routerRx = function() {
    var envelopes, payload, _i;
    envelopes = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), payload = arguments[_i++];
    return this.dealer.send([envelopes, payload]);
  };

  Broker.prototype._dealerRx = function() {
    var envelopes, payload, _i;
    envelopes = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), payload = arguments[_i++];
    return this.router.send([envelopes, payload]);
  };

  return Broker;

})();