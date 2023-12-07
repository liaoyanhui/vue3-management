/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-11-09 14:22:37
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-13 10:02:26
 */
import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';

const sysManagement: AppRouteModule = {
  path: '/sysManagement',
  name: 'SysManagement',
  component: LAYOUT,
  meta: {
    // icon: 'ion:grid-outline',
    title: '系统管理',
  },
  children: [
    {
      path: 'sysSetting',
      name: 'SysSetting',
      meta: {
        title: '系统设置',
      },
      children: [
        {
          path: 'menuSetting/:menuId',
          name: 'MenuSetting',
          component: () => import('/@/views/sysManagement/sysSetting/menuSetting/index.vue'),
          meta: {
            title: '菜单设置',
          },
        },
        {
          path: 'permissionGroupSetting',
          name: 'PermissionGroupSetting',
          component: () =>
            import('/@/views/sysManagement/sysSetting/permissionGroupSetting/index.vue'),
          meta: {
            title: '权限组设置',
          },
        },
      ],
    },
    {
      path: 'personnelManagement',
      name: 'PersonnelManagement',
      meta: {
        title: '人员管理',
      },
      children: [
        {
          path: 'addPersonnel',
          name: 'AddPersonnel',
          component: () =>
            import('/@/views/sysManagement/personnelManagement/addPersonnel/index.vue'),
          meta: {
            title: '添加人员',
          },
        },
        {
          path: 'personnelList',
          name: 'PersonnelList',
          component: () =>
            import('/@/views/sysManagement/personnelManagement/personnelList/index.vue'),
          meta: {
            title: '人员列表',
          },
        },
      ],
    },
    {
      path: 'editPersonnelInformation',
      name: 'EditPersonnelInformation',
      component: () => import('/@/views/sysManagement/editPersonnelInformation/index.vue'),
      meta: {
        title: '个人信息修改',
      },
    },
  ],
};

export default sysManagement;
