export function pick(o, ...keys) {
  return keys.reduce((all, key) => {
    all[key] = o[key]
    return all
  }, {})
}

export const x = 1
