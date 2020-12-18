import React from 'react'
import { Layout, Spin, Menu } from 'antd'
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons'
import { IRouteConfig } from '../../router/typing'
import { Route, Switch } from 'react-router-dom'
import styles from './style.module.scss'
import Images from '@/assets/images'
import RouteWithSubRoutes from '@/router/routeWithSubRoute'
import NoDataPage from '@/pages/404'
import { IDispatch, IDvaLoading } from '@/typings/model'
import { connect } from 'react-redux'
const { Header, Sider, Content } = Layout
interface IProps extends IDispatch, IDvaLoading {
  routes: IRouteConfig[]
  isLogin?: boolean
  userAccount?: string
}

const BasicLayout: React.FC<IProps> = ({ loading, routes }) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={false}>
        <img src={Images.Avatar} alt="" style={{ height: '100px' }} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            nav 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            nav 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            nav 3
          </Menu.Item>
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
