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