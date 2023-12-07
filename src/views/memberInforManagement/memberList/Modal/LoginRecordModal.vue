<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="登录记录"
    @ok="handleSubmit"
    :destroyOnClose="true"
    :width="1000"
    :footer="null"
  >
    <BasicTable @register="registerTable">
      <template #companyInfo="{ record }">
        <div>
          <div>{{ record.userName }}</div>
          <div>{{ record.companyName }}</div>
          <!-- <div>{{ record.companyName }}</div> -->
        </div>
      </template>
    </BasicTable>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, UnwrapRef, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable } from '/@/components/Table';
  import { useMemberStore } from '/@/store/modules/member';
  import { getBasicColumns, searchCondition } from './data';

  export default defineComponent({
    name: 'LoginRecordModal',
    components: { BasicModal, BasicTable },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const memberStore = useMemberStore();

      const userId = ref<number | null>(null);
      const [register, { closeModal, setModalProps }] = useModalInner((data) => {
        userId.value = data.userId;
      });

      const [registerTable, { getForm, reload }] = useTable({
        // title: '开启搜索区域',
        api: (params) => {
          return memberStore.getMemberLoginHistoryPagedList({
            ...params,
            userId: userId.value,
          });
        },
        columns: getBasicColumns(),
        useSearchForm: true,
        formConfig: searchCondition(),
        showTableSetting: false,
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
      return {
        register,
        registerTable,
        closeModal,
        handleSubmit,
      };
    },
  });
</script>

<style lang="less" scoped></style>
