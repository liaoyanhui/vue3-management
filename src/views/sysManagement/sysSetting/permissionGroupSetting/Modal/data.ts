/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-07 11:35:39
 * @LastEditors: shangxia
 * @LastEditTime: 2023-04-10 10:21:35
 */
import { FormSchema, FormProps } from '/@/components/Form';

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '组名',
    required: true,
    component: 'Input',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'note',
    label: '说明',
    required: true,
    component: 'Input',
    colProps: {
      span: 22,
    },
  },
];
export const permissionForm: FormSchema[] = [
  {
    field: 'name',
    label: '组名',
    // required: true,
    component: 'Input',
    slot: 'name',
    colProps: {
      span: 22,
    },
  },
];
