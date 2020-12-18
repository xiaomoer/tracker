/* eslint-disable @typescript-eslint/no-empty-interface */
import request from '@/utils/request'
import { Model } from 'wbd-frontend-kit'
export const namespace = 'dashboard-total'

export interface IPV {
  _id: string
  count: number
  ips: string[]
}

export interface IBehavior {
  _id: string
  count: number
  urls: string[]
}

export interface IState {
  pv: IPV[]
  behaviors: IBehavior[]
}

const initState: IState = {
  pv: null,
  behaviors: null,
}

export default {
  namespace,
  state: initState,
  effects: {
    *fetchPvData(_, { call, put }) {
      try {
        const data = yield call(request, {
          url: 'http://localhost:3001/api/s/pv',
        })
        yield put({ type: 'setState', payload: { pv: data } })
      } catch (error) {}
    },
    *fetchBehaviorData(_, { call, put }) {
      try {
        const data = yield call(request, { url: 'http://localhost:3001/api/r/statistics' })
        yield put({ type: 'setState', payload: { behaviors: data } })
      } catch (error) {}
    },
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
} as Model
