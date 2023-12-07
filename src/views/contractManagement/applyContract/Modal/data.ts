/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-13 14:30:46
 * @LastEditors: shangxia
 * @LastEditTime: 2023-12-01 14:51:13
 */
import { FormSchema, FormProps } from '/@/components/Form';
import { getPerformanceOptionByType } from '/@/api/sys/contract';

export const formSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '主用户名',
    component: 'Input',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'userNames',
    label: '其他用户名',
    component: 'Input',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'contract',
    component: 'Input',
    label: '合同类型',
    required: true,
    slot: 'contract',
    colProps: {
      span: 22,
    },
  },
];

export const editFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '主用户名',
    component: 'Input',
    dynamicDisabled: true,
    colProps: {
      span: 22,
    },
  },
];
export const auditSchema: FormSchema[] = [
  {
    field: 'checkFlag',
    component: 'RadioGroup',
    label: '是否通过',
    required: true,
    colProps: {
      span: 22,
    },
    componentProps: ({ formActionType }) => {
      return {
        options: [
          {
            label: '通过',
            value: 1,
          },
          {
            label: '不通过',
            value: 0,
          },
        ],
        onchange: (e) => {
          const { updateSchema, clearValidate } = formActionType;
          const value = e.target.value;
          clearValidate('errorMsg');
          if (value == 1) {
            updateSchema({
              field: 'errorMsg',
              required: false,
            });
          } else {
            updateSchema({
              field: 'errorMsg',
              required: true,
            });
          }
        },
      };
    },
  },
  {
    field: 'errorMsg',
    component: 'InputTextArea',
    label: '不通过原因',
    // required: true,
    colProps: {
      span: 22,
    },
  },
];

export const bindSchema: FormSchema[] = [
  {
    field: 'creatorName',
    component: 'Input',
    label: '主用户名',
    required: true,
  },
];

export const enterPerformanceModalSchema: FormSchema[] = [
  {
    field: 'contractNo',
    label: '合同编号',
    component: 'Input',
    required: true,
    colProps: {
      span: 22,
    },
    itemProps: {
      extra: '电子编号【D开头】：202003038',
    },
  },
  {
    field: 'companyName',
    label: '公司名称',
    component: 'Input',
    required: true,
    colProps: {
      span: 22,
    },
  },
  {
    field: 'businessType',
    label: '业务类型',
    component: 'Select',
    required: true,
    defaultValue: 'demo',
    colProps: {
      span: 22,
    },
    slot: 'businessType',
  },
  {
    field: 'years',
    label: '年限',
    component: 'Input',
    colProps: {
      span: 22,
    },
    componentProps: {
      type: 'number',
      addonAfter: '年',
    },
  },
  {
    field: 'bankId',
    label: '付款银行',
    component: 'ApiSelect',
    required: true,
    colProps: {
      span: 22,
    },
    componentProps: {
      api: getPerformanceOptionByType,
      params: {
        type: 2,
        parId: 0,
      },
      resultField: 'list',
      labelField: 'value',
      valueField: 'id',
      immediate: true,
      onChange: (e) => {
        // console.log('selected:', e);
      },
      onOptionsChange: (options) => {
        // console.log('get options', options.length, options);
      },
    },
  },
  {
    field: 'isRenew',
    label: '是否续费',
    component: 'RadioGroup',
    required: true,
    colProps: {
      span: 22,
    },
    componentProps: {
      options: [
        { value: true, label: '是' },
        { value: false, label: '否' },
      ],
    },
  },
  {
    field: 'price',
    label: '金额(￥)',
    component: 'Input',
    required: true,
    colProps: {
      span: 22,
    },
    componentProps: {
      type: 'number',
    },
  },
  {
    field: 'balance',
    label: '尾款(￥)',
    component: 'Input',
    colProps: {
      span: 11,
    },
    componentProps: {
      type: 'number',
    },
  },
  {
    field: 'balanceDate',
    label: '尾款最后日期',
    component: 'DatePicker',
    required: ({ values }) => {
      if (values.balance) {
        return true;
      }
      return false;
    },
    colProps: {
      offset: 1,
      span: 10,
    },
  },
  {
    field: 'isOpenService',
    label: '是否已开通服务',
    component: 'RadioGroup',
    required: true,
    colProps: {
      span: 11,
    },
    componentProps: {
      options: [
        { value: 1, label: '已开通' },
        { value: 2, label: '未开通' },
      ],
    },
  },
  {
    field: 'openServiceEndDate',
    label: '服务开通的最后日期',
    component: 'DatePicker',
    labelWidth: 120,
    required: ({ values }) => {
      if (values.isOpenService == 2) {
        return true;
      }
      return false;
    },
    colProps: {
      offset: 1,
      span: 10,
    },
  },
  {
    field: 'businessUserId',
    label: '业务员',
    component: 'ApiSelect',
    required: true,
    colProps: {
      span: 22,
    },
    componentProps: {
      api: getPerformanceOptionByType,
      params: {
        type: 3,
        parId: 0,
      },
      resultField: 'list',
      labelField: 'value',
      valueField: 'id',
      immediate: true,
      onChange: (e) => {
        // console.log('selected:', e);
      },
      onOptionsChange: (options) => {
        // console.log('get options', options.length, options);
      },
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    colProps: {
      span: 22,
    },
    componentProps: {
      rows: 2,
    },
  },
  {
    field: 'effectDate',
    label: '生效日期',
    component: 'DatePicker',
    required: true,
    colProps: {
      span: 22,
    },
    itemProps: {
      extra: '此日期用于计算15天内必须回传合同的起始日期,不回传将关闭账号',
    },
  },
];
