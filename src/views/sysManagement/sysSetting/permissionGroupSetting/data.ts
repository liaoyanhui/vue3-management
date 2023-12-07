/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-02 14:47:55
 * @LastEditors: shangxia
 * @LastEditTime: 2023-04-13 16:43:22
 */
import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { usePermission } from '/@/hooks/web/usePermission';
import permissionListSetting from '/@/settings/permissionListSetting';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
    },
    {
      title: '组名',
      dataIndex: 'name',
    },
    {
      title: '说明',
      dataIndex: 'note',
    },
    // {
    //   title: '锁定',
    //   dataIndex: 'lock',
    // },
    {
      title: '权限设置',
      dataIndex: 'permission',
      slots: { customRender: 'permission' },
      defaultHidden: !usePermission().hasPermission(permissionListSetting.ROLE_ENTITY_UPDATE_MENU),
    },
  ];
}
