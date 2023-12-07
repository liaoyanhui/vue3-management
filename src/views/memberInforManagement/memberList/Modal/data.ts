/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-14 16:31:59
 * @LastEditors: shangxia
 * @LastEditTime: 2023-07-26 09:08:06
 */
import { FormSchema, FormProps } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { getPlatformTypeList, getLoginModeList } from '/@/api/sys/common';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '公司信息',
      dataIndex: 'companyInfo',
      slots: { customRender: 'companyInfo' },
    },
    {
      title: '登录平台',
      dataIndex: 'platFormTypeName',
    },
    {
      title: '登录方式',
      dataIndex: 'loginModeName',
    },
    {
      title: '登录IP',
      dataIndex: 'loginIP',
    },
    {
      title: '登录时间',
      dataIndex: 'loginTime',
    },
  ];
}

export function searchCondition(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: 'platformType',
        label: '登录平台',
        component: 'ApiSelect',
        colProps: {
          xl: 6,
          xxl: 6,
        },
        componentProps: {
          api: getPlatformTypeList,
          // resultField: 'list',
          // use name as label
          labelField: 'text',
          // use id as value
          valueField: 'value',
          immediate: true,
          onChange: (e) => {
            console.log('selected:', e);
          },
          onOptionsChange: (options) => {},
        },
      },
      {
        field: 'loginMode',
        label: '登录方式',
        component: 'ApiSelect',
        colProps: {
          xl: 6,
          xxl: 6,
        },
        componentProps: {
          api: getLoginModeList,
          // resultField: 'list',
          // use name as label
          labelField: 'text',
          // use id as value
          valueField: 'value',
          immediate: true,
          onChange: (e) => {
            console.log('selected:', e);
          },
          onOptionsChange: (options) => {},
        },
      },
      {
        field: 'startDate',
        label: '开始时间',
        component: 'DatePicker',
        colProps: {
          xl: 6,
          xxl: 6,
        },
      },
      {
        field: 'endDate',
        label: '结束时间',
        component: 'DatePicker',
        colProps: {
          xl: 6,
          xxl: 6,
        },
      },
    ],
  };
}

export function getStockColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
    },
    {
      title: '型号',
      dataIndex: 'partNo',
    },
    {
      title: '厂商',
      dataIndex: 'brand',
    },
    {
      title: '封装',
      dataIndex: 'pack',
      width: 80,
    },
    {
      title: '批号',
      dataIndex: 'dc',
      width: 80,
    },
    {
      title: '数量',
      dataIndex: 'qty',
    },
    {
      title: '说明',
      dataIndex: 'note',
    },
  ];
}

export function stockSearch(): Partial<FormProps> {
  return {
    labelWidth: 80,
    schemas: [
      {
        field: 'searchMode',
        label: '搜索类型',
        component: 'Select',
        colProps: {
          xl: 6,
          xxl: 4,
        },
        componentProps: {
          options: [
            {
              label: '精确搜索',
              value: '0',
              key: '0',
            },
            {
              label: '模糊搜索',
              value: '1',
              key: '1',
            },
          ],
        },
      },
      {
        field: 'searchType',
        label: '类型',
        component: 'Select',
        colProps: {
          xl: 6,
          xxl: 4,
        },
        componentProps: {
          options: [
            {
              label: '型号',
              value: '0',
              key: '0',
            },
            {
              label: '品牌',
              value: '1',
              key: '1',
            },
            {
              label: '封装',
              value: '2',
              key: '2',
            },
            {
              label: '批号',
              value: '3',
              key: '3',
            },
          ],
        },
      },
      {
        field: 'keyword',
        label: '关键词',
        component: 'Input',
        colProps: {
          xl: 6,
          xxl: 6,
        },
      },
    ],
  };
}

export const rejectFormSchema: FormSchema[] = [
  {
    field: 'errorMsg',
    component: 'InputTextArea',
    required: true,
    label: '驳回原因',
    colProps: {
      span: 22,
    },
    componentProps: {
      rows: 4,
    },
  },
];
