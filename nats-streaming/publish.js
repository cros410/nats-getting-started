const { v4: uuidv4 } = require('uuid')
const sc = require('node-nats-streaming').connect(
  'stan',
  'TEST-PTEST-' + uuidv4(),
  'nats://localhost:4222'
)

sc.on('connect', () => {
  // Simple Publisher (all publishes are async in the node version of the client)
  const TOPIC = 'COMPANY_CREATED'
  // const TOPIC = 'RISK_ACCOUNT_VALIDATION_DETECTED'
  const data = {
    eventId: uuidv4(),
    data: {
      id: '5b3b8e50bb2ab8001ef92b9c',
      ruc: '20448074162',
      socialIdentity:
        'PRODUCTOS ANDINOS DE CALIDAD EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA',
      customerId: '5d262b88d2fd44922ffb4fb8'
    }
  }
  sc.publish(TOPIC, JSON.stringify(data), (err, guid) => {
    if (err) {
      console.log('publish failed: ' + err)
    } else {
      console.log('published message with guid: ' + guid)
      process.exit(0)
    }
  })
})

sc.on('close', () => {
  process.exit()
})

sc.on('error', error => {
  console.error('error')
  console.error(error)
  process.exit(1)
})
