/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-11-09 13:58:29
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-09 14:06:30
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const home: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '/home/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '首页',
    // orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'HomePage',
      component: () => import('/@/views/home/index.vue'),
      meta: {
        title: '首页',
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default home;
