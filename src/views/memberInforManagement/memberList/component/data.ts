import { FormSchema, FormProps } from '/@/components/Form';
import { getContractAdminUserList } from '/@/api/sys/contract';

export const formSchema: FormSchema[] = [
  {
    field: 'companyName',
    label: '公司名',
    component: 'Input',
    required: true,
    dynamicDisabled: ({ values }) => {
      const { modelType } = values;
      return modelType == 1 ? true : false;
    },
    colProps: {
      span: 11,
    },
  },
  {
    field: 'companyShortName',
    label: '公司简称',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      const { modelType } = values;
      return modelType == 1 ? true : false;
    },
    colProps: {
      span: 11,
    },
  },
  {
    field: 'companyType',
    label: '公司类型',
    required: true,
    component: 'Select',
    colProps: {
      span: 11,
    },
    dynamicDisabled: ({ values }) => {
      const { modelType } = values;
      return modelType == 1 ? true : false;
    },
    componentProps: {
      options: [
        { label: '原厂制造商', value: 1 },
        { label: '贸易/代理/分销', value: 2 },
        { label: '其他供应商', value: 3 },
        { label: '生产制造商', value: 4 },
      ],
    },
  },

  {
    field: 'localMap',
    label: '公司所在地',
    required: true,
    defaultValue: 'demo',
    component: 'Input',
    slot: 'localMap',
    colProps: {
      span: 11,
    },
  },
  {
    field: 'companyAddress',
    label: '街道地址',
    component: 'Input',
    required: true,
    dynamicDisabled: ({ values }) => {
      const { modelType } = values;
      return modelType == 1 ? true : false;
    },
    colProps: {
      span: 11,
    },
  },
  {
    field: 'mainApplications',
    label: '主营应用领域',
    required: true,
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      const { modelType } = values;
      return modelType == 1 ? true : false;
    },
    colProps: {
      span: 22,
    },
    slot: 'mainApplications',
  },
  {
    field: 'companyProfile',
    label: '公司简介',
    required: true,
    component: 'InputTextArea',
    dynamicDisabled: ({ values }) => {
      const { modelType } = values;
      return modelType == 1 ? true : false;
    },
    colProps: {
      span: 22,
    },
    componentProps: {
      rows: 4,
    },
  },
  {
    field: 'contact',
    label: '联系人',
    required: true,
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      const { modelType } = values;
      return modelType == 1 ? true : false;
    },
    colProps: {
      span: 11,
    },
  },
  {
    field: 'email',
    label: '电子邮箱',
    required: true,
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      const { modelType } = values;
      return modelType == 1 ? true : false;
    },
    colProps: {
      span: 11,
    },
  },
  {
    field: 'telephone',
    label: '电话',
    required: true,
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      const { modelType } = values;
      return modelType == 1 ? true : false;
    },
    colProps: {
      span: 11,
    },
  },
  {
    field: 'mobilePhone',
    label: '手机',
    required: true,
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      const { modelType } = values;
      return modelType == 1 ? true : false;
    },
    colProps: {
      span: 11,
    },
  },
  {
    field: 'qq',
    label: 'QQ',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      const { modelType } = values;
      return modelType == 1 ? true : false;
    },
    colProps: {
      span: 11,
    },
  },
];

export const memberFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '用户名',
    required: true,
    component: 'Input',
    dynamicDisabled: true,
    colProps: {
      span: 11,
    },
  },
  {
    field: 'password',
    label: '密码',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      const { modelType } = values;
      return modelType == 1 ? true : false;
    },
    colProps: {
      span: 11,
    },
    suffix: '(不修改密码请留空)',
  },
  {
    field: 'userType',
    label: '会员类型',
    component: 'Select',
    required: true,
    dynamicDisabled: ({ values }) => {
      const { modelType } = values;
      return modelType == 1 ? true : false;
    },
    colProps: {
      span: 11,
    },
    componentProps: {
      options: [
        { label: '供应商', value: 1 },
        { label: '采购商', value: 2 },
      ],
    },
  },
  {
    field: 'state',
    label: '会员状态',
    component: 'RadioGroup',
    required: true,
    dynamicDisabled: ({ values }) => {
      const { modelType } = values;
      return modelType == 1 ? true : false;
    },
    colProps: {
      span: 11,
    },
    componentProps: {
      options: [
        { label: '正常', value: 1 },
        { label: '停用', value: 2 },
      ],
    },
  },
  {
    field: 'businessSysUserId',
    label: '业务专员',
    component: 'ApiSelect',
    dynamicDisabled: ({ values }) => {
      const { modelType } = values;
      return modelType == 1 ? true : false;
    },
    colProps: {
      span: 11,
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
  {
    field: 'addDate',
    label: '注册时间',
    component: 'Input',
    dynamicDisabled: true,
    colProps: {
      span: 11,
    },
  },
  {
    field: 'loginTime',
    label: '最后登录时间',
    component: 'Input',
    show: false,
  },
  {
    field: 'loginIP',
    label: '最后登录IP',
    component: 'Input',
    show: false,
  },
  {
    field: 'lastLoginDate',
    label: '最后登录时间',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      const { modelType } = values;
      return modelType == 1 ? true : false;
    },
    colProps: {
      span: 11,
    },
    slot: 'lastLoginDate',
  },
  {
    field: 'loginTimes',
    label: '登录次数',
    component: 'Input',
    dynamicDisabled: true,
    colProps: {
      span: 11,
    },
  },
  {
    field: 'autoRefreshCount',
    label: '库存委托刷新次数',
    component: 'Input',
    dynamicDisabled: ({ values }) => {
      const { modelType } = values;
      return modelType == 1 ? true : false;
    },
    defaultValue: 0,
    colProps: {
      span: 11,
    },
  },
];

