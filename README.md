- [在线预览](https://panjiachen.github.io/vue-element-admin)

- [使用文档](https://panjiachen.github.io/vue-element-admin-site/zh/)

# npm install #
- npm i xx     同 --save

- npm i xx -g   安装至全局、非项目(如vue-cli)

- npm i xx --save  加入dependencies节点、npm install --production仅会安装（一般不在生产环境npm i， 或者执行也是不带‘--production’）

- npm i xx --save-dev  加入devDependencies节点、 开发环境npm install时devDependencies、dependencies都会安装，这样来打包作用是一制的

# 锁定版本（例："less": "^4.1.0"） #

- 波浪符号（~） 寻找中间最新版本

- 插入符号（^） 寻找第一位最新版本   默认

- 都不带  锁定版本

# 额外增加的依赖 #

- IE对VUE、ES6、Promise 最低支持到 IE9[二选一]

>     <script src = "https://cdn.polyfill.io/v2/polyfill.min.js"></script>
    npm i es6-promise --save-dev
    import promise from 'es6-promise'
    promise.polyfill()

- dataV 构建大屏（全屏）数据展示页面即数据可视化
>
    npm install @jiaminghi/data-view --save
    import dataV from '@jiaminghi/data-view'
    Vue.use(dataV)

- vue-baidu-map 百度地图Vue版
>     npm install vue-baidu-map --save

- qrcodejs2 二维码及下载
>     npm install qrcodejs2 --save

- qrcodejs2 页面截图
>     npm install html2canvas --save

- v-charts 图表插件（配置项简单、更友好）
>     npm i v-charts echarts --save

- 支持less语法[less-loader版本过高会报错]
>     npm install less less-loader@5.0.0 --save-dev

- 时间处理
>     npm install moment --save

- 使用proxy、nginx反向代理处理跨域，axios无需配置baseURL

# 安装依赖注意 #
建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
>     npm install --registry=https://registry.npm.taobao.org

设置淘宝镜像、避免会安装 node-sass 时从 github.com 上下载 .node 文件
>
>     npm config set registry https://registry.npm.taobao.org/
    npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/


- 登录 / 注销

- 权限验证
  - 页面权限
  - 指令权限
  - 权限配置
  - 二步登录

- 多环境发布
  - dev
  - sit
  - stage
  - prod

- 全局功能
  - 国际化多语言
  - 多种动态换肤
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - 本地/后端 mock 数据
  - Screenfull全屏
  - 自适应收缩侧边栏

- 编辑器
  - 富文本
  - Markdown
  - JSON 等多格式

- Excel
  - 导出excel
  - 导入excel
  - 前端可视化excel
  - 导出zip

- 表格
  - 动态表格
  - 拖拽表格
  - 内联编辑

- 错误页面
  - 401
  - 404

- 組件
  - 头像上传
  - 返回顶部
  - 拖拽Dialog
  - 拖拽Select
  - 拖拽看板
  - 列表拖拽
  - SplitPane
  - Dropzone
  - Sticky
  - CountTo

- 综合实例
- 错误日志
- Dashboard
- 引导页
- ECharts 图表
- Clipboard(剪贴复制)
- Markdown2html
