<template>
  <div>
    <BasicTable
      bordered
      @register="registerTable"
      :rowSelection="{ type: 'checkbox', selectedRowKeys: checkedKeys, onChange: onSelectChange }"
    >
      <template #companyName="{ record }">
        <div class="company-info">
          <div>公司名:{{ record.companyName }}</div>
          <div>合同编号:{{ record.contractNumber }}</div>
        </div>
      </template>
      <template #pictures="{ record, text }">
        <div class="img-list">
          <ImagePreview :imageList="text" />
          <!-- <div class="down" @click="handleDown(record.id)">查看PDF</div> -->
        </div>
      </template>
      <template #coordinate="{ record }">
        <div> x: {{ record.coordinateX }} y: {{ record.coordinateY }} </div>
      </template>
      <template #audit="{ record }">
        <div v-if="record.isBindUser">
          <div v-if="record.checkFlag != 0 && record.checkFlag != 2">
            <div v-if="record.verified">
              <div style="color: green">业绩已录({{ record.realPrice }})</div>
              <div>{{ record.realPayDate }}</div>
            </div>
            <Button type="link" @click="handleInput(record.id)">录入业绩</Button>
          </div>
        </div>
        <div v-else>
          <Button type="link" @click="handleBind(record)">绑定用户</Button>
        </div>
      </template>
      <template #del="{ record }">
        <TableAction
          :actions="[
            {
              label: '删除',
              popConfirm: {
                title: '是否删除?',
                confirm: handleDelete.bind(null, record),
              },
              ifShow: hasPermission(permissionListSetting.CONTRACT_ENTITY_DELETE),
            },
          ]"
        />
      </template>
      <template #action="{ record }">
        <TableAction
          :divider="false"
          :actions="[
            {
              label: '编辑合同',
              onClick: handleEdit.bind(null, record),
              ifShow:
                hasPermission(permissionListSetting.CONTRACT_ENTITY_UPDATE) &&
                (record.checkFlag === 0 || record.checkFlag === 2),
            },
            {
              label: '审核' + (record.checkFlag !== 0 ? '(' + record.checkerName + ')' : ''),
              onClick: handleAudit.bind(null, record),
              ifShow:
                hasPermission(permissionListSetting.CONTRACT_ENTITY_CHECK) && record.checkFlag != 3,
            },
          ]"
        />
      </template>
      <template #toolbar>
        <a-button
          v-if="hasPermission(permissionListSetting.CONTRACT_ENTITY_ADD)"
          type="primary"
          @click="handleAddContract"
          >申请合同</a-button
        >
        <a-button
          v-if="hasPermission(permissionListSetting.CONTRACT_ENTITY_DELETE)"
          type="primary"
          @click="handleDeleteMore"
          >批量删除</a-button
        >
      </template>
    </BasicTable>
    <ApplyContractModal @register="register1" @success="handleSuccess" :destroyOnClose="true" />
    <AuditContractModal @register="register2" @success="handleSuccess" :destroyOnClose="true" />
    <BindUserModal @register="register3" @success="handleSuccess" :destroyOnClose="true" />
    <EditContractModal @register="register4" @success="handleSuccess" :destroyOnClose="true" />
    <EnterPerformanceModal @register="register5" @success="handleSuccess" :destroyOnClose="true" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, searchCondition } from './data';
  import { message, Image, Button } from 'ant-design-vue';

  import { useContractStore } from '/@/store/modules/contract';
  import { useModal } from '/@/components/Modal';
  import ApplyContractModal from './Modal/ApplyContractModal.vue';
  import AuditContractModal from './Modal/AuditContractModal.vue';
  import BindUserModal from './Modal/BindUserModal.vue';
  import EditContractModal from './Modal/EditContractModal.vue';
  import { ImagePreview } from '/@/components/Preview/index';
  import { usePermission } from '/@/hooks/web/usePermission';
  import permissionListSetting from '/@/settings/permissionListSetting';
  import EnterPerformanceModal from './Modal/EnterPerformanceModal.vue';

  export default defineComponent({
    components: {
      BasicTable,
      TableAction,
      Image,
      ApplyContractModal,
      AuditContractModal,
      BindUserModal,
      EditContractModal,
      ImagePreview,
      Button,
      EnterPerformanceModal,
    },
    setup() {
      const { hasPermission } = usePermission();
      const contractStore = useContractStore();
      const checkedKeys = ref<Array<string | number>>([]);

      const [register1, { openModal }] = useModal();
      const [register2, { openModal: openModalE }] = useModal();
      const [register3, { openModal: openModalC }] = useModal();
      const [register4, { openModal: openModal4 }] = useModal();
      const [register5, { openModal: openModal5 }] = useModal();
      const [registerTable, { getForm, reload }] = useTable({
        // title: '开启搜索区域',
        // api: getGeneralStockPagedList,
        api: (params) => {
          return contractStore.getContractPagedList(params);
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
          width: 180,
          title: '审核',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function onSelectChange(selectedRowKeys: (string | number)[]) {
        checkedKeys.value = selectedRowKeys;
      }

      function handleAudit(record: any) {
        openModalE(true, {
          record,
        });
      }
      function handleBind(record: any) {
        openModalC(true, {
          record,
        });
      }
      function handleEdit(record: any) {
        openModal4(true, {
          record,
        });
      }
      function handleInput(id: number) {
        openModal5(true, {
          contractId: id,
        });
      }
      async function handleDeleteMore(record: any) {
        if (checkedKeys.value.length === 0) {
          message.info('请先选中');
          return;
        }
        const result = await contractStore.deleteContractByIds({
          ids: checkedKeys.value,
        });
        if (result) {
          reload();
        }
      }
      async function handleDelete(record: any) {
        const result = await contractStore.deleteContractById({
          id: record.id,
        });
        if (result) {
          reload();
        }
      }

      function handleAddContract() {
        openModal();
      }
      function handleSuccess() {
        reload();
      }

      function handleChangePermission(record: any) {
        openModalC(true, {
          record,
        });
      }

      // async function handleDown(id: number) {
      //   const result = await contractStore.getContractFileById({ id });
      //   if (result) {
      //     result.fileUrl && window.open(result.fileUrl);
      //   }
      // }

      return {
        registerTable,
        checkedKeys,
        onSelectChange,
        handleAudit,
        register1,
        register2,
        register3,
        register4,
        openModal,
        openModalE,
        openModalC,
        openModal4,
        handleSuccess,
        handleAddContract,
        handleDelete,
        handleChangePermission,
        handleBind,
        handleEdit,
        handleInput,
        handleDeleteMore,
        register5,
        hasPermission,
        permissionListSetting,
      };
    },
  });
</script>

<style lang="less" scoped>
  .pic {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  .company-info {
    text-align: left;
  }
  .down {
    cursor: pointer;
    color: @primary-color;
  }
  .img-list :deep(.ant-image-img) {
    width: 60px;
  }
</style>
