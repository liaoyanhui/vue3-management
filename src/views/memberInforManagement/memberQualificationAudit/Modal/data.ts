/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-15 14:07:27
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-20 18:03:18
 */
import { FormSchema, FormProps } from '/@/components/Form';
import { getUserPictureCheckMessageList } from '/@/api/sys/member';

export const auditFormSchema: FormSchema[] = [
  {
    field: 'remark',
    component: 'InputTextArea',
    required: true,
    label: '不通过原因',
    componentProps: {
      rows: 4,
    },
    colProps: {
      span: 22,
    },
  },
  // {
  //   field: 'msg',
  //   component: 'ApiSelect',
  //   label: '快速选择',
  //   colProps: {
  //     span: 22,
  //   },
  //   componentProps: ({ formActionType }) => {
  //     return {
  //       api: getUserPictureCheckMessageList,
  //       resultField: 'list',
  //       // use name as label
  //       labelField: 'text',
  //       // use id as value
  //       valueField: 'value',
  //       // not request untill to select
  //       immediate: true,
  //       onChange: (e, i) => {
  //         const { setFieldsValue, clearValidate } = formActionType;
  //         setFieldsValue({
  //           errorMsg: i.label,
  //         });
  //       },
  //       onOptionsChange: (options) => {},
  //       style: 'width: 330px',
  //     };
  //   },
  // },
];
