<script setup>
import { pick, sleep, x } from './tool'
import { getRawAbbreviatedPackument, getPackument } from 'query-registry'
;(async () => {
  return
  const packument = await getPackument({ name: 'react' })
  // await (await fetch(`https://registry.npmjs.org/react/latest`)).json()
  // Output: 'query-registry'
  console.log(packument.name)

  var res = require('child_process')
    .execSync('npm view npm@""6.12.x"" version', { encoding: 'utf-8' })
    .split('\n')
    .filter(Boolean)
  if (res.length) {
    if (res.length === 1) {
      res = res[0]
    } else {
      res = res.pop().split(' ')[1]
    }
    console.log(res.replace(/[']/g, ''))
  }
})()
;(async () => {
  const reqMap = {}
  window.reqMap = reqMap
  async function fetchData(name, level, by) {
    // console.log(level, name, getNameVersion(name))

    const cache = reqMap[name]
    if (cache) {
      const [result, bys] = [...cache.entries()][0]
      bys.push(by) // todo
      return result
    }
    reqMap[name] = new Map()

    const _result = await (
      await fetch(`https://registry.npmjs.cf/${getNameVersion(name)}`)
    ).json()

    let result = _result.dependencies || {}
    // result = _result.devDependencies || {}  //////////////////
    result.__proto__ = null

    reqMap[name].set(result, [by])
    return result
  }
  function getNameVersion(str) {
    if (str.includes('@')) {
      return str.replace('@', '/').replace('^', '')
    }
    if (str.includes('^')) {
      return str.replace('^', '')
    }
    return str + '/latest'
  }

  const dt = [1, 2, 3, [41, 42, 43], 5]
  window.t = async function (params, l = 0) {
    for (const it of params) {
      console.log(l, it)
      await sleep(1000)
      if (Array.isArray(it)) {
        await t(it, l + 1)
      }
    }
  }
  window.ts = async function (params) {
    if (Array.isArray(params)) {
      for (const it of params) {
        await t(it)
        await sleep(1000)
        console.log(it)
      }
    }
  }
  window.ts = async function (params, l = 0) {
    if (Array.isArray(params)) {
      console.log(l, params, '3s')
      await sleep(3000)
      for (const it of params) {
        await t(it, l + 1)
      }
    } else {
      console.log(l, params, '1s')
      await sleep(1000)
    }
  }
  // window.t([dt])

  async function _walk(names, o, level) {
    names = Object.keys(names)
    return
    console.log(level, '`````````walk```````')
    for (const name of names) {
      console.log(level, '```for of```', name)
      await sleep(2000)
      const res = await fetchData(name)
      o[name] = res
      await walk(res, o[name], level + 1)
    }
  }
  async function walk(R, level = 1, by) {
    for (const [depName, depVerison] of Object.entries(R)) {
      const dep = depName + '/' + Object.prototype.valueOf.call(depVerison)
      R[dep] = await fetchData(dep, level, by)
      await walk(R[dep], level + 1, dep)
    }
  }

  const r = await fetchData('yargs@7.1.2')
  await walk(r)
  console.log(99, reqMap, Object.keys(reqMap).length, r, Object.keys(r).length)

  // const p = new Promise(rs => setTimeout(() => rs('setTimeout'), 1000))
  // console.log(1)
  // p.llthen.ll //
  // console.log(2)

  //
})()
</script>

<template>
  <main>1 1</main>
</template>

<style></style>
