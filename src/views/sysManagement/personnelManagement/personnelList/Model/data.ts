import { FormSchema, FormProps } from '/@/components/Form';

export const formSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    component: 'Input',
    dynamicDisabled: true,
    colProps: {
      span: 22,
    },
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    helpMessage: ['不修改密码请留空'],
    colProps: {
      span: 22,
    },
  },
  {
    field: 'realName',
    label: '姓名',
    component: 'Input',
    required: true,
    colProps: {
      span: 22,
    },
  },
  {
    field: 'acronym',
    component: 'Input',
    label: '姓名启始拼音',
    required: true,
    colProps: {
      span: 22,
    },
  },
  {
    field: 'sex',
    component: 'RadioGroup',
    label: '性别',
    required: true,
    colProps: {
      span: 22,
    },
    // defaultValue: 0,
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
      span: 22,
    },
    slot: 'pictureUrl',
  },
  {
    field: 'tel',
    label: '联系电话',
    component: 'Input',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'qq',
    label: 'QQ',
    component: 'Input',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'email',
    label: 'Email',
    component: 'Input',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'openID',
    label: '微信OpenID',
    component: 'Input',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'wechatUrl',
    label: '微信二维码',
    component: 'Input',
    colProps: {
      span: 22,
    },
    slot: 'wechatUrl',
  },
  {
    field: 'videoPic',
    label: '个人视频',
    component: 'Input',
    colProps: {
      span: 22,
    },
    slot: 'videoPic',
  },
  {
    field: 'roleIds',
    label: '所属权限组',
    component: 'Input',
    required: true,
    defaultValue: 'demo',
    colProps: {
      span: 22,
    },
    slot: 'roleIds',
  },
];
