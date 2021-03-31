const { connect, StringCodec } = require('nats')

const main = async () => {
  const nc = await connect({ servers: 'localhost:4222' })
  console.log('conect')
  const sc = StringCodec()
  nc.publish('time', sc.encode('world'))
  await nc.drain()
}

main()
