import { IRouteConfig } from '../../typing'
import HomePage from '@/pages/home'

const routes: IRouteConfig = {
  path: '/',
  component: HomePage,
  title: '初始页',
  exact: true,
}

export default routes
