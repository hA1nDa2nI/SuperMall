module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 视窗的宽度，对应我们设计稿的宽度(750 retina--高清屏)
      viewportHeight: 667, // 视窗的高度，对应我们设计稿的高度(也可以不设置)
      unitPrecision: 5, // 指定‘px’转换为视窗单位制的小数位数（很多时候无法整除)
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: ['ignore', 'tar-bar', 'tab-bar-item'], // 指定不需要转换的类型，后面再讲
      minPixelValue: 1, // 小于或等于‘1px’不转换为视窗单位
      mediaQuery: false, // 允许在媒体查询中转换‘px’
      exclude: [/TabBar/]
    }
  }
}

// 1.在js中使用正则：/正则相关规则/
// 2.exclude汇总存放的元素必须是正则表达式
// 3.按照排除的文件写对应的正则
// 正则的规则：
// (1) ^abc: 表示匹配的内容，必须以abc开头
// (2) abc$: 表示匹配的内容。必须以abc结尾