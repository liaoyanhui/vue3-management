<!--
 * @Description: 申请合同管理
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-10 10:18:12
 * @LastEditors: shangxia
 * @LastEditTime: 2023-12-05 14:56:09
-->
<template>
  <div>
    <BasicTable bordered @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '上传发票',
              onClick: handleEditInvoice.bind(null, record),
            },
          ]"
        />
      </template>
      <template #toolbar>
        <Button type="primary" @click="handleDownInvoiceInfo">下载发票信息</Button>
        <Button type="primary" @click="handleBatchUploadInvoiceInfo">批量上传发票信息</Button>
      </template>
      <template #companyInfo="{ record }">
        <div>
          <div>{{ record.userName }}</div>
          <div>{{ record.companyName }}</div>
        </div>
      </template>
      <template #invoiceInfo="{ record }">
        <div class="text-left">
          <div>{{ record.companyName }}</div>
          <div>{{ record.taxpayerNumber }}</div>
          <div>{{ record.address }} {{ record.telePhone }}</div>
          <div>{{ record.bankName }} {{ record.bankNumber }}</div>
          <div></div>
        </div>
      </template>
      <template #invoicePic="{ record }">
        <div v-for="(item, index) in record.invoicePicsUrl.split('|')" :key="index">
          <div v-if="pdfReg.test(item)">
            <span class="check-pdf" @click="handleCheckPDF(item)">查看pdf文件</span>
          </div>
          <div v-else>
            <Image :src="item" :width="60" />
          </div>
        </div>
      </template>
    </BasicTable>
    <UploadInvoiceModal @register="register1" @success="handleSuccess" />
    <BatchUploadInvoiceInfoModal @register="register2" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, searchCondition } from './data';
  import { message, Image, Button } from 'ant-design-vue';

  import { useInvoiceStore } from '/@/store/modules/invoice';
  import { usePermission } from '/@/hooks/web/usePermission';
  import permissionListSetting from '/@/settings/permissionListSetting';
  import UploadInvoiceModal from './Modal/UploadInvoiceModal.vue';
  import { useModal } from '/@/components/Modal';
  import { pdfReg } from '/@/utils/reg';
  import { downloadByData } from '/@/utils/file/download';
  import BatchUploadInvoiceInfoModal from './Modal/BatchUploadInvoiceInfoModal.vue';

  export default defineComponent({
    components: {
      BasicTable,
      TableAction,
      Image,
      UploadInvoiceModal,
      Button,
      BatchUploadInvoiceInfoModal,
    },
    setup() {
      const invoiceStore = useInvoiceStore();
      const { hasPermission } = usePermission();
      const [register1, { openModal }] = useModal();
      const [register2, { openModal: openModalB }] = useModal();

      const [registerTable, { getForm, reload, getPaginationRef }] = useTable({
        api: (params) => {
          return invoiceStore.getInvoicePageList(params);
        },
        columns: getBasicColumns(),
        useSearchForm: true,
        formConfig: searchCondition(),
        showTableSetting: true,
        tableSetting: { fullScreen: true },
        showIndexColumn: false,
        rowKey: 'id',
        ellipsis: false,
        actionColumn: {
          width: 90,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleEditInvoice(record: any) {
        openModal(true, {
          record,
        });
      }

      function handleDownInvoiceInfo() {
        const fieldsValue = getForm().getFieldsValue();
        const data = {
          userName: fieldsValue.userName || null,
          invoiceState: fieldsValue.invoiceState || null,
          invoiceType: fieldsValue.invoiceType || null,
          invoiceCompany: fieldsValue.invoiceCompany || null,
        };
        invoiceStore.exportInvoiceList(data).then((res) => {
          if (res) {
            downloadByData(res, '发票信息', 'application/vnd.ms-excel;');
          } else {
            message.error('下载失败');
          }
        });
      }

      function handleCheckPDF(url: string) {
        window.open(url, '_blank');
      }
      function handleSuccess() {
        reload();
      }

      // 批量上传发票信息
      function handleBatchUploadInvoiceInfo() {
        openModalB(true);
      }

      return {
        registerTable,
        hasPermission,
        permissionListSetting,
        handleEditInvoice,
        handleSuccess,
        register1,
        register2,
        openModalB,
        handleDownInvoiceInfo,
        pdfReg,
        handleCheckPDF,
        handleBatchUploadInvoiceInfo,
      };
    },
  });
</script>

<style lang="less" scoped>
  img.contract-pic {
    width: auto;
    height: 50px;
    cursor: pointer;
  }
  .check-pdf {
    color: @primary-color;
    cursor: pointer;
  }
</style>
