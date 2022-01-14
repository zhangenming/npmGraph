<script setup>
import { pick } from './tool'
;(async () => {
  async function fetchData(name) {
    const d = await (
      await fetch(`https://registry.npmjs.cf/${name}/latest`)
    ).json()

    const result = d.dependencies || {}
    result.__proto__ = null
    return result
    return pick(d, 'dependencies', 'devDependencies')
  }

  function walk(deps, o) {
    Object.keys(deps).map(async dep => {
      const res = await fetchData(dep)
      o[dep] = res
      walk(res, o[dep])
    })
  }

  const RESULT = { __proto__: null }
  const vite = await fetchData('vite')

  console.log(RESULT)

  walk(vite, RESULT)

  setTimeout(() => {
    console.log(RESULT)
  }, 5000)

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
