import { IRouteConfig } from '../../typing'
import Layout from '@/pages/layout'
import Dashboard from '@/pages/dashboard'
import { VISITED, BEHAVIOR, ERROR, MODULE_INDEX, TOTAL } from './path'
const route: IRouteConfig = {
  path: MODULE_INDEX,
  component: Layout,
  title: '布局页title',
  routes: [
    {
      path: TOTAL,
      component: Dashboard.Total,
      title: 'total',
      exact: true,
    },
    {
      path: VISITED,
      component: Dashboard.Visited,
      title: 'visited',
      exact: true,
    },
    {
      path: BEHAVIOR,
      component: Dashboard.Behavior,
      title: 'behavior',
      exact: true,
    },
    {
      path: ERROR,
      component: Dashboard.Error,
      title: 'error',
      exact: true,
    },
  ],
}
export default route
