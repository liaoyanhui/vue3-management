/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-10 10:34:55
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-22 09:38:17
 */
import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
      // fixed: 'left',
    },
    {
      title: '模板名称',
      dataIndex: 'name',
      // width: 200,
    },
    {
      title: '缩写',
      dataIndex: 'code',
      width: 100,
    },
    {
      title: '在下拉列表是否隐藏',
      width: 80,
      dataIndex: 'isShow',
      customRender: ({ record }) => {
        const { isShow } = record || {};
        if (isShow) {
          return '显示';
        } else {
          return '隐藏';
        }
      },
    },
    {
      title: '模板文件',
      dataIndex: 'fileName',
      width: 200,
    },
    {
      title: '盖章所在页码',
      dataIndex: 'sealPageNumber',
      width: 100,
    },
    {
      title: '合同总页数',
      dataIndex: 'pageCount',
      width: 100,
    },
    {
      title: '排序',
      dataIndex: 'sequence',
      width: 50,
    },
    {
      title: '页眉Logo文件',
      dataIndex: 'logoUrl',
      slots: { customRender: 'logoUrl' },
    },
    {
      title: '盖章坐标',
      dataIndex: 'coordinate',
      slots: { customRender: 'coordinate' },
    },
  ];
}

export function searchCondition(): Partial<FormProps> {
  return {
    labelWidth: 60,
    schemas: [
      {
        field: 'Keyword',
        label: '关键词',
        component: 'Input',
        colProps: {
          xl: 6,
          xxl: 5,
        },
      },
    ],
  };
}
