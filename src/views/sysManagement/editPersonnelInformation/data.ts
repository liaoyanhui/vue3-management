import { FormSchema, FormProps } from '/@/components/Form';
import { regEmail } from '/@/utils/reg';

export const formSchema: FormSchema[] = [
  {
    field: 'username',
    label: '用户名',
    required: true,
    component: 'Input',
    dynamicDisabled: true,
    colProps: {
      span: 20,
    },
  },
  {
    field: 'englishName',
    label: '英文名',
    component: 'Input',
    colProps: {
      span: 20,
    },
  },
  {
    field: 'password',
    label: '密码',
    // required: true,
    component: 'InputPassword',
    helpMessage: ['不修改密码请留空'],
    colProps: {
      span: 20,
    },
  },
  {
    field: 'passwordAgain',
    label: '确认密码',
    // required: true,
    component: 'InputPassword',
    colProps: {
      span: 20,
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
    dynamicRules: ({ values }) => {
      return [
        {
          required: true,
          validator: (_, value) => {
            if (!value) {
              return Promise.reject('请输入邮箱');
            }
            if (!regEmail.test(value)) {
              return Promise.reject('邮箱格式错误');
            }
            return Promise.resolve();
          },
        },
      ];
    },
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
    field: 'isOnline',
    component: 'RadioGroup',
    label: '是否在线',
    required: true,
    colProps: {
      span: 20,
    },
    // defaultValue: 0,
    componentProps: {
      options: [
        {
          label: '在线',
          value: 1,
        },
        {
          label: '离线',
          value: 0,
        },
      ],
    },
  },
];
