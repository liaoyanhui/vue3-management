/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-12-05 14:06:01
 * @LastEditors: shangxia
 * @LastEditTime: 2023-12-05 14:24:58
 */
import { FormSchema, FormProps } from '/@/components/Form';

export const formSchema: FormSchema[] = [
  {
    field: 'checkFlag',
    label: '状态',
    component: 'RadioGroup',
    required: true,
    colProps: {
      span: 22,
    },
    componentProps: {
      options: [
        { label: '审核通过', value: 2 },
        { label: '审核不通过', value: 3 },
      ],
    },
  },
  {
    field: 'checkNote',
    label: '不通过原因',
    component: 'InputTextArea',
    colProps: {
      span: 22,
    },
    required: ({ values }) => {
      const { checkFlag } = values;
      if (checkFlag == 3) {
        return true;
      }
      return false;
    },
    componentProps: {
      rows: 4,
    },
  },
];
