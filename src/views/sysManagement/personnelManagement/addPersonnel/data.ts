import { FormSchema, FormProps } from '/@/components/Form';

export const formSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '用户名',
    required: true,
    component: 'Input',
    colProps: {
      span: 20,
    },
  },
  {
    field: 'password',
    label: '密码',
    required: true,
    component: 'InputPassword',
    colProps: {
      span: 20,
    },
  },
  {
    field: 'realName',
    label: '姓名',
    required: true,
    component: 'Input',
    colProps: {
      span: 20,
    },
  },
  {
    field: 'acronym',
    label: '姓名启始拼音',
    required: true,
    component: 'Input',
    colProps: {
      span: 20,
    },
    helpMessage: ['如 李泽锋 则填写 LZF'],
  },
  {
    field: 'sex',
    component: 'RadioGroup',
    label: '性别',
    required: true,
    colProps: {
      span: 20,
    },
    defaultValue: 0,
    componentProps: {
      options: [
        {
          label: '男',
          value: 0,
        },
        {
          label: '女',
          value: 1,
        },
      ],
    },
  },
  {
    field: 'pictureUrl',
    label: '照片',
    component: 'Input',
    colProps: {
      span: 20,
    },
    slot: 'pictureUrl',
  },
  {
    field: 'wechatUrl',
    label: '微信二维码',
    component: 'Input',
    colProps: {
      span: 20,
    },
    slot: 'wechatUrl',
  },
  {
    field: 'videoPic',
    label: '个人视频',
    component: 'Input',
    colProps: {
      span: 20,
    },
    slot: 'videoPic',
  },
  {
    field: 'tel',
    label: '联系电话',
    component: 'Input',
    colProps: {
      span: 20,
    },
  },
  {
    field: 'qq',
    label: 'QQ',
    component: 'Input',
    colProps: {
      span: 20,
    },
  },
  {
    field: 'email',
    label: 'Email',
    component: 'Input',
    colProps: {
      span: 20,
    },
  },
  {
    field: 'openID',
    label: '微信OpenID',
    component: 'Input',
    colProps: {
      span: 20,
    },
  },
  {
    field: 'roleIds',
    label: '所属权限组',
    component: 'Input',
    required: true,
    defaultValue: 'demo',
    colProps: {
      span: 20,
    },
    slot: 'roleIds',
  },
];
