/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-11-17 09:23:51
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-21 11:27:46
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const contractManagement: AppRouteModule = {
  path: '/contractManagement',
  name: 'ContractManagement',
  component: LAYOUT,
  meta: {
    title: '电子合同管理',
  },
  children: [
    {
      path: 'applyContract',
      name: 'ApplyContract',
      component: () => import('/@/views/contractManagement/applyContract/index.vue'),
      meta: {
        title: '合同管理',
      },
    },
    {
      path: 'contractTemplate',
      name: 'ContractTemplate',
      component: () => import('/@/views/contractManagement/contractTemplate/index.vue'),
      meta: {
        title: '模板管理',
      },
    },
  ],
};

export default contractManagement;
