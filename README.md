# ZMQ request/response model implementation #

## Install ##

`npm install zmq_reqres`

`cake build;coffee ./example/test`

## Example ##

```coffeescript
# Start broker
Broker = require '../lib/broker'
broker = new Broker()

# Start responder
Responder = require '../lib/responder'
responder = new Responder()

Sender = require '../lib/sender'
sender = new Sender()

totalCount = 1
count = 0

# 'Reverse' is a system worker for testing purpose
for i in [0...totalCount]
  data = "Hello: #{i}"
  handle = sender.send 'Reverse', data

  handle.on "submit", =>
    console.log "Submitted: %s", handle.id

  handle.on "complete", (data) =>
    count++
    console.log "Completed: %s (%s)", data.handle.id, data.result
    if count is totalCount
      console.log 'Total count:', count
      process.exit(0)

  handle.on "error", (error) =>
    count++
    console.error "Failed: %s (%s)", data.handle.id, error
    if count is totalCount
      console.log 'Total count:', count
      process.exit(0)
```