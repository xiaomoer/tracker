import React, { useEffect } from 'react'
import { Layout, Spin, Menu } from 'antd'
import { IRouteConfig } from '../../router/typing'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import styles from './style.module.scss'
// import Images from '@/assets/images'
import RouteWithSubRoutes from '@/router/routeWithSubRoute'
import NoDataPage from '@/pages/404'
import { IDispatch, IDvaLoading } from '@/typings/model'
import { connect } from 'react-redux'
import { BEHAVIOR, ERROR, VISITED, TOTAL } from '@/router/config/dashboard/path'
const { Header, Sider, Content } = Layout
interface IProps extends IDispatch, IDvaLoading {
  routes: IRouteConfig[]
  isLogin?: boolean
  userAccount?: string
}

interface IMenu {
  label: string
  icon?: any
  redirect: string
}

const menus: IMenu[] = [
  {
    label: '总览',
    redirect: TOTAL,
  },
  {
    label: 'PV/UV统计',
    redirect: VISITED,
  },
  {
    label: '行为',
    redirect: BEHAVIOR,
  },
  {
    label: '错误',
    redirect: ERROR,
  },
]

const BasicLayout: React.FC<IProps> = ({ loading, routes }) => {
  const history = useHistory()
  const location = useLocation()
  function handleRedirect(redirect: string) {
    if (!redirect) {
      return
    }
    history.push(redirect)
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={false}>
        <p className={styles.title}>Data Monitoring</p>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
          {menus.map(menu => (
            <Menu.Item key={menu.redirect} onClick={() => handleRedirect(menu.redirect)}>
              {menu.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" />
        <Content className={styles.content}>
          <div id="pageWrap">
            {loading.global && (
              <div className={styles.loading}>
                <Spin tip="加载中..." size="large" />
              </div>
            )}
            <Switch>
              {routes.map(route => (
                <RouteWithSubRoutes key={route.path} {...route} />
              ))}
              <Route component={NoDataPage} />
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = models => ({
  loading: models.loading,
})

export default connect(mapStateToProps)(BasicLayout)
