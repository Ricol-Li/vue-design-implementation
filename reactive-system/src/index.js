const bucket = new Set()

const data = {
  text: 'Hello World',
}

let activeEffect
function effect(fn) {
  activeEffect = fn
  fn()
}

const obj = new Proxy(data, {
  get(target, key) {
    bucket.add(activeEffect)
    return target[key]
  },
  set(target, key, value) {
    target[key] = value
    bucket.forEach(fn => fn())
    return true
  },
})

effect(() => {
  console.log('effect run')
  document.body.innerText = obj.text
})

setTimeout(() => {
  obj.text = 'Hello Vue3'
}, 1000)
