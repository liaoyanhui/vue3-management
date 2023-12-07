<!--
 * @Description: 
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-10 10:18:12
 * @LastEditors: shangxia
 * @LastEditTime: 2023-12-01 08:54:52
-->
<template>
  <div>
    <BasicTable
      bordered
      @register="registerTable"
      :rowSelection="{ type: 'checkbox', selectedRowKeys: checkedKeys, onChange: onSelectChange }"
    >
      <template #logoUrl="{ text }">
        <Image v-if="text" :src="text" class="contract-pic" />
      </template>
      <template #coordinate="{ record }">
        <div> x: {{ record.coordinateX }} y: {{ record.coordinateY }} </div>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑模板',
              onClick: handleEditTemplate.bind(null, record),
              ifShow: hasPermission(permissionListSetting.CONTRACTTEMPLATE_ENTITY_UPDATE),
            },
            {
              label: '设置属性',
              onClick: handleSetAttribute.bind(null, record),
              ifShow: hasPermission(permissionListSetting.CONTRACTATTRIBUTE_QUERY_PAGEDLIST),
            },
            {
              label: '删除',
              popConfirm: {
                title: '是否删除?',
                confirm: handleDelete.bind(null, record),
              },
              ifShow: hasPermission(permissionListSetting.CONTRACTTEMPLATE_ENTITY_DELETE),
            },
          ]"
        />
      </template>
      <template #toolbar>
        <a-button
          v-if="hasPermission(permissionListSetting.CONTRACTTEMPLATE_ENTITY_ADD)"
          type="primary"
          @click="handleAddTemplate"
          >添加模板</a-button
        >
        <a-button
          v-if="hasPermission(permissionListSetting.CONTRACTTEMPLATE_ENTITY_DELETE)"
          type="primary"
          @click="handleDeleteBatch"
          >批量删除</a-button
        >
      </template>
    </BasicTable>
    <AddTemplateModal @register="register1" @success="handleSuccess" :destroyOnClose="true" />
    <EditTemplateModal @register="register2" @success="handleSuccess" :destroyOnClose="true" />
    <UpdateAttributeModal @register="register3" @success="handleSuccess" :destroyOnClose="true" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, searchCondition } from './data';
  import { message, Image } from 'ant-design-vue';

  import { useContractStore } from '/@/store/modules/contract';
  import { useModal } from '/@/components/Modal';
  import AddTemplateModal from './Modal/AddTemplateModal.vue';
  import EditTemplateModal from './Modal/EditTemplateModal.vue';
  import UpdateAttributeModal from './Modal/UpdateAttributeModal.vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import permissionListSetting from '/@/settings/permissionListSetting';

  export default defineComponent({
    components: {
      BasicTable,
      TableAction,
      AddTemplateModal,
      Image,
      EditTemplateModal,
      UpdateAttributeModal,
    },
    setup() {
      const { hasPermission } = usePermission();
      const contractStore = useContractStore();
      const checkedKeys = ref<Array<string | number>>([]);

      const [register1, { openModal }] = useModal();
      const [register2, { openModal: openModalE }] = useModal();
      const [register3, { openModal: openModalU }] = useModal();
      const [registerTable, { getForm, reload }] = useTable({
        // title: '开启搜索区域',
        // api: getGeneralStockPagedList,
        api: (params) => {
          return contractStore.getContractTemplatePagedList(params);
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
          width: 250,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function onSelectChange(selectedRowKeys: (string | number)[]) {
        checkedKeys.value = selectedRowKeys;
      }

      function handleEditTemplate(record: any) {
        openModalE(true, {
          record,
        });
      }
      function handleSetAttribute(record: any) {
        openModalU(true, { templateId: record.id });
      }
      async function handleDelete(record: any) {
        const result = await contractStore.deleteContractTemplateById({
          id: record.id,
        });
        if (result) {
          reload();
        }
      }

      // 批量删除
      async function handleDeleteBatch() {
        if (checkedKeys.value.length === 0) {
          message.info('请先选中');
          return;
        }
        const result = await contractStore.deleteContractTemplateByIds({
          ids: checkedKeys.value,
        });
        if (result) {
          reload();
        }
      }

      function handleAddTemplate() {
        openModal();
      }
      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        checkedKeys,
        onSelectChange,
        handleEditTemplate,
        handleSetAttribute,
        register1,
        register2,
        register3,
        openModal,
        openModalE,
        openModalU,
        handleSuccess,
        handleAddTemplate,
        handleDelete,
        handleDeleteBatch,
        hasPermission,
        permissionListSetting,
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
</style>
