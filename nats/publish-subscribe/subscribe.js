const { connect, StringCodec } = require('nats')

const main = async () => {
  const nc = await connect({ servers: 'localhost:4222' })
  console.log('connected')
  const timeSub = nc.subscribe('time')
  const pingSub = nc.subscribe('ping')
  listenSubscription(timeSub)
  listenSubscription(pingSub)
}

async function listenSubscription (s) {
  const subj = s.getSubject()
  console.log(`listening for ${subj}`)
  const c = 13 - subj.length
  const pad = ''.padEnd(c)
  for await (const m of s) {
    const sc = StringCodec()
    console.log(
      `[${subj}]${pad} #${s.getProcessed()} - ${m.subject} ${
        m.data ? ' ' + sc.decode(m.data) : ''
      }`
    )
  }
}

main()
