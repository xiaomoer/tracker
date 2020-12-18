/**
 * 对component属性的说明：
 * component可以传入组件和string
 * 传入组件会按照正常情况引入，渲染
 * 如果传入的是string，也就是如果是组件的路径，将会开启基于路由的懒加载，需要注意的是，这里的string是一个相对`@/pages`的相对路径
 * 例如：如果组件位于'@pages/user-manage'，只需要配置component: '/user-manage'即可
 * 所有懒加载的页面必须位于`src/pages`目录下
 */
export interface IRouteConfig {
  path: string
  component: React.ComponentType<any> | string
  title: string
  exact?: boolean
  auth?: boolean
  redirect?: string
  strict?: boolean
  sensitive?: boolean
  routes?: IRouteConfig[]
}
