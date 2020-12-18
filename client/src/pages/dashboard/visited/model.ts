/* eslint-disable @typescript-eslint/no-empty-interface */
import { Model } from 'wbd-frontend-kit'
export const namespace = 'dashboard-visited'

export interface IState {}

const initState: IState = {}

export default {
  namespace,
  state: initState,
  effects: {},
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
} as Model
