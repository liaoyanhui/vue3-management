<!--
 * @Description: 
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-03-27 15:59:02
 * @LastEditors: shangxia
 * @LastEditTime: 2023-07-26 15:07:31
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="现货库存"
    @ok="handleSubmit"
    :destroyOnClose="true"
    :width="1000"
    :footer="null"
  >
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Button type="primary" @click="handleOpen"> 导出Excel </Button>
      </template>
    </BasicTable>
    <ExpExcelModal @register="register1" @success="defaultHeader" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, UnwrapRef, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { useMemberStore } from '/@/store/modules/member';
  import { getStockColumns, stockSearch } from './data';
  import { Button, message } from 'ant-design-vue';
  import { jsonToSheetXlsx, ExpExcelModal, ExportModalResult } from '/@/components/Excel';
  import { useModal } from '/@/components/Modal';

  export default defineComponent({
    name: 'AdvantageStockRecordModal',
    components: { BasicModal, BasicTable, Button, ExpExcelModal },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const memberStore = useMemberStore();
      const [register1, { openModal }] = useModal();

      const userId = ref<number | null>(null);
      const [register, { closeModal, setModalProps }] = useModalInner((data) => {
        userId.value = data.userId;
      });

      const excelData = ref<any>(null);
      const [registerTable, { getForm, reload }] = useTable({
        api: (params) => {
          return memberStore.getAdvantageStockPagedList({
            ...params,
            userId: userId.value,
          });
        },
        columns: getStockColumns(),
        useSearchForm: true,
        formConfig: stockSearch(),
        showTableSetting: true,
        tableSetting: { fullScreen: true },
        showIndexColumn: false,
        rowKey: 'id',
        ellipsis: false,
        scroll: { y: 300 },
        // actionColumn: {
        //   width: 200,
        //   title: '操作',
        //   dataIndex: 'action',
        //   slots: { customRender: 'action' },
        // },
      });

      function handleSubmit() {}

      function defaultHeader({ filename, bookType }: ExportModalResult) {
        // 默认Object.keys(data[0])作为header
        const data = excelData.value;
        if (data && data.length > 0) {
          const newData = data.map((item) => {
            return {
              ID: item.id, // id
              型号: item.partNo, // 型号
              厂商: item.brand, // 厂商
              封装: item.pack, // 封装
              批号: item.dc, // 批号
              数量: item.qty, // 数量
              说明: item.note, // 说明
            };
          });
          jsonToSheetXlsx({
            data: newData,
            // header: ['ID', '型号', '厂商', '封装', '批号', '数量', '说明'],
            filename,
            write2excelOpts: {
              bookType,
            },
          });
        } else {
          message.warn('没有数据可以导出!');
        }
      }

      function handleOpen() {
        memberStore.exportAdvantageStockData({ userId: userId.value }).then((res) => {
          excelData.value = res || [];
          openModal();
        });
      }

      return {
        register,
        registerTable,
        closeModal,
        handleSubmit,
        defaultHeader,
        register1,
        openModal,
        handleOpen,
      };
    },
  });
</script>

<style lang="less" scoped></style>
