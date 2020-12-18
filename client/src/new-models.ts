import { importAll } from 'wbd-frontend-kit'

export default [
  importAll(require.context('./pages/', true, /.*model\.ts$/), true),
  importAll(require.context('./models/', true, /.*\.ts$/), true),
]
