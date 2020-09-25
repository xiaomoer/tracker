import { IConfig, INIT_CONFIG } from './config'
import {
  getElementPath,
  getRelativePosition,
  genQueryString,
  getBattery,
  getLocation,
  getUserAgentInfo,
} from './utils'
import { DATA_KEY } from './const'
class Tracker {
  private _config: IConfig
  constructor(config: IConfig) {
    this._config = Object.assign({}, INIT_CONFIG, config)
  }
  _eventHandler = (e: Event) => {
    this._handleEvent(e)
  }
  regist() {
    const { events, uploadType } = this._config
    for (let i = 0; i < events.length; i += 1) {
      const eventName = events[i]
      // 不考虑兼容性
      document.body.addEventListener(eventName, this._eventHandler)
    }
    window.addEventListener('beforeunload', () => {
      // 上传基本信息
      this._uploadBaseInfo()
      // 长传行为信息
      this._uploadUnload()
    })
    getBattery()
    getLocation()
    return this
  }
  // 移除一个
  removeWith(eventName: string) {
    document.body.removeEventListener(eventName, this._eventHandler)
  }
  _handleEvent(e: Event) {
    const { uploadType } = this._config
    const element = <HTMLElement>e.target
    const path = getElementPath(element)
    const position = getRelativePosition(e)
    const url = location.href
    const data = {
      nodeName: element.nodeName.toLowerCase(), // 节点
      type: e.type, // 事件类型
      path: encodeURIComponent(path), // css selector
      position, // 相对位置
      url,
    }
    // 直接上传
    if (uploadType === 'immedite') {
      this._upload(data)
    } else {
      // 存储到storage中
      const dataPrev: any[] = JSON.parse(localStorage.getItem(DATA_KEY))
      let result = [data]
      if (dataPrev) {
        result.push(...dataPrev)
      }
      localStorage.setItem(DATA_KEY, JSON.stringify(result))
    }
  }
  _upload(data) {
    const { uploadUrl } = this._config
    let img = new Image(0, 0)
    img.src = `${uploadUrl}/upload?${genQueryString(data)}`
    img.onload = () => {
      img = null
    }
  }
  _uploadUnload() {
    const { uploadUrl } = this._config
    const data = localStorage.getItem(DATA_KEY)
    localStorage.removeItem(DATA_KEY)
    if (!data) return
    navigator.sendBeacon(`${uploadUrl}/upload`, data)
  }
  _uploadBaseInfo() {
    const { uploadUrl } = this._config
    let result = getUserAgentInfo()
    navigator.sendBeacon(`${uploadUrl}/info`, JSON.stringify(result))
  }
}

export default Tracker
