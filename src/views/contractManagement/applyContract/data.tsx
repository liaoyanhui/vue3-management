import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { getContractAdminUserList, getContractTemplateList } from '/@/api/sys/contract';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      // fixed: 'left',
      width: 60,
      // defaultHidden: true,
    },
    {
      title: '公司名',
      dataIndex: 'companyName',
      width: 250,
      slots: { customRender: 'companyName' },
    },
    {
      title: '图片',
      dataIndex: 'pictures',
      width: 200,
      slots: { customRender: 'pictures' },
    },
    {
      title: '业务员',
      dataIndex: 'servicerName',
    },
    {
      title: '合同类型',
      dataIndex: 'templateName',
    },
    {
      title: '赠送服务',
      dataIndex: 'note',
    },
    {
      title: '申请时间',
      dataIndex: 'addDate',
    },
    {
      title: '审核状态',
      dataIndex: 'checkFlag',
      customRender: ({ record }) => {
        const { checkFlag } = record || {};
        if (checkFlag == 0) {
          return '待审核';
        } else if (checkFlag == 1) {
          return <span style="color: green">审核通过，待用户盖章</span>;
        } else if (checkFlag == 2) {
          return <span style="color: red">审核未通过</span>;
        } else {
          return '已盖章';
        }
      },
    },
    {
      title: '不通过原因',
      dataIndex: 'errorMsg',
      format: (value: any, record: any) => {
        if (record.checkFlag == 2) {
          return value;
        }
        return '';
      },
    },
    {
      title: '操作',
      dataIndex: 'audit',
      width: 130,
      fixed: 'right',
      slots: { customRender: 'audit' },
    },
    {
      title: '删除',
      dataIndex: 'del',
      width: 80,
      fixed: 'right',
      slots: { customRender: 'del' },
    },
  ];
}

export function searchCondition(): Partial<FormProps> {
  return {
    labelWidth: 90,
    schemas: [
      {
        field: 'keyWord',
        label: '公司名',
        component: 'Input',
        labelWidth: 70,
        colProps: {
          xl: 4,
          xxl: 4,
        },
      },
      {
        field: 'checkFlag',
        label: '审核状态',
        component: 'Select',
        colProps: {
          xl: 7,
          xxl: 6,
        },
        componentProps: {
          options: [
            { label: '待审核', value: '0' },
            { label: '审核通过，待用户盖章', value: '1' },
            { label: '审核未通过', value: '2' },
            { label: '已盖章', value: '3' },
          ],
        },
      },
      {
        field: 'userId',
        label: '业务专员',
        component: 'ApiSelect',
        colProps: {
          xl: 4,
          xxl: 3,
        },
        componentProps: {
          api: getContractAdminUserList,
          resultField: 'list',
          // use name as label
          labelField: 'userName',
          // use id as value
          valueField: 'userId',
          // not request untill to select
          immediate: true,
          onChange: (e) => {
            console.log('selected:', e);
          },
          onOptionsChange: (options) => {},
        },
      },
      {
        field: 'templateId',
        label: '合同类型',
        component: 'ApiSelect',
        componentProps: {
          api: getContractTemplateList,
          resultField: 'list',
          // use name as label
          labelField: 'name',
          // use id as value
          valueField: 'id',
          // not request untill to select
          immediate: true,
          onChange: (e) => {
            console.log('selected:', e);
          },
          onOptionsChange: (options) => {},
        },
        colProps: {
          xl: 4,
          xxl: 4,
        },
      },
    ],
  };
}
