export function pick(o, ...keys) {
  return keys.reduce((all, key) => {
    all[key] = o[key]
    return all
  }, {})
}

export function sleep(t) {
  return new Promise(rs => setTimeout(rs, t))
}

export const x = 1
