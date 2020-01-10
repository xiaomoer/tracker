const typescript = require('@rollup/plugin-typescript')
import { uglify } from 'rollup-plugin-uglify'
export default {
  input: './src/index.ts',
  output: {
    file: 'server/public/tracker.min.js',
    name: 'Tracker',
    format: 'iife'
  },
  plugins: [typescript(), uglify()]
}
