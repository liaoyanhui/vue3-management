import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '/@/hooks/web/useMessage';
import { updateUserJobStatus } from '/@/api/sys/user';
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
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '姓名',
      dataIndex: 'realName',
      slots: { customRender: 'realName' },
    },
    {
      title: '性别',
      dataIndex: 'sex',
      width: 60,
      customRender: ({ record }) => {
        const { sex } = record || {};
        if (sex) {
          return '女';
        } else {
          return '男';
        }
      },
    },
    {
      title: '最后登录时间',
      dataIndex: 'lastLoginTime',
    },
    {
      title: '登录次数',
      width: 80,
      dataIndex: 'loginCount',
    },
    {
      title: '是否在职',
      dataIndex: 'jobStatus',
      defaultHidden: !usePermission().hasPermission(permissionListSetting.USER_ENTITY_UPDATE),
      width: 80,
      customRender: ({ record }) => {
        if (!Reflect.has(record, 'pendingStatus')) {
          record.pendingStatus = false;
        }
        return h(Switch, {
          checked: record.jobStatus == 1,
          checkedChildren: '在职',
          unCheckedChildren: '离职',
          loading: record.pendingStatus,
          onChange(checked: boolean) {
            record.pendingStatus = true;
            const newStatus = checked ? 1 : 0;
            const { createMessage } = useMessage();
            const data = {
              userId: record.id,
              jobStatus: newStatus,
            };
            updateUserJobStatus(data)
              .then(() => {
                record.jobStatus = newStatus;
                createMessage.success(`成功修改在职状态`);
              })
              .catch(() => {
                createMessage.error('成功修改在职状态');
              })
              .finally(() => {
                record.pendingStatus = false;
              });
          },
        });
      },
    },
    {
      title: '个人权限',
      dataIndex: 'permission',
      defaultHidden: !usePermission().hasPermission(permissionListSetting.USER_ENTITY_UPDATE_MENU),
      width: 80,
      slots: { customRender: 'permission' },
    },
    {
      title: '图片',
      dataIndex: 'pictureUrl',
      slots: { customRender: 'pictureUrl' },
    },
    {
      title: '微信二维码',
      dataIndex: 'wechatUrl',
      slots: { customRender: 'wechatUrl' },
    },
    {
      title: '个人视频',
      dataIndex: 'videoUrl',
      slots: { customRender: 'videoUrl' },
    },
    {
      title: '联系方式',
      dataIndex: 'Contact',
      slots: { customRender: 'Contact' },
    },
  ];
}

export function searchCondition(): Partial<FormProps> {
  return {
    labelWidth: 130,
    schemas: [
      {
        field: 'Keyword',
        label: '用户名称/真实姓名',
        component: 'Input',
        colProps: {
          xl: 6,
          xxl: 5,
        },
      },
      {
        field: 'jobStatus',
        label: '在职状态',
        component: 'Select',
        labelWidth: 100,
        colProps: {
          xl: 6,
          xxl: 5,
        },
        componentProps: {
          options: [
            {
              label: '全部',
              value: '',
              key: '0',
            },
            {
              label: '在职',
              value: '0',
              key: '1',
            },
            {
              label: '离职',
              value: '1',
              key: '2',
            },
          ],
        },
      },
    ],
  };
}
