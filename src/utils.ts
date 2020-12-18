import { BATTERY_KEY, ERROR_KEY, LOCATION_KEY } from './const'

function getElementIdentifier(elem: HTMLElement) {
  if (!elem) {
    return ''
  }
  if (elem.id) {
    return `#${elem.id}`
  }
  const tagName = elem.tagName.toLowerCase()
  if (elem.className) {
    const classList = elem.className.split(/\s+/)
    return `${tagName}.${classList.join('.')}`
  }
  return tagName
}

export function getElementPath(elem: HTMLElement) {
  const paths: string[] = []
  while (elem) {
    // 当前元素
    let name = getElementIdentifier(elem)
    if (!name) {
      break
    }
    // 确定当前元素的位置
    const { childElementCount, children } = elem.parentElement
    if (childElementCount > 1) {
      for (let i = 0; i < childElementCount; i += 1) {
        const child = children[i]
        if (child === elem) {
          name = `${name}:nth-child(${i + 1})`
          break
        }
      }
    }
    paths.unshift(name)
    // 遍历到了顶层或者当前选择器能够找到本元素
    if (name.includes('body') || document.querySelector(paths.join('>')) === elem) {
      break
    }
    elem = elem.parentElement
  }
  return paths.join('>')
}
/**
 * 获取event发生位置相对当前元素的位置
 * @param e
 */
export function getRelativePosition(e: Event) {
  const elem = e.target as HTMLElement
  const { left, top } = elem.getBoundingClientRect()
  const rootNode = document.documentElement //  根文档
  const scrollLeft = rootNode.scrollLeft
  const scrollTop = rootNode.scrollTop
  return [(e as any).pageX - scrollLeft - left, (e as any).pageY - scrollTop - top]
}

interface IBattery {
  charging: boolean
  chargingTime: number
  dischargingTime: number
  level: number
}
// 获取电量相关数据
export function getBattery() {
  const nav = navigator as any
  let battery: Partial<IBattery>
  battery = nav.battery || nav.mozBattery || nav.webkitBattery
  if (battery) {
    localStorage.setItem(BATTERY_KEY, JSON.stringify(battery))
    return
  }
  if (typeof nav.getBattery === 'function') {
    nav.getBattery().then((data) => {
      const { charging, chargingTime, dischargingTime, level } = data
      const result = { charging, chargingTime, dischargingTime, level }
      localStorage.setItem(BATTERY_KEY, JSON.stringify(result))
    })
  }
}
// 获取连接数据
export function getConnection() {
  const connection = (navigator as any).connection
  if (connection) {
    // 网络类型 预估往返时间，下行速度
    const { effectiveType, rtt, downlink } = connection
    return {
      effectiveType,
      rtt,
      downlink,
    }
  }
  return ''
}

// 获取经纬度
export function getLocation() {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let pos = {
        long: position.coords.longitude,
        lat: position.coords.latitude,
        timestamp: position.timestamp,
      }
      localStorage.setItem(LOCATION_KEY, JSON.stringify(pos))
    })
  }
}
// 加载性能统计
export function getPerformanceTiming() {
  const pt = window.performance.timing
  const startTime = pt.navigationStart
  return {
    redirect: pt.redirectEnd - pt.redirectStart,
    appCache: pt.domainLookupStart - pt.fetchStart,
    dns: pt.domainLookupEnd - pt.domainLookupStart,
    tcp: pt.connectEnd - pt.connectStart,
    ttfb: pt.responseStart - pt.requestStart,
    downloaded: pt.responseEnd - pt.responseEnd,
    http: pt.responseEnd - pt.requestStart,
    domloaded: pt.domContentLoadedEventEnd - startTime,
    loaded: pt.loadEventEnd - startTime,
  }
}

export function getUserAgentInfo() {
  const version = navigator.appVersion
  const battery = Storage.get(BATTERY_KEY)
  const position = Storage.get(LOCATION_KEY)
  const connection = getConnection()
  const language = navigator.language
  const platform = navigator.platform
  const online = navigator.onLine
  const timing = getPerformanceTiming() // 获取timing基准性能统计
  return {
    version,
    platform,
    language,
    battery,
    connection,
    online,
    position,
    timing,
  }
}

export function genQueryString(data) {
  let result = []
  for (let key of Object.keys(data)) {
    result.push(`${key}=${data[key]}`)
  }
  return result.join('&')
}

// 错误信息上报
export function recordError(
  message: string,
  url: string,
  filename?: string,
  line?: number,
  col?: number,
  error?: Error
) {
  if (!url) {
    return
  }
  const payload: string | object = {
    filename,
    message,
    line,
    col,
    error,
    time: Date.now(),
  }
  Storage.append(ERROR_KEY, payload)
}
// 捕获并自动上报错误
export function catchErrorAndUpload(url: string) {
  window.addEventListener('error', (err) => {
    // todo: err.error 字符串化会丢失掉细节的问题
    if (err) recordError(err.message, url, err.filename, err.lineno, err.colno, err.error.toString())
  })
  window.addEventListener('beforeunload', () => {
    const payload = Storage.getRaw(ERROR_KEY)
    Storage.remove(ERROR_KEY)
    navigator.sendBeacon(url, payload)
  })
}

// LocalStorage

interface StorageApi {
  getRaw: (key: string) => string
  set: (key: string, value: any) => void
  get: (key: string) => any
  append: (key: string, value: any) => void
  remove: (key: string) => void
  clear: (key: string) => void
}

export const Storage: StorageApi = {
  getRaw(key) {
    return localStorage.getItem(key)
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key))
  },
  append(key, value) {
    // 如果不存在，则设置
    if (!Storage.getRaw(key)) {
      Storage.set(key, [value])
      return
    }
    let prev: any[] = Storage.get(key)
    if (Object.prototype.toString.call(prev) !== '[object Array]') {
      prev = [prev]
    }
    const result = [value]

    if (prev) {
      result.push(...prev)
    }
    Storage.set(key, result)
  },
  remove(key) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  },
}
