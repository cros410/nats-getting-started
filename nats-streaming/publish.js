const { v4: uuidv4 } = require('uuid')
const sc = require('node-nats-streaming').connect(
  'stan',
  'TEST-PTEST-' + uuidv4(),
  'nats://localhost:4222'
)

sc.on('connect', () => {
  // Simple Publisher (all publishes are async in the node version of the client)
  // const TOPIC = 'RISK_ACCOUNT_VALIDATION_DETECTED'
  const TOPIC = 'COMPANY_CREATED'
  const data = {
    eventId: uuidv4(),
    data: {
      id: '60621a9942311be49c625806'
    }
  }
  // const TOPIC = 'USER_REGISTER_COMPLETED'
  // const data = {
  //   eventId: uuidv4(),
  //   data: {
  //     id: '6074f09ae0212d2cd9718c7f', // cristiano
  //     identityDocumentType: 'DNI',
  //     // fullName: 'CHRISTIAN ANTONIO VALENCIA GUEVARA',
  //     // identityDocumentNumber: '08553134'
  //     fullName: 'MAURICIO VELANDIA',
  //     identityDocumentNumber: '79506193'
  //   }
  // }
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
