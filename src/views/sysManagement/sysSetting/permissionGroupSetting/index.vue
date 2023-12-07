<template>
  <div class="permission-group-setting">
    <BasicTable @register="registerTable" bordered>
      <template #permission="{ record }">
        <div class="permission" @click="handleChangePermission(record)">设置权限</div>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '修改',
              icon: 'fa6-regular:pen-to-square',
              onClick: handleEdit.bind(null, record),
              // ifShow: hasPermission(permissionListSetting.ROLE_ENTITY_UPDATE),
            },
            {
              label: '删除',
              icon: 'fa6-regular:pen-to-square',
              popConfirm: {
                title: '是否删除?',
                confirm: handleDelete.bind(null, record),
              },
              // ifShow: hasPermission(permissionListSetting.ROLE_ENTITY_DELETE),
            },
          ]"
        />
      </template>
      <template #toolbar>
        <!-- v-if="hasPermission(permissionListSetting.ROLE_ENTITY_ADD)" -->
        <a-button type="primary" @click="handleAddGroup">新建组</a-button>
      </template>
    </BasicTable>
    <AddGroupModal @register="register1" @success="handleSuccess" :destroyOnClose="true" />
    <EditGroupModal @register="register2" @success="handleSuccess" :destroyOnClose="true" />
    <ChangePermissionModal @register="register3" @success="handleSuccess" :destroyOnClose="true" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns } from './data';

  import { useRoleStore } from '/@/store/modules/role';
  import { useModal } from '/@/components/Modal';
  import AddGroupModal from './Modal/AddGroupModal.vue';
  import EditGroupModal from './Modal/EditGroupModal.vue';
  import ChangePermissionModal from './Modal/ChangePermissionModal.vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import permissionListSetting from '/@/settings/permissionListSetting';

  export default defineComponent({
    name: 'PermissionGroupSetting',
    components: { BasicTable, TableAction, AddGroupModal, EditGroupModal, ChangePermissionModal },
    setup() {
      const { hasPermission } = usePermission();
      const roleStore = useRoleStore();

      const [register1, { openModal }] = useModal();
      const [register2, { openModal: openModalE }] = useModal();
      const [register3, { openModal: openModalC }] = useModal();
      const [registerTable, { getForm, reload }] = useTable({
        // title: '开启搜索区域',
        api: (params) => {
          // return Promise.resolve([{ id: 1}]);
          return roleStore.getRolePagedList(params);
        },
        columns: getBasicColumns(),
        useSearchForm: false,
        // formConfig: searchCondition(),
        showTableSetting: true,
        tableSetting: { fullScreen: true },
        showIndexColumn: false,
        rowKey: 'id',
        actionColumn: {
          width: 200,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function handleEdit(record: any) {
        openModalE(true, {
          record,
        });
      }
      async function handleDelete(record: any) {
        const result = await roleStore.deleteRole({
          id: record.id,
        });
        if (result) {
          reload();
        }
      }

      function handleAddGroup() {
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

      return {
        registerTable,
        handleEdit,
        register1,
        register2,
        register3,
        openModal,
        openModalE,
        openModalC,
        handleSuccess,
        handleAddGroup,
        handleDelete,
        handleChangePermission,
        hasPermission,
        permissionListSetting,
      };
    },
  });
</script>

<style lang="less">
  .permission {
    color: @primary-color;
    cursor: pointer;
  }
  .permission-group-setting {
    padding: 16px;
  }
</style>
