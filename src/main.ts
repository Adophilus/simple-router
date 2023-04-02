import Router from './router'

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router([
    {
      name: 'home',
      path: '/',
      async enter() {
        await import("./examples/components/app.component");
      },
      async render() {
        return '<wc-app></wc-app>'
      }
    },
    {
      name: 'numbers',
      path: /\/numbers\/\d/,
      async render() {
        return 'the current number is actually some random number!'
      }
    }
  ])

  const homeBtn = document.querySelector("#home")
  const numbersBtn = document.querySelector("#numbers")
  const outletContainer = document.querySelector("#outlet")
  let count = 0

  homeBtn?.addEventListener('click', () => {
    router.goto('/')
  })

  numbersBtn?.addEventListener('click', () => {
    router.goto(`/numbers/${++count}`)
  })

  router.onChange(async () => {
    const outlet = router.outlet()
    if (outletContainer)
      outletContainer.innerHTML = outlet
  })

  router.init()
})