export const memberInfo: FormSchema[] = [
  {
    field: 'payType',
    label: '收费类型',
    component: 'Select',
    colProps: {
      span: 12,
    },
    required: true,
    componentProps: {
      options: [
        { label: '免费会员', value: 1 },
        { label: '付费会员', value: 2 },
        { label: '赠送会员', value: 3 },
      ],
    },
  },
  {
    field: 'serviceGrade',
    label: '会员类型',
    component: 'Select',
    colProps: {
      span: 12,
    },
    required: true,
    componentProps: {
      options: [
        { label: '芯标准', value: 1 },
        { label: '芯600', value: 2 },
      ],
    },
  },
  {
    field: 'state',
    label: '状态',
    component: 'RadioGroup',
    required: true,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 2 },
      ],
    },
    colProps: {
      span: 24,
    },
  },
  {
    field: 'startDate',
    label: '生效日期',
    component: 'DatePicker',
    colProps: {
      span: 12,
    },
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('请输入生效日期');
            }
            const startTime = value.valueOf();
            const endTime = values.endDate ? values.endDate.valueOf() : null;
            if (endTime) {
              if (startTime >= endTime) {
                return Promise.reject('生效日期需小于到期日期');
              }
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
  {
    field: 'endDate',
    label: '到期日期',
    component: 'DatePicker',
    colProps: {
      span: 12,
    },
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('请输入到期日期');
            }
            const endTime = value.valueOf();
            const startTime = values.startDate ? values.startDate.valueOf() : null;
            if (startTime) {
              if (startTime >= endTime) {
                return Promise.reject('生效日期需小于到期日期');
              }
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
  {
    field: 'stockConfig',
    label: '库存发布限制',
    component: 'Input',
    required: true,
    defaultValue: 'demo',
    slot: 'stockConfig',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    colProps: {
      span: 24,
    },
    componentProps: {
      rows: 4,
    },
  },
];

export const stockInfo: FormSchema[] = [
  {
    field: 'payType',
    label: '收费类型',
    component: 'Select',
    colProps: {
      span: 12,
    },
    required: true,
    componentProps: {
      options: [
        { label: '免费会员', value: 1 },
        { label: '付费会员', value: 2 },
        { label: '赠送会员', value: 3 },
      ],
    },
  },
  {
    field: 'state',
    label: '状态',
    component: 'RadioGroup',
    required: true,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 2 },
      ],
    },
    colProps: {
      span: 12,
    },
  },
  {
    field: 'startDate',
    label: '生效日期',
    component: 'DatePicker',
    colProps: {
      span: 12,
    },
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('请输入生效日期');
            }
            const startTime = value.valueOf();
            const endTime = values.endDate ? values.endDate.valueOf() : null;
            if (endTime) {
              if (startTime >= endTime) {
                return Promise.reject('生效日期需小于到期日期');
              }
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
  {
    field: 'endDate',
    label: '到期日期',
    component: 'DatePicker',
    colProps: {
      span: 12,
    },
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('请输入到期日期');
            }
            const endTime = value.valueOf();
            const startTime = values.startDate ? values.startDate.valueOf() : null;
            if (startTime) {
              if (startTime >= endTime) {
                return Promise.reject('生效日期需小于到期日期');
              }
            }
            return Promise.resolve();
          },
        },
      ];
    },
  },
  {
    field: 'stockConfig',
    label: '库存发布限制',
    component: 'Input',
    required: true,
    defaultValue: 'demo',
    slot: 'stockConfig',
    colProps: {
      span: 24,
    },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'InputTextArea',
    colProps: {
      span: 24,
    },
    componentProps: {
      rows: 4,
    },
  },
];
