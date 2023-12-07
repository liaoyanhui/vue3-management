import { FormSchema, FormProps } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
    },
    {
      title: '会员类型',
      dataIndex: 'userType',
      customRender: ({ record }) => {
        const { userType } = record || {};
        if (userType == 1) {
          return '供应商';
        } else if (userType == 2) {
          return '采购商';
        }
      },
    },
    {
      title: '详细信息',
      width: 500,
      dataIndex: 'info',
      slots: { customRender: 'info' },
    },
    {
      title: '审核状态',
      dataIndex: 'state',
      customRender: ({ record }) => {
        const { state } = record || {};
        if (state == 1) {
          return '待审核';
        } else if (state == 2) {
          return <span style="color: green">审核通过</span>;
        } else {
          return <span style="color: red">审核不通过</span>;
        }
      },
    },
    {
      title: '不通过原因',
      dataIndex: 'remark',
      customRender: ({ record }) => {
        const { remark, state } = record || {};
        if (state == 3) {
          return remark;
        } else {
          return '';
        }
      },
    },
  ];
}

export function searchCondition(): Partial<FormProps> {
  return {
    labelWidth: 90,
    schemas: [
      {
        field: 'name',
        label: '用户名/公司名',
        component: 'Input',
        labelWidth: 110,
        colProps: {
          xl: 6,
          xxl: 5,
        },
      },
      {
        field: 'userType',
        label: '会员类型',
        component: 'Select',
        colProps: {
          xl: 6,
          xxl: 4,
        },
        componentProps: {
          options: [
            { label: '供应商', value: '1' },
            { label: '采购商', value: '2' },
          ],
        },
      },
      {
        field: 'auditState',
        label: '审核状态',
        component: 'Select',
        colProps: {
          xl: 6,
          xxl: 4,
        },
        componentProps: {
          options: [
            { label: '审核中', value: '1' },
            { label: '审核通过', value: '2' },
            { label: '审核不通过', value: '3' },
          ],
        },
      },
    ],
  };
}
