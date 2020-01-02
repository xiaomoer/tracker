import { IConfig, INIT_CONFIG } from './config'

class Tracker {
  private _config: IConfig;
  constructor(config: IConfig) {  
    this._config = Object.assign({}, INIT_CONFIG, config)
  }
  _eventHandler = (e: Event) => {
    this._handleEvent(e)
  }
  regist() {
    const { events } = this._config
    for(let i = 0; i < events.length; i += 1) {
      const eventName = events[i]
      // 不考虑兼容性
      document.body.addEventListener(`on${eventName}`, this._eventHandler)
    }
    return this
  }
  // 移除一个
  removeWith(eventName: string) {
    document.body.removeEventListener(eventName, this._eventHandler)
  }
  _handleEvent(e: Event) {
    const element = <HTMLElement>e.target
    let elem = element
  }
}

export default new Tracker({ events: ['click'] })