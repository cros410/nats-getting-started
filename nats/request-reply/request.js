const { connect, Empty, StringCodec } = require('nats')

const main = async () => {
  const nc = await connect({ servers: 'localhost:4222' })
  console.log('connected')
  const sc = StringCodec()
  await nc
    .request('time', Empty, { timeout: 10000 })
    .then(m => {
      console.log(`got response: ${sc.decode(m.data)}`)
    })
    .catch(err => {
      console.log(`problem with request: ${err.message}`)
    })

  await nc.close()
}

main()
