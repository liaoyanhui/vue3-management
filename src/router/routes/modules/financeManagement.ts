/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-11-17 09:23:51
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-30 11:42:48
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const financeManagement: AppRouteModule = {
  path: '/financeManagement',
  name: 'FinanceManagement',
  component: LAYOUT,
  meta: {
    title: '财务管理',
  },
  children: [
    {
      path: 'contractApplyManagement',
      name: 'ContractApplyManagement',
      component: () => import('/@/views/financeManagement/contractApplyManagement/index.vue'),
      meta: {
        title: '发表申请管理',
      },
    },
  ],
};

export default financeManagement;
