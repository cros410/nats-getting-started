const sc = require('node-nats-streaming').connect(
  'stan',
  'TEST-PTEST',
  'nats://localhost:4222')
 
sc.on('connect', () => {
  // Simple Publisher (all publishes are async in the node version of the client)
  sc.publish('TEST', JSON.stringify({
    eventId: '123-123-123',
    data: {
      msg: 'MIO2'
    }
  }), (err, guid) => {
    if (err) {
      console.log('publish failed: ' + err)
    } else {
      console.log('published message with guid: ' + guid)
    }
  })

})
 
sc.on('close', () => {
  process.exit()
})