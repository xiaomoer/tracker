export interface IConfig {
  events?: string[] // 监听的事件
  uploadType?: string // 上传的方式
  mode?: string // 模式,
  uploadUrl?: string
}

export const INIT_CONFIG: IConfig = {
  events: ['click'],
  uploadType: 'immedite',
  mode: 'sample'
}
