import React from 'react'
import Router from './router'
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router'
import dva from './utils/dva'
import dayjs from 'dayjs'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import 'antd/dist/antd.css'
import models from './new-models'
import flatten from 'lodash/flatten'

dayjs.locale('zh-cn')

const createHistory = require('history').createBrowserHistory
export const history = createHistory()
export const routerReducer = connectRouter(history)
export const routerMiddlewareForDispatch = routerMiddleware(history)

export const app = dva({
  models: flatten(models),
  initState: {},
  extraReducers: { router: routerReducer },
  onAction: [routerMiddlewareForDispatch],
})

const f: React.FC = app.start(
  <ConnectedRouter history={history}>
    <ConfigProvider locale={zhCN}>
      <Router />
    </ConfigProvider>
  </ConnectedRouter>,
)

export default f
