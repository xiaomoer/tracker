export function omitRouteRenderProperties(routeConfig: any) {
  const omitList = ['component', 'pageTitle', 'breadcrumb', 'redirect', 'useLayout']
  const copyRoute = { ...routeConfig }
  for (const omitProp of omitList) {
    delete copyRoute[omitProp]
  }
  return copyRoute
}
