export type Route = {
  name: string;
  path: string | RegExp;
  render: () => void;
  enter?: () => void;
};

type OnChangeCallback = (route: Route) => void

class Router {
  routes: Route[] = []
  onChangeCallbacks: OnChangeCallback[] = []
  declare private currentRoute: Route

  constructor(routes: Route[] = []) {
    routes.forEach((route) => this.register(route));

    window.addEventListener("popstate", (event) => {
      console.log(
        `location: ${document.location}, state: ${JSON.stringify(event.state)}`
      );
    });

    const mappedRoute = this.getRoute(window.location.pathname)
    if (mappedRoute) {
      this.changeRoute(mappedRoute, window.location.pathname)
    }
  }

  register(route: Route) {
    this.routes.push(route)
  }

  private getRoute(pathOrName: string): Route | null {
    if (pathOrName.startsWith("/")) {
      const route = this.routes.find(route => {
        if (route.path instanceof RegExp) {
          return route.path.test(pathOrName) ? route : null
        }
        return route.path === pathOrName
      })
      return route ? route : null
    }

    const route = this.routes.find(route => route.name === pathOrName)
    return route ? route : null
  }

  private changeRoute(mappedRoute: Route, path: string) {
    this.currentRoute = mappedRoute
    window.history.pushState({}, mappedRoute.name, path);
    this.onChangeCallbacks.forEach(cb => cb(this.currentRoute))
  }

  goto(route: string) {
    const mappedRoute = this.getRoute(route)

    if (mappedRoute) {
      this.changeRoute(mappedRoute, route)
    }
  }

  onChange(cb: (route: Route) => void) {
    this.onChangeCallbacks.push(cb)
  }

  goBack() {
    window.history.back();
  }

  get outlet() {
    return this.currentRoute.render()
  }
}

export default Router;
