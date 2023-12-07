<template>
  <div>
    <BasicTable @register="registerTable" bordered>
      <template #realName="{ record }">
        <div>
          <span>{{ record.realName }}</span>
          <span :class="record.isOnline ? 'onLine' : 'underLine'">{{
            record.isOnline ? '[在线]' : '[离线]'
          }}</span>
        </div>
      </template>
      <template #pictureUrl="{ text }">
        <Image v-if="text" :src="text" class="personnel-pic" />
      </template>
      <template #wechatUrl="{ text }">
        <Image v-if="text" :src="text" class="personnel-pic" />
      </template>
      <template #videoUrl="{ record }">
        <Image
          v-if="record.thumbnailUrl"
          :src="record.thumbnailUrl"
          class="personnel-pic"
          :preview="false"
          @click="handleJumpVideo(record.videoUrl)"
        />
      </template>
      <template #permission="{ record }">
        <div class="permission" @click="handleChangePermission(record)">设置权限</div>
      </template>
      <template #Contact="{ record }">
        <div v-if="record.tel">{{ record.tel }}</div>
        <div v-if="record.qq">{{ record.qq }}</div>
        <div v-if="record.email">{{ record.email }}</div>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '修改',
              icon: 'fa6-regular:pen-to-square',
              onClick: handleEdit.bind(null, record),
              ifShow: hasPermission(permissionListSetting.USER_ENTITY_UPDATE),
            },
            {
              label: '删除',
              icon: 'fa6-regular:pen-to-square',
              ifShow: hasPermission(permissionListSetting.USER_ENTITY_DELETE),
              popConfirm: {
                title: '是否删除?',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <EditPersonnelModel @register="register1" @success="handleSuccess" :destroyOnClose="true" />
    <SetPermissionModal @register="register2" @success="handleSuccess" :destroyOnClose="true" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, searchCondition } from './data';
  import { message, Image } from 'ant-design-vue';

  import { useUserStore } from '/@/store/modules/user';
  import { useModal } from '/@/components/Modal';
  import EditPersonnelModel from './Model/EditPersonnelModel.vue';
  import SetPermissionModal from './Model/SetPermissionModal.vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import permissionListSetting from '/@/settings/permissionListSetting';

  export default defineComponent({
    name: 'PersonnelList',
    components: {
      BasicTable,
      TableAction,
      Image,
      EditPersonnelModel,
      SetPermissionModal,
    },
    setup() {
      const { hasPermission } = usePermission();
      const userStore = useUserStore();
      const [register1, { openModal }] = useModal();
      const [register2, { openModal: openModalS }] = useModal();
      const [registerTable, { getForm, reload }] = useTable({
        // title: '开启搜索区域',
        api: async (params) => {
          return userStore.getUserPagedList(params);
        },
        columns: getBasicColumns(),
        useSearchForm: true,
        formConfig: searchCondition(),
        showTableSetting: true,
        pagination: false,
        tableSetting: { fullScreen: true },
        showIndexColumn: false,
        ellipsis: false,
        rowKey: 'id',
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      async function handleDelete(record: any) {
        const result = await userStore.deleteUser({
          id: record.id,
        });
        if (result) {
          reload();
        }
      }

      function handleChangePermission(record: any) {
        openModalS(true, {
          record,
        });
      }
      function handleEdit(record: any) {
        openModal(true, {
          record,
        });
      }

      function handleAddMenu() {
        openModal();
      }
      function handleSuccess() {
        reload();
      }
      function handleJumpVideo(url: any) {
        window.open(url);
      }
      return {
        registerTable,
        handleEdit,
        register1,
        register2,
        openModalS,
        openModal,
        handleSuccess,
        handleAddMenu,
        handleDelete,
        handleChangePermission,
        handleJumpVideo,
        hasPermission,
        permissionListSetting,
      };
    },
  });
</script>

<style lang="less">
  .menu-name {
    color: @primary-color;
    cursor: pointer;
  }
  .btn {
    margin-right: 8px;
    font-size: 12px;
  }
  img.personnel-pic {
    // width: 100%;
    width: auto;
    height: 50px;
    cursor: pointer;
  }
  .onLine {
    color: green;
  }
  .underLine {
    color: red;
  }
  .permission {
    color: @primary-color;
    cursor: pointer;
  }
</style>
