import { FormSchema, FormProps } from '/@/components/Form';
import { getContractSealTypeList, getContractAttributeTypeList } from '/@/api/sys/contract';
import { BasicColumn } from '/@/components/Table/src/types/table';

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '模板名称',
    required: true,
    component: 'Input',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'code',
    label: '缩写',
    component: 'Input',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'fileName',
    label: '模板文件名',
    required: true,
    component: 'Input',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'logoUrl',
    label: '页眉Logo文件',
    component: 'Input',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'sealType',
    component: 'ApiSelect',
    label: '盖章种类',
    required: true,
    colProps: {
      span: 22,
    },
    componentProps: {
      api: getContractSealTypeList,
      // params: {
      //   id: 1,
      // },
      resultField: 'list',
      labelField: 'text',
      valueField: 'value',
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
    field: 'sealPageNumber',
    component: 'Input',
    required: true,
    label: '盖章所在页码',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'pageCount',
    component: 'Input',
    label: '合同总页数',
    required: true,
    colProps: {
      span: 22,
    },
  },
  {
    field: 'coordinateX',
    component: 'Input',
    label: '盖章坐标X',
    colProps: {
      span: 10,
    },
  },
  {
    field: 'coordinateY',
    component: 'Input',
    label: '盖章坐标Y',
    colProps: {
      span: 10,
    },
  },
  {
    field: 'userCoordinateX',
    component: 'Input',
    label: '用户盖章坐标X',
    colProps: {
      span: 10,
    },
  },
  {
    field: 'userCoordinateY',
    component: 'Input',
    label: '用户盖章坐标Y',
    colProps: {
      span: 10,
    },
  },
  {
    field: 'sequence',
    component: 'Input',
    label: '排序',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'isShow',
    component: 'RadioGroup',
    label: '下拉列表是否隐藏',
    required: true,
    colProps: {
      span: 22,
    },
    defaultValue: 1,
    componentProps: {
      options: [
        {
          label: '显示',
          value: 1,
        },
        {
          label: '隐藏',
          value: 0,
        },
      ],
    },
  },
];

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 50,
    },
    {
      title: '参数名称',
      dataIndex: 'attributeName',
      width: 100,
    },
    {
      title: '输入框类型',
      dataIndex: 'attributeType',
    },
    {
      title: '是否必填',
      dataIndex: 'required',
      width: 80,
      customRender: ({ record }) => {
        const { required } = record || {};
        if (required) {
          return '必填';
        } else {
          return '非必填';
        }
      },
    },
    {
      title: '默认值',
      dataIndex: 'defaultValue',
      width: 100,
    },
    {
      title: '要替换模板中的变量',
      dataIndex: 'replaceVariable',
    },
    {
      title: '排序',
      dataIndex: 'sequence',
      width: 50,
    },
  ];
}

export const attributeForm: FormSchema[] = [
  {
    field: 'attributeName',
    label: '参数名称',
    required: true,
    component: 'Input',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'attributeType',
    component: 'ApiSelect',
    label: '输入框类型',
    required: true,
    colProps: {
      span: 22,
    },
    componentProps: {
      api: getContractAttributeTypeList,
      // params: {
      //   id: 1,
      // },
      resultField: 'list',
      labelField: 'text',
      valueField: 'value',
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
    field: 'required',
    component: 'Checkbox',
    label: '是否必填',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'defaultValue',
    label: '默认值',
    component: 'Input',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'replaceVariable',
    label: '要替换模板中的变量',
    component: 'Input',
    colProps: {
      span: 22,
    },
  },
  {
    field: 'sequence',
    label: '排序',
    component: 'Input',
    colProps: {
      span: 22,
    },
  },
];
