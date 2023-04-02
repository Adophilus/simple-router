import Router from './router'

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router([
    {
      name: 'numbers',
      path: /\/numbers\/\d/,
      render() {
        return 'home'
      }
    }
  ])
  const triggerBtn = document.querySelector("#trigger")
  let count = 0

  triggerBtn?.addEventListener('click', () => {
    router.goto(`/numbers/${++count}`)
  })

  router.onChange(() => {
    console.log(router.outlet)
  })
})
