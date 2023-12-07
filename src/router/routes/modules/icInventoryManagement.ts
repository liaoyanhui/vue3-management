import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const icInventoryManagement: AppRouteModule = {
  path: '/icInventoryManagement',
  name: 'IcInventoryManagement',
  component: LAYOUT,
  meta: {
    title: 'IC库存管理',
  },
  children: [
    {
      path: 'partNoPVManagement',
      name: 'PartNoPVManagement',
      component: () => import('/@/views/icInventoryManagement/partNoPVManagement/index.vue'),
      meta: {
        title: '型号图片视频库管理',
      },
    },
  ],
};

export default icInventoryManagement;
