import { IRouteConfig } from '../../typing'
import LoginPage from '@/pages/login'
import { LOGIN } from './path'

const routes: IRouteConfig = {
  path: LOGIN,
  component: LoginPage,
  title: '登录页',
  exact: true,
}

export default routes
