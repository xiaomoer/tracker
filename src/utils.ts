import { BATTERY_KEY, LOCATION_KEY } from './const'

function getElementIdentifier(elem: HTMLElement) {
  if (!elem) {
    return ''
  }
  if(elem.id) {
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
  while(elem) {
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
  return [
    (e as any).pageX - scrollLeft - left,
    (e as any).pageY - scrollTop - top
  ]
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
    nav.getBattery()
      .then(data => {
        const { charging, chargingTime, dischargingTime, level } = data
        const result = { charging, chargingTime, dischargingTime, level }
        localStorage.setItem(BATTERY_KEY, JSON.stringify(result))
      })
  }
}
// 获取连接数据
export function getConnection() {
  const connection = (navigator as any).connection
  if(connection) {
    // 网络类型 预估往返时间，下行速度
    const { effectiveType, rtt, downlink } = connection
    return {
      effectiveType,
      rtt,
      downlink
    }
  }
  return ''
}

// 获取经纬度
export function getLocation() {
  if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let pos = { long: position.coords.longitude, lat: position.coords.latitude }
      localStorage.setItem(LOCATION_KEY, JSON.stringify(pos))
    })
  }
}

function getStorageData(key: string) {
  return JSON.parse(localStorage.getItem(key))
}

export function getUserAgentInfo() {
  const version = navigator.appVersion
  const battery = getStorageData(BATTERY_KEY)
  const position = getStorageData(LOCATION_KEY)
  const connection = getConnection()
  const language = navigator.language
  const platform = navigator.platform
  const online = navigator.onLine
  return {
    version,
    platform,
    language,
    battery,
    connection,
    online,
    position
  }
}

export function genQueryString(data) {
  let result = []
  for (let key of Object.keys(data)) {
    result.push(`${key}=${data[key]}`)
  }
  return result.join('&')
}
