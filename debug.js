const getT = () => performance.now()
const origins = getT()
let old = 0
window.sleepSync = (time, name) => {
  return
  // time *= 50
  const start = +new Date()
  console.time(name || time + 'ms')
  while (+new Date() - start < time) {}
  console.timeEnd(name || time + 'ms')
}
window.sleepSync(10, 'start...')

window.sleepAsync = async time => {
  const start = +new Date()
  console.log(+new Date())
  while (+new Date() - start < time) {
    await sleep(1)
  }
  console.log(+new Date())
}
window.sleep = async time => {
  return new Promise(q => setTimeout(q, time))
}
Object.defineProperties(Object.prototype, {
  ll: {
    get() {
      console.log(this)
      return this
    },
  },
  lll: {
    get() {
      return (...args) => {
        console.log(...args, this)
        return this
      }
    },
  },
  llthen: {
    get() {
      this.then?.(e => console.log(e))
      return this
    },
  },
  llawait: {
    async get() {
      console.log('get 1', await this)
      return this
    },
  },
  llawait2: {
    async get() {
      console.log('get 2', await this)
      return await this
    },
  },
  llt: {
    get() {
      // Array(1e2)
      //   .fill()
      //   .map(() => window)
      const now = getT()
      console.log((now - origins).toFixed(1), (now - old).toFixed(1))
      old = now
      return this
    },
  },
  lls: {
    get() {
      console.time()
      return this
    },
  },
  lle: {
    get() {
      console.timeEnd()
      return this
    },
  },
})
