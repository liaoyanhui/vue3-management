/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-14 16:31:59
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-24 14:23:17
 */
import { FormSchema, FormProps } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { getContractAdminUserList } from '/@/api/sys/contract';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      slots: { customRender: 'userName' },
    },
    {
      title: '公司',
      dataIndex: 'company',
      width: 230,
      slots: { customRender: 'company' },
    },
    {
      title: '时间',
      dataIndex: 'date',
      width: 280,
      slots: { customRender: 'date' },
    },
    {
      title: '库存权限',
      dataIndex: 'inventory',
      slots: { customRender: 'inventory' },
    },
    {
      title: '业务员',
      dataIndex: 'businessSysUserRealName',
    },
    // {
    //   title: '统计数据',
    //   dataIndex: 'statistics',
    // },
  ];
}

export function searchCondition(): Partial<FormProps> {
  return {
    labelWidth: 90,
    schemas: [
      {
        field: 'KeyWord',
        label: '用户名/公司名',
        component: 'Input',
        labelWidth: 110,
        colProps: {
          xl: 5,
          xxl: 4,
        },
      },
      {
        field: 'memberType',
        label: '会员类型',
        component: 'Select',
        colProps: {
          xl: 5,
          xxl: 3,
        },
        componentProps: {
          options: [
            { label: '供应商', value: '1' },
            { label: '采购商', value: '2' },
          ],
        },
      },
      {
        field: 'servicerId',
        label: '业务专员',
        component: 'ApiSelect',
        colProps: {
          xl: 5,
          xxl: 3,
        },
        componentProps: {
          api: getContractAdminUserList,
          resultField: 'list',
          // use name as label
          labelField: 'userName',
          // use id as value
          valueField: 'userId',
          // not request untill to select
          immediate: true,
          onChange: (e) => {
            console.log('selected:', e);
          },
          onOptionsChange: (options) => {},
        },
      },
    ],
  };
}
