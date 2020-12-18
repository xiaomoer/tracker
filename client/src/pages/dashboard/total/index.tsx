/* eslint-disable @typescript-eslint/no-empty-interface */
import { Card, Col, Row, Skeleton, Statistic } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import styles from './style.module.scss'
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { namespace, IState, IPV, IBehavior } from './model'
import { connect } from 'react-redux'
import { IDispatch } from '@/typings/model'
import moment from 'moment'

interface IProps extends Partial<IState>, IDispatch {
  loading?: boolean
}

function computedStatistics(data: IPV[]) {
  const result = {
    pv: 0,
    uv: 0,
    pvlastTwoDays: [0, 0],
    uvlastTwiDays: [0, 0],
  }
  if (!data) {
    return result
  }
  const lastTwoDays = [
    moment().format('YYYY-MM-DD'),
    moment()
      .subtract(1, 'day')
      .format('YYYY-MM-DD'),
  ]
  for (let record of data) {
    result.pv += record.count
    result.uv += new Set(record.ips).size
    if (record._id === lastTwoDays[0]) {
      result.pvlastTwoDays[0] = record.count
      result.uvlastTwiDays[0] = new Set(record.ips).size
    }
    if (record._id === lastTwoDays[1]) {
      result.pvlastTwoDays[1] = record.count
      result.uvlastTwiDays[1] = new Set(record.ips).size
    }
  }
  return result
}

function computeBehaviorData(data: IBehavior[]) {
  const result = {
    total: 0,
    today: 0,
    yesterday: 0,
  }
  if (!data) {
    return result
  }
  const lastTwoDays = [
    moment().format('YYYY-MM-DD'),
    moment()
      .subtract(1, 'day')
      .format('YYYY-MM-DD'),
  ]
  for (const behavior of data) {
    result.total += behavior.count
    if (behavior._id === lastTwoDays[0]) {
      result.today = behavior.count
    }
    if (behavior._id === lastTwoDays[1]) {
      result.yesterday = behavior.count
    }
  }
  return result
}

function computePercentage(today: number, yesterday: number) {
  if (!yesterday) {
    return 100
  }
  return ((today / yesterday) * 100).toFixed(2)
}

const Total: React.FC<IProps> = ({ pv, dispatch, loading, behaviors }) => {
  useEffect(() => {
    dispatch({ type: `${namespace}/fetchPvData` })
    dispatch({ type: `${namespace}/fetchBehaviorData` })
  }, [])
  const data = useMemo(() => {
    return computedStatistics(pv)
  }, [pv])
  const behavs = useMemo(() => {
    return computeBehaviorData(behaviors)
  }, [behaviors])
  return (
    <div className={styles.container}>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="访问数量统计">
            <Row gutter={16}>
              <Col span={6}>
                <Statistic title="访问数量(PV)" value={data.pv} loading={loading} />
              </Col>
              <Col span={6}>
                <Statistic title="访问数量(UV)" value={data.uv} loading={loading} />
              </Col>
              <Col span={6}>
                <Statistic title="今日新增访问(PV)" value={data.pvlastTwoDays[0]} loading={loading} />
                <Statistic
                  title="较昨日变化(%)"
                  value={computePercentage(data.pvlastTwoDays[0], data.pvlastTwoDays[1])}
                  loading={loading}
                  precision={2}
                  valueStyle={{ color: data.pvlastTwoDays[0] >= data.pvlastTwoDays[1] ? '#3f8600' : '#cf1322' }}
                  prefix={data.pvlastTwoDays[0] >= data.pvlastTwoDays[1] ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  suffix="%"
                />
              </Col>
              <Col span={6}>
                <Statistic title="今日新增访问(UV)" value={data.uvlastTwiDays[0]} loading={loading} />
                <Statistic
                  title="较昨日变化(%)"
                  value={computePercentage(data.uvlastTwiDays[0], data.uvlastTwiDays[1])}
                  loading={loading}
                  precision={2}
                  valueStyle={{ color: data.uvlastTwiDays[0] >= data.uvlastTwiDays[1] ? '#3f8600' : '#cf1322' }}
                  prefix={data.uvlastTwiDays[0] >= data.uvlastTwiDays[1] ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  suffix="%"
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="行为数据统计">
            <Row gutter={16}>
              <Col span={6}>
                <Statistic title="记录行为数" value={behavs.total} />
              </Col>
              <Col span={6}>
                <Statistic title="今日新增行为数" value={behavs.today} />
              </Col>
              <Col span={6}>
                <Statistic
                  title="较昨日变化(%)"
                  value={computePercentage(behavs.today, behavs.yesterday)}
                  loading={loading}
                  precision={2}
                  valueStyle={{ color: behavs.today >= behavs.yesterday ? '#3f8600' : '#cf1322' }}
                  prefix={behavs.today >= behavs.yesterday ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  suffix="%"
                />
              </Col>
              {/* <Col span={6}>
                <Statistic title={} value={706} />
              </Col> */}
            </Row>
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}></Col>
        <Col span={12}></Col>
      </Row>
    </div>
  )
}

const mapStateToProps = models => ({
  pv: models[namespace].pv,
  loading: models.loading.models[namespace],
  behaviors: models[namespace].behaviors,
})

export default connect(mapStateToProps)(Total)
