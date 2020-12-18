import React from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from './config/index'
import RouteWithSubRoutes from './routeWithSubRoute'
import NoDataPage from '@/pages/404'
import ErroryBoundary from '@/components/error-boundary'

const Router: React.FC = () => {
  return (
    <ErroryBoundary>
      <Switch>
        {routes.map(route => {
          return <RouteWithSubRoutes key={route.path} {...route} />
        })}
        <Route component={NoDataPage} />
      </Switch>
    </ErroryBoundary>
  )
}

export default Router
