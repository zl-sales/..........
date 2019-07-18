import Main from '@/components/main'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: "/",
    name: "sitehome",
    meta: {
      title: "",
      hideInMenu: true
    },
    component: () => import("@/view/sitehome/sitehome.vue")
  },
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      hideInMenu: true
    },
    component: () => import("@/view/login/login.vue")
  },
  {
    path: "/binging",
    name: "binging",
    needlogin: true,
    meta: {
      title: "手机绑定",
      hideInMenu: true
    },
    component: () => import("@/view/binging/binging.vue")
  },
  {
    path: "/download",
    name: "download",
    needlogin: true,
    meta: {
      title: "App 下载",
      hideInMenu: true
    },
    component: () => import("@/view/info/download.vue")
  },
  {
    path: "/invite/:id",
    name: "invite",
    needlogin: true,
    meta: {
      title: "领取红包奖励",
      hideInMenu: true
    },
    component: () => import("@/view/invite/share.vue")
  },
  {
    path: "/user_agreement",
    name: "user_agreement",
    needlogin: true,
    meta: {
      title: "用户协议",
      hideInMenu: true
    },
    component: () => import("@/view/login/login-agreement.vue")
  },
  {
    path: "/user_privacy",
    name: "user_privacy",
    meta: {
      title: "隐私条款",
      hideInMenu: true
    },
    component: () => import("@/view/login/login-privacy.vue")
  },
  {
    path: "/term_bonus",
    name: "bonus",
    meta: {
      title: "奖励规则",
      notCache: true,
      hideInMenu: true
    },
    component: () => import("@/view/info/term_bonus.vue")
  },
  {
    path: "/version",
    name: "version",
    meta: {
      title: "版本信息",
      notCache: true,
      hideInMenu: true
    },
    component: () => import("@/view/info/version.vue")
  },
  {
    path: "/help",
    name: "help",
    meta: {
      title: "帮助",
      notCache: true,
      hideInMenu: true
    },
    component: () => import("@/view/info/help.vue")
  },
  {
    path: "/share/:id",
    name: "share",
    meta: {
      title: "青鸟快讯",
      notCache: true,
      hideInMenu: true
    },
    component: () => import("@/view/news/share.vue")
  },
  {
    path: "/feedbackList/:token",
    name: "feedbackList",
    meta: {
      title: "问题反馈",
      notCache: true,
      hideInMenu: true
    },
    component: () => import("@/view/feedback/feedbackList.vue")
  },
  {
    path: "/feedbackList/backdetail",
    name: "backdetail",
    meta: {
      title: "反馈详情",
      notCache: true,
      hideInMenu: true
    },
    component: () => import("@/view/feedback/backdetail.vue")
  },

  {
    path: "/Invitation",
    name: "Invitation",
    meta: {
      title: "邀请规则",
      notCache: true,
      hideInMenu: true
    },
    component: () => import("@/view/middle/Invitation.vue")
  },
  {
    path: "/withdraw",
    name: "withdraw",
    meta: {
      title: "提现规则",
      notCache: true,
      hideInMenu: true
    },
    component: () => import("@/view/middle/withdraw.vue")
  },
  {
    path: "/",
    name: "newsinfo",
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: "newsinfo/:id",
        name: "详细",
        meta: {
          title: "详细",
          notCache: true,
          hideInMenu: true
        },
        component: () => import("@/view/news/newsinfo.vue")
      }
    ]
  },
  {
    path: "/",
    name: "_home",
    component: Main,
    meta: {
      hideInMenu: false,
      notCache: true,
      requireAuth: true
    },
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          hideInMenu: false,
          title: "首页",
          notCache: true
        },
        component: () => import("@/view/home/home")
      }
    ]
  },
  {
    path: "/info/:id",
    name: "info",
    meta: {
      title: "青鸟快讯",
      notCache: true,
      hideInMenu: true
    },
    component: () => import("@/view/news/newsinfo.vue")
  },
  {
    path: "/",
    name: "release",
    component: Main,
    meta: {
      hideInBread: true,
      notCache: true,
      hideInMenu: false,
      requireAuth: true
    },
    children: [
      {
        path: "release",
        name: "发文",
        meta: {
          title: "发文",
          notCache: true,
          hideInMenu: false
        },
        component: () => import("@/view/release/release.vue")
      }
    ]
  },
  {
    path: "/",
    name: "content",
    component: Main,
    meta: {
      hideInBread: true,
      notCache: true,
      hideInMenu: false,
      requireAuth: true
    },
    children: [
      {
        path: "content",
        name: "内容管理",
        meta: {
          title: "内容管理",
          notCache: false,
          hideInMenu: false
        },
        component: () => import("@/view/content/content.vue")
      }
    ]
  },
  {
    path: "/",
    name: "announcement",
    component: Main,
    meta: {
      hideInBread: true,
      notCache: false,
      hideInMenu: true,
      requireAuth: true
    },
    children: [
      {
        path: "announcement",
        name: "公告",
        meta: {
          title: "公告",
          notCache: false,
          hideInMenu: true
        },
        component: () => import("@/view/announcement/announcement.vue")
      }
    ]
  },
  {
    path: "/",
    name: "notice",
    component: Main,
    meta: {
      hideInBread: false,
      notCache: true,
      hideInMenu: true,
      requireAuth: true
    },
    children: [
      {
        path: "notice",
        name: "消息通知",
        meta: {
          title: "消息通知",
          notCache: true,
          hideInMenu: true
        },
        component: () => import("@/view/notice/notice.vue")
      }
    ]
  },
  {
    path: "/",
    name: "comments",
    component: Main,
    meta: {
      hideInBread: true,
      notCache: true,
      hideInMenu: true,
      requireAuth: true
    },
    children: [
      {
        path: "comments",
        name: "评论管理",
        meta: {
          title: "评论管理",
          notCache: true,
          hideInMenu: false
        },
        component: () => import("@/view/comments/comments.vue")
      }
    ]
  },

  {
    path: "/",
    name: "fans",
    component: Main,
    meta: {
      hideInBread: true,
      notCache: true,
      hideInMenu: true,
      requireAuth: true
    },
    children: [
      {
        path: "fans",
        name: "粉丝管理",
        meta: {
          title: "粉丝管理",
          notCache: true,
          hideInMenu: false
        },
        component: () => import("@/view/fans/fans.vue")
      }
    ]
  },
  {
    path: "/",
    name: "reports",
    component: Main,
    meta: {
      hideInBread: true,
      notCache: true,
      hideInMenu: true,
      requireAuth: true
    },
    children: [
      {
        path: "reports",
        name: "数据分析",
        meta: {
          title: "数据分析",
          notCache: true,
          hideInMenu: false
        },
        component: () => import("@/view/fans/fans.vue")
      }
    ]
  },
  {
    path: "/",
    name: "draft",
    component: Main,
    meta: {
      hideInBread: true,
      notCache: false,
      hideInMenu: true,
      requireAuth: true
    },
    children: [
      {
        path: "draft/:id",
        name: "草稿详情",
        meta: {
          title: "草稿详情",
          notCache: false,
          hideInMenu: false
        },
        component: () => import("@/view/draft/draft.vue")
      }
    ]
  },
  {
    path: "/",
    name: "settlement",
    component: Main,
    meta: {
      hideInBread: true,
      notCache: true,
      hideInMenu: false,
      requireAuth: true
    },
    children: [
      {
        path: "settlement",
        name: "结算提现",
        meta: {
          title: "结算提现",
          notCache: true,
          hideInMenu: false
        },
        component: () => import("@/view/settlement/settlement.vue")
      }
    ]
  },
  {
    path: "/",
    name: "personal",
    component: Main,
    meta: {
      hideInBread: true,
      notCache: true,
      hideInMenu: true,
      requireAuth: true
    },
    children: [
      {
        path: "personal",
        name: "个人中心",
        meta: {
          title: "个人中心",
          notCache: true,
          hideInMenu: false
        },
        component: () => import("@/view/personal/personal.vue")
      }
    ]
  },
  {
    path: "/401",
    name: "error_401",
    meta: {
      hideInMenu: true
    },
    component: () => import("@/view/error-page/401.vue")
  },
  {
    path: "/500",
    name: "error_500",
    meta: {
      hideInMenu: true
    },
    component: () => import("@/view/error-page/500.vue")
  },
  {
    path: "*",
    name: "error_404",
    meta: {
      hideInMenu: true
    },
    component: () => import("@/view/error-page/404.vue")
  }
];
