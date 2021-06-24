const { v4: uuidv4 } = require('uuid')
const sc = require('node-nats-streaming').connect(
  'stan',
  'TEST-PTEST-' + uuidv4(),
  'nats://localhost:4222'
)

sc.on('connect', () => {
  const opts = sc
    .subscriptionOptions()
    .setDurableName('TEST-LISTEN')
    .setManualAckMode(true)
  const TOPIC = 'SEND_COMPLIANCE_EMAIL'
  const subscription = sc.subscribe(TOPIC, `${TOPIC}-TEST-LISTEN`, opts)
  subscription.on('message', msg => {
    console.log(
      'Received a message [' + msg.getSequence() + '] ' + msg.getData()
    )
    const event = JSON.parse(msg.getData())
    console.log(event)
    msg.ack()
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
