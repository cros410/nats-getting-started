const { connect, StringCodec } = require('nats')

const main = async () => {
  const nc = await connect({ servers: 'localhost:4222' })

  // create a codec

  // this subscription listens for `time` requests and returns the current time
  const time = nc.subscribe('time')
  const ping = nc.subscribe('ping')
  listenSubscription(time)
  listenSubscription(ping)
}

async function listenSubscription (sub) {
  console.log(`listening for ${sub.getSubject()} requests [uptime | stop]`)
  const sc = StringCodec()
  for await (const m of sub) {
    console.log(sc.decode(m.data))
    if (m.respond(sc.encode(new Date().toISOString()))) {
      console.info(`[${sub.getSubject()}] handled #${sub.getProcessed()}`)
    } else {
      console.log(`[${sub.getSubject()}] #${sub.getProcessed()} ignored - no reply subject`)
    }
  }
  console.log(`subscription ${sub.getSubject()} drained.`)
}

main()
