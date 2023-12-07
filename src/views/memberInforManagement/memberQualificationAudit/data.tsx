/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-14 18:22:38
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-21 10:29:22
 */
import { FormSchema, FormProps } from '/@/components/Form';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { getUserPictureTypeList } from '/@/api/sys/common';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 60,
    },
    {
      title: '证书分类',
      dataIndex: 'pictureTypeDesc',
      format: (value: any, record: any) => {
        if (record.checkFlag != 2 && record.checkUrl) {
          return record.checkPictureTypeDesc;
        } else {
          return value;
        }
      },
    },
    {
      title: '图片',
      dataIndex: 'pic',
      slots: { customRender: 'pic' },
    },
    {
      title: '是否在商铺展示',
      dataIndex: 'isShopShow',
      format: (value: any, record: any) => {
        if (record.checkFlag != 2 && record.checkUrl) {
          return record.checkIsShopShow ? '是' : '否';
        } else {
          return value ? '是' : '否';
        }
      },
    },
    {
      title: '上传日期',
      dataIndex: 'addDate',
    },
    {
      title: '审核状态',
      dataIndex: 'checkFlag',
      customRender: ({ record }) => {
        const { checkFlag } = record || {};
        if (checkFlag == 1) {
          return '待审核';
        } else if (checkFlag == 2) {
          return <span style="color: green">审核通过</span>;
        } else {
          return <span style="color: red">审核不通过</span>;
        }
      },
    },
    {
      title: '不通过原因',
      dataIndex: 'errorMsg',
    },
  ];
}

export function searchCondition(): Partial<FormProps> {
  return {
    labelWidth: 80,
    schemas: [
      // {
      //   field: 'keyWord',
      //   label: '关键词',
      //   component: 'Input',
      //   labelWidth: 70,
      //   colProps: {
      //     xl: 6,
      //     xxl: 5,
      //   },
      // },
      {
        field: 'pictureType',
        label: '执照类型',
        component: 'ApiSelect',
        colProps: {
          xl: 6,
          xxl: 4,
        },
        componentProps: {
          api: getUserPictureTypeList,
          resultField: 'list',
          // use name as label
          labelField: 'text',
          // use id as value
          valueField: 'value',
          // not request untill to select
          immediate: true,
          onChange: (e) => {
            console.log('selected:', e);
          },
          onOptionsChange: (options) => {},
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
        componentProps: {
          options: [
            { label: '待审核', value: '1' },
            { label: '审核通过', value: '2' },
            { label: '审核不通过', value: '3' },
          ],
        },
      },
    ],
  };
}
