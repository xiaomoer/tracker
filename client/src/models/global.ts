import { Model } from 'wbd-frontend-kit'
export const namespace = 'global'

export interface IState {
  message: string
}

const initState: IState = {
  message: 'this is from global models',
}

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
