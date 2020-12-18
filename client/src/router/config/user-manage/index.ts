import { IRouteConfig } from '../../typing'
import Layout from '@/pages/layout'
import { USER_MANAGEMENT, INDEX, USER_MANAGEMENT_ADD } from './path'

const routes: IRouteConfig = {
  path: INDEX,
  component: Layout,
  title: '模块布局页',
  routes: [
    {
      path: USER_MANAGEMENT,
      component: '/user-manage',
      title: '用户管理',
      exact: true,
    },
    {
      path: USER_MANAGEMENT_ADD,
      component: '/user-manage/add',
      title: '用户管理-新增',
      exact: true,
    },
  ],
}

export default routes
