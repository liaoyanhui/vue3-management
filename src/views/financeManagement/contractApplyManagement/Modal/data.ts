/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-11-30 14:14:21
 * @LastEditors: shangxia
 * @LastEditTime: 2023-12-05 15:03:23
 */
import { FormSchema, FormProps } from '/@/components/Form';

export const uploadInvoiceModalSchema: FormSchema[] = [
  {
    field: 'invoiceStateDesc',
    label: '开票状态',
    component: 'Input',
    dynamicDisabled: true,
    colProps: {
      span: 11,
    },
  },
  {
    field: 'invoiceTypeDesc',
    label: '开票类型',
    component: 'Input',
    dynamicDisabled: true,
    colProps: {
      span: 11,
    },
  },
  {
    field: 'invoiceCompany',
    label: '开票单位',
    component: 'Input',
    dynamicDisabled: true,
    colProps: {
      span: 11,
    },
  },

  {
    field: 'title',
    label: '发票抬头',
    component: 'Input',
    dynamicDisabled: true,
    colProps: {
      span: 11,
    },
  },
  {
    field: 'taxpayerNumber',
    label: '纳税人识别号',
    component: 'Input',
    dynamicDisabled: true,
    colProps: {
      span: 22,
    },
  },
  {
    field: 'address',
    label: '企业地址',
    component: 'Input',
    dynamicDisabled: true,
    colProps: {
      span: 22,
    },
  },
  {
    field: 'paymentDate',
    label: '打款日期',
    component: 'Input',
    dynamicDisabled: true,
    colProps: {
      span: 11,
    },
  },
  {
    field: 'telePhone',
    label: '企业电话',
    component: 'Input',
    dynamicDisabled: true,
    colProps: {
      span: 11,
    },
  },
  {
    field: 'bankName',
    label: '开户银行',
    component: 'Input',
    dynamicDisabled: true,
    colProps: {
      span: 11,
    },
  },
  {
    field: 'bankNumber',
    label: '银行账号',
    component: 'Input',
    dynamicDisabled: true,
    colProps: {
      span: 11,
    },
  },
  {
    field: 'invoicePic',
    label: '上传发票',
    component: 'Input',
    required: true,
    defaultValue: 'demo',
    colProps: {
      span: 22,
    },
    slot: 'invoicePic',
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    componentProps: {
      rows: 2,
    },
    colProps: {
      span: 22,
    },
  },
];

export const batchUploadInvoiceModalSchema: FormSchema[] = [
  {
    field: 'invoiceZip',
    label: '上传发票压缩包',
    component: 'Input',
    colProps: {
      span: 22,
    },
    slot: 'invoiceZip',
  },
];
