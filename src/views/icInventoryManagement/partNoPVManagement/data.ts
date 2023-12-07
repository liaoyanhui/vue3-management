/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-12-02 17:12:59
 * @LastEditors: shangxia
 * @LastEditTime: 2023-12-05 14:37:35
 */
import { BasicColumn, FormProps } from '/@/components/Table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '型号',
      dataIndex: 'partNo',
    },
    {
      title: '图片',
      dataIndex: 'pic',
      slots: { customRender: 'pic' },
    },
    {
      title: '视频',
      dataIndex: 'video',
      width: 120,
      slots: { customRender: 'video' },
    },
    {
      title: '上传时间',
      dataIndex: 'addDate',
    },
    {
      title: '审核状态',
      dataIndex: 'checkFlag',
      format: (value: any, record: any) => {
        const { informalCheckFlag } = record;
        const key = informalCheckFlag ? informalCheckFlag : value;
        switch (key) {
          case 1:
            return '审核中';
          case 2:
            return '审核通过';
          case 3:
            return '审核不通过';
          default:
            return '';
        }
      },
    },
    {
      title: '不通过原因',
      dataIndex: 'checkNote',
    },
  ];
}

export function searchBasic(): Partial<FormProps> {
  return {
    labelWidth: 60,
    schemas: [
      {
        field: 'partNo',
        label: '型号',
        component: 'Input',
        colProps: {
          xl: 6,
          xxl: 4,
        },
      },
      {
        field: 'checkFlag',
        label: '审核状态',
        component: 'Select',
        colProps: {
          xl: 6,
          xxl: 4,
        },
        labelWidth: 80,
        componentProps: {
          options: [
            { label: '待审核', value: 1 },
            { label: '审核通过', value: 2 },
            { label: '审核不通过', value: 3 },
          ],
        },
      },
    ],
  };
}
