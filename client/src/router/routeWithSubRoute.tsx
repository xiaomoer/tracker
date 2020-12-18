import React, { lazy, Suspense } from 'react'
import { Route } from 'react-router-dom'
import Auth from '@/components/auth'
import Loading from '@/components/loading'

// about dynamic import, see the link bleow
// https://github.com/webpack/webpack/issues/6680

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => {
        const isLazyLoad = typeof route.component === 'string'
        const Component = isLazyLoad ? lazy(() => import('../pages' + route.component)) : route.component
        const child = isLazyLoad ? (
          <Suspense fallback={<Loading />}>
            <Component {...props} routes={route.routes} />
          </Suspense>
        ) : (
          <Component {...props} routes={route.routes} />
        )
        return route.auth ? <Auth>{child}</Auth> : child
      }}
    />
  )
}

export default RouteWithSubRoutes
