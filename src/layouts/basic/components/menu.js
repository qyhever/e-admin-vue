export default [
  {
    path: '/home',
    title: '首页',
    icon: 'smile'
  },
  {
    path: '/config',
    title: '运营配置',
    icon: 'smile',
    children: [
      {
        path: '/activity',
        title: '活动配置',
        icon: 'smile'
      },
      {
        path: '/goods',
        title: '商品配置',
        icon: 'smile',
        children: [
          {
            path: '/goodsList',
            title: '商品列表',
            icon: 'smile'
          },
          {
            path: '/goodsDetail',
            title: '商品详情',
            icon: 'smile'
          }
        ]
      }
    ]
  },
  {
    path: '/user',
    title: '用户管理',
    icon: 'smile'
  }
]
