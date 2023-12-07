/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-11-17 09:23:51
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-20 17:30:57
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const memberInforManagement: AppRouteModule = {
  path: '/memberInforManagement',
  name: 'MemberInforManagement',
  component: LAYOUT,
  meta: {
    title: '会员管理',
  },
  children: [
    {
      path: 'memberList',
      name: 'MemberList',
      component: () => import('/@/views/memberInforManagement/memberList/index.vue'),
      meta: {
        title: '会员信息列表',
      },
    },
    {
      path: 'editMemberAuditList',
      name: 'EditMemberAuditList',
      component: () => import('/@/views/memberInforManagement/editMemberAuditList/index.vue'),
      meta: {
        title: '待审核的编辑会员',
      },
    },
    {
      path: 'memberQualificationAudit',
      name: 'MemberQualificationAudit',
      component: () => import('/@/views/memberInforManagement/memberQualificationAudit/index.vue'),
      meta: {
        title: '会员资质管理',
      },
    },
  ],
};

export default memberInforManagement;
