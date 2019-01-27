export function resolveRoutes() {
  let routes = []
  for (let i in this.$router.options.routes) {
    if (!this.$router.options.routes.hasOwnProperty(i)) {
      continue
    }
    let route = this.$router.options.routes[i]
    if (route.hasOwnProperty('title')) {
      routes.push(route)
    }
  }
  return routes
}
