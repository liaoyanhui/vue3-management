import { FormSchema, FormProps } from '/@/components/Form';
import { getMenuItemTree } from '/@/api/sys/menu';
import { useMenuStore } from '/@/store/modules/menu';

export const formSchema: FormSchema[] = [
  {
    field: 'menuType',
    component: 'Select',
    label: '类型',
    required: true,
    colProps: {
      span: 22,
    },
    componentProps: ({ formActionType }) => {
      return {
        options: [
          {
            label: '菜单',
            value: 0,
            key: '0',
          },
          {
            label: '按钮',
            value: 1,
            key: '1',
          },
          {
            label: '视图',
            value: 2,
            key: '2',
          },
        ],
        onChange: (e) => {
          const { updateSchema, clearValidate } = formActionType;
          clearValidate('path');
          if (e == 0) {
            updateSchema({
              field: 'path',
              required: true,
            });
          } else {
            updateSchema({
              field: 'path',
              required: false,
            });
          }
        },
      };
    },
  },
  {
    field: 'title',
    label: '菜单标题',
    required: true,
    component: 'Input',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'name',
    label: '菜单名',
    required: true,
    component: 'Input',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'path',
    label: '菜单路径',
    component: 'Input',
    // required: true,
    colProps: {
      span: 22,
    },
  },
  {
    field: 'code',
    component: 'Input',
    label: '权限标识',
    required: true,
    colProps: {
      span: 22,
    },
  },
  {
    field: 'component',
    component: 'Input',
    label: '菜单组件',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'redirect',
    component: 'Input',
    label: '重定向地址',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'hideMenu',
    component: 'Checkbox',
    label: '隐藏',
    defaultValue: false,
    colProps: {
      span: 10,
    },
  },
  {
    field: 'ignoreKeepAlive',
    component: 'Checkbox',
    label: '清除缓存',
    defaultValue: false,
    colProps: {
      span: 10,
    },
  },
  {
    field: 'currentActiveMenu',
    component: 'Input',
    label: '当前活动菜单',
    colProps: {
      span: 22,
    },
  },
];

export const sequenceForm: FormSchema[] = [
  {
    field: 'destSequence',
    label: '指定位置',
    // required: true,
    component: 'Input',
    slot: 'destSequence',
    colProps: {
      span: 22,
    },
  },
];
export const hierarchyForm: FormSchema[] = [
  {
    field: 'hierarchy',
    label: '上级菜单',
    component: 'TreeSelect',
    required: true,
    colProps: {
      span: 22,
    },
    componentProps: {
      replaceFields: {
        title: 'title',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
  },
];
