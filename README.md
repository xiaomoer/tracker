## Tracker

> 一款无痕埋点工具

### 运行Demo

1. `clone` 到本地
2. `yarn install` 安装依赖
3. `yarn serve` 运行demo
4. 访问`localhost:3000`并打开控制台`Network`查看收集信息及上报

### 使用

1. `clone`到本地并安装依赖
2. `yarn build` 构建文件
3. 通过`script`标签在入口`html`中引入
4. 在入口`html`中添加`script`标签并添加以下代码：
```js
window.onload = function() {
  new Tracker({ uploadUrl: 'your upload url', events: ['click'] })
    .regist()
}
```

### 配置项

```js
 interface IConfig {
  events?: string[] // 监听的事件 默认值：['click']
  uploadType?: string // 上传的方式 默认值：‘immedite’ 暂不支持其它方式
  uploadUrl: string // 数据上报接口，必填
  mode?: string // 模式 暂无使用
}
```
### TodoList

- [x] `uploadType`为`unload`，页面关闭之前批量上传数据
- [x] `mode`选择埋点收集数据的模式，可以选择是否收集额外数据
- [x] 多`event`支持，目前确认可用的只有`click`
- [x] 多浏览器兼容性
