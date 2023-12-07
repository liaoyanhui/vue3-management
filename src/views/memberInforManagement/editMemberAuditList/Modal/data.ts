/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-27 11:14:49
 * @LastEditors: shangxia
 * @LastEditTime: 2023-04-10 10:24:45
 */
import { FormSchema, FormProps } from '/@/components/Form';

export const auditFormSchema: FormSchema[] = [
  {
    field: 'auditMessage',
    component: 'InputTextArea',
    required: true,
    label: '不通过原因',
    colProps: {
      span: 22,
    },
    componentProps: {
      rows: 4,
    },
  },
];
