/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-10 10:34:55
 * @LastEditors: shangxia
 * @LastEditTime: 2023-12-02 15:08:04
 */
import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { getInvoiceCompanyList } from '/@/api/sys/common';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '公司信息',
      dataIndex: 'companyInfo',
      width: 150,
      slots: { customRender: 'companyInfo' },
    },
    {
      title: '开票状态',
      dataIndex: 'invoiceStateDesc',
    },
    {
      title: '开票金额',
      dataIndex: 'price',
    },
    {
      title: '开票类型',
      dataIndex: 'invoiceTypeDesc',
    },
    {
      title: '开票单位',
      dataIndex: 'invoiceCompany',
    },
    {
      title: '开票信息',
      dataIndex: 'invoiceInfo',
      width: 220,
      slots: { customRender: 'invoiceInfo' },
    },
    {
      title: '申请时间',
      dataIndex: 'addDate',
    },
    {
      title: '发票图片',
      dataIndex: 'invoicePic',
      slots: { customRender: 'invoicePic' },
    },
    // {
    //   title: '审核人员',
    //   dataIndex: 'auditPerson',
    // },
    {
      title: '备注',
      dataIndex: 'remark',
    },
  ];
}

export function searchCondition(): Partial<FormProps> {
  return {
    labelWidth: 80,
    schemas: [
      {
        field: 'userName',
        label: '用户名',
        component: 'Input',
        labelWidth: 60,
        colProps: {
          xl: 4,
          xxl: 3,
        },
      },
      {
        field: 'invoiceState',
        label: '开票状态',
        component: 'Select',
        colProps: {
          xl: 4,
          xxl: 3,
        },
        componentProps: {
          options: [
            { label: '正在开票', value: '1' },
            { label: '已开票', value: '2' },
          ],
        },
      },
      {
        field: 'invoiceType',
        label: '开票类型',
        component: 'Select',
        colProps: {
          xl: 5,
          xxl: 4,
        },
        componentProps: {
          options: [
            { label: '全部', value: '1' },
            { label: '增值税普通发票', value: '2' },
            { label: '增值税专用发票', value: '3' },
          ],
        },
      },
      {
        field: 'invoiceCompany',
        label: '开票单位',
        component: 'ApiSelect',
        colProps: {
          xl: 6,
          xxl: 6,
        },
        componentProps: {
          api: getInvoiceCompanyList,
          // params: {
          //   id: 1,
          // },
          resultField: 'list',
          labelField: 'enumText',
          valueField: 'enumText',
          immediate: true,
          onChange: (e) => {
            // console.log('selected:', e);
          },
          onOptionsChange: (options) => {
            // console.log('get options', options.length, options);
          },
          // options: [
          //   { label: '杭州维库信息科技有限公司', value: '1'},
          // ]
        },
      },
    ],
  };
}
