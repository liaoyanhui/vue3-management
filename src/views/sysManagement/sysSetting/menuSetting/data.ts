/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-02 17:06:52
 * @LastEditors: shangxia
 * @LastEditTime: 2023-04-13 17:37:26
 */
import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { disableMenuItem } from '/@/api/sys/menu';
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
      title: '菜单名称(子菜单数)',
      dataIndex: 'menuName',
      slots: { customRender: 'menuName' },
    },
    {
      title: '链接地址',
      dataIndex: 'path',
    },
    {
      title: '排序',
      dataIndex: 'sequence',
    },
    {
      title: '菜单位置',
      dataIndex: 'sort',
      slots: { customRender: 'sort' },
      defaultHidden:
        !usePermission().hasPermission(permissionListSetting.MENU_ENTITY_UPDATE_SEQUENCE) &&
        !usePermission().hasPermission(permissionListSetting.MENU_ENTITY_MOVE),
    },
    {
      title: '是否禁用',
      dataIndex: 'disabled',
      defaultHidden: !usePermission().hasPermission(
        permissionListSetting.MENU_ENTITY_UPDATE_DISABLE,
      ),
      customRender: ({ record }) => {
        if (!Reflect.has(record, 'pendingStatus')) {
          record.pendingStatus = false;
        }
        return h(Switch, {
          checked: !record.disabled,
          checkedChildren: '已启用',
          unCheckedChildren: '已禁用',
          loading: record.pendingStatus,
          onChange(checked: boolean) {
            record.pendingStatus = true;
            const newStatus = !checked;
            const { createMessage } = useMessage();
            const data = {
              menuId: record.id,
              disabled: newStatus,
            };
            disableMenuItem(data)
              .then(() => {
                record.disabled = newStatus;
                createMessage.success(`已成功修改菜单状态`);
              })
              .catch(() => {
                createMessage.error('修改菜单状态失败');
              })
              .finally(() => {
                record.pendingStatus = false;
              });
          },
        });
      },
    },
  ];
}
