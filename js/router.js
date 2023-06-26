export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()

    window.history.pushState({}, "", event.target.href)

    this.handle()
  }

  handle() {
    const { pathname } = window.location
    if (pathname === "/") {
      document.querySelector("#home").classList.add("current-page")
      document.querySelector("#universo").classList.remove("current-page")
      document.querySelector("#exploracao").classList.remove("current-page")
    }
    if (pathname === "/universo") {
      document.querySelector("#universo").classList.add("current-page")
      document.querySelector("#exploracao").classList.remove("current-page")
      document.querySelector("#home").classList.remove("current-page")
    }
    if (pathname === "/exploracao") {
      document.querySelector("#exploracao").classList.add("current-page")
      document.querySelector("#home").classList.remove("current-page")
      document.querySelector("#universo").classList.remove("current-page")
    }
    const route = this.routes[pathname] || this.routes[404]
    fetch(route)
      .then((data) => data.text()) //transformou em texto e depois podemos
      .then((html) => {
        document.querySelector("#app").innerHTML = html
      }) //mostrou o html
  }
}
