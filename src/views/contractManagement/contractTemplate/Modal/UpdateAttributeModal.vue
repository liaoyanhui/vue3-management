<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="设置属性"
    @ok="handleSubmit"
    :destroyOnClose="true"
    :width="1000"
    :minHeight="600"
    :height="600"
    :footer="null"
  >
    <BasicTable
      @register="registerTable"
      :rowSelection="{ type: 'checkbox', selectedRowKeys: checkedKeys, onChange: onSelectChange }"
    >
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '修改属性',
              icon: 'fa6-regular:pen-to-square',
              onClick: handleEdit.bind(null, record),
              ifShow: hasPermission(permissionListSetting.CONTRACTATTRIBUTE_ENTITY_UPDATE),
            },
            {
              label: '删除',
              icon: 'fa6-regular:pen-to-square',
              popConfirm: {
                title: '是否删除?',
                confirm: handleDelete.bind(null, record),
              },
              ifShow: hasPermission(permissionListSetting.CONTRACTATTRIBUTE_ENTITY_DELETE),
            },
          ]"
        />
      </template>
      <template #toolbar>
        <a-button
          v-if="hasPermission(permissionListSetting.CONTRACTATTRIBUTE_ENTITY_ADD)"
          type="primary"
          @click="handleAddAttribute"
          >添加属性</a-button
        >
        <a-button
          v-if="hasPermission(permissionListSetting.CONTRACTATTRIBUTE_ENTITY_DELETE)"
          type="primary"
          @click="handleDeleteBatch"
          >批量删除</a-button
        >
      </template>
    </BasicTable>
    <AddAttributeModal @register="register1" @success="handleSuccess" />
    <EditAttributeModal @register="register2" @success="handleSuccess" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, UnwrapRef, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { useContractStore } from '/@/store/modules/contract';
  import { getBasicColumns } from './data';
  import { message } from 'ant-design-vue';
  import { useModal } from '/@/components/Modal';
  import AddAttributeModal from './AddAttributeModal.vue';
  import EditAttributeModal from './EditAttributeModal.vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import permissionListSetting from '/@/settings/permissionListSetting';

  export default defineComponent({
    name: 'UpdateAttributeModal',
    components: { BasicModal, BasicTable, TableAction, AddAttributeModal, EditAttributeModal },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const { hasPermission } = usePermission();
      const contractStore = useContractStore();
      const checkedKeys = ref<Array<string | number>>([]);

      const templateId = ref<number | null>(null);
      const [register, { closeModal, setModalProps }] = useModalInner((data) => {
        templateId.value = data.templateId;
      });

      const [registerTable, { getForm, reload }] = useTable({
        // title: '开启搜索区域',
        api: (params) => {
          return contractStore.getContractAttributeList({
            ...params,
            templateId: templateId.value,
          });
        },
        columns: getBasicColumns(),
        useSearchForm: false,
        // formConfig: searchCondition(),
        showTableSetting: false,
        tableSetting: { fullScreen: true },
        showIndexColumn: false,
        rowKey: 'id',
        ellipsis: false,
        pagination: false,
        scroll: { y: 500 },
        actionColumn: {
          width: 200,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      const [register1, { openModal }] = useModal();
      const [register2, { openModal: openModalE }] = useModal();

      function onSelectChange(selectedRowKeys: (string | number)[]) {
        console.log(selectedRowKeys);
        checkedKeys.value = selectedRowKeys;
      }

      function handleEdit(record: any) {
        openModalE(true, {
          record,
          templateId: templateId.value,
        });
      }
      async function handleDelete(record: any) {
        const result = await contractStore.deleteContractAttributeByIds({
          ids: [record.id],
        });
        if (result) {
          reload();
        }
      }
      function handleSuccess() {
        reload();
      }
      function handleAddAttribute() {
        openModal(true, {
          templateId: templateId.value,
        });
      }
      async function handleDeleteBatch() {
        if (checkedKeys.value.length === 0) {
          message.info('请先选中');
          return;
        }
        const result = await contractStore.deleteContractAttributeByIds({
          ids: checkedKeys.value,
        });
        if (result) {
          reload();
        }
      }
      async function handleSubmit() {
        // const values = await validate();
        // const data: any = {
        //   ...values,
        // };
        // const result = await contractStore.addContractTemplate(data);
        // if (result) {
        //   resetFields();
        //   closeModal();
        //   emit('success');
        // }
      }
      return {
        register,
        registerTable,
        closeModal,
        checkedKeys,
        onSelectChange,
        handleSubmit,
        handleAddAttribute,
        handleEdit,
        handleDelete,
        handleDeleteBatch,
        templateId,
        register1,
        register2,
        openModal,
        openModalE,
        handleSuccess,
        hasPermission,
        permissionListSetting,
      };
    },
  });
</script>

<style lang="less" scoped></style>
