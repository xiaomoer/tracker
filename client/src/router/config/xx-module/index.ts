import { IRouteConfig } from '../../typing'
import Layout from '@/pages/layout'
import XxModule from '@/pages/xx-module'
import { LIST, ADD, MODULE_INDEX } from './path'
const route: IRouteConfig = {
  path: MODULE_INDEX,
  component: Layout,
  title: '布局页title',
  routes: [
    {
      path: LIST,
      component: XxModule.List,
      title: 'list',
      exact: true,
    },

    {
      path: ADD,
      component: XxModule.Add,
      title: 'add',
      exact: true,
    },
  ],
}
export default route
