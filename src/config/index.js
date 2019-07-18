export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: "青鸟快讯",
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    // dev: 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/',
    dev: "/api",
    pro: "/"
  },
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: "home",
  /** npm
   * @description 需要加载的插件
   */
  plugin: {
    "error-store": {
      showInHeader: false, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  },
  cssSourceMap: false,
  assetsPublicPath: "/",
  downAppURl: "/download",
  // 下载APP地址
  downWeixin: "https://a.app.qq.com/dom/micro/open.jsp?pkgname=com.humming.app",
  // 微信下载APP地址
  iphoneSchema: "qingniaokx://",
  // IOS打开APP 跳转地址（这个跳转地址需要IOS开发人员提供）
  iphoneDownUrl:
    "https://itunes.apple.com/cn/app/%E9%9D%92%E9%B8%9F%E5%BF%AB%E8%AE%AF/id1453122841?mt=8",
  // IOS 下载地址
  androidSchema: "qingniaokx://",
  // 安卓打开APP 跳转地址 （这个跳转地址需要安卓开发人员提供）
  androidDownUrl:
    "https://imtt.dd.qq.com/16891/apk/3C12A8D5D6B5058CC422680E5C73B4F5.apk"
  // 安卓下载地址
};
