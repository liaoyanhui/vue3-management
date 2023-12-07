<template>
  <div class="menu-setting">
    <div>
      <BasicTable @register="registerTable" bordered>
        <template #menuName="{ record }">
          <div class="menu-name" @click="jump(record.id)">
            {{ record.meta.title }} ({{ record.childCount }})
          </div>
        </template>
        <template #sort="{ record }">
          <div>
            <a-button
              v-if="hasPermission(permissionListSetting.MENU_ENTITY_UPDATE_SEQUENCE)"
              type="primary"
              size="small"
              class="btn"
              @click="handleDropSort(record.sequence, record.id)"
            >
              菜单排序
            </a-button>
            <a-button
              v-if="hasPermission(permissionListSetting.MENU_ENTITY_MOVE)"
              type="primary"
              size="small"
              class="btn"
              @click="handleDropHierarchy(record.id)"
              >菜单层级</a-button
            >
          </div>
        </template>
        <template #action="{ record }">
          <TableAction
            :actions="[
              {
                label: '修改',
                icon: 'fa6-regular:pen-to-square',
                onClick: handleEdit.bind(null, record),
                ifShow: hasPermission(permissionListSetting.MENU_ENTITY_UPDATE),
              },
              {
                label: '删除',
                icon: 'fa6-regular:pen-to-square',
                popConfirm: {
                  title: '是否删除?',
                  confirm: handleDelete.bind(null, record),
                },
                ifShow: hasPermission(permissionListSetting.MENU_ENTITY_DELETE),
              },
            ]"
          />
        </template>
        <template #toolbar>
          <!-- v-if="hasPermission(permissionListSetting.MENU_ENTITY_ADD)" -->

          <a-button type="primary" @click="handleAddMenu">添加菜单</a-button>
        </template>
      </BasicTable>
    </div>
    <AddMenuModal @register="register1" @success="handleSuccess" />
    <EditMenuModal @register="register2" @success="handleSuccess" />
    <MenuSortModal @register="register3" @success="handleSuccess" />
    <MenuHierarchyModal @register="register4" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns } from './data';

  import { useMenuStore } from '/@/store/modules/menu';
  import { useModal } from '/@/components/Modal';
  import AddMenuModal from './Modal/AddMenuModal.vue';
  import EditMenuModal from './Modal/EditMenuModal.vue';
  import MenuSortModal from './Modal/MenuSortModal.vue';
  import MenuHierarchyModal from './Modal/MenuHierarchyModal.vue';
  import { useRoute, useRouter } from 'vue-router';
  import { usePermission } from '/@/hooks/web/usePermission';
  import permissionListSetting from '/@/settings/permissionListSetting';

  export default defineComponent({
    name: 'MenuSetting',
    components: {
      BasicTable,
      TableAction,
      EditMenuModal,
      AddMenuModal,
      MenuSortModal,
      MenuHierarchyModal,
    },
    setup() {
      const { hasPermission } = usePermission();
      const menuStore = useMenuStore();
      const route = useRoute();
      const router = useRouter();
      // const checkedKeys = ref<Array<string | number>>([]);
      const menuId = ref(route.params?.menuId);

      // 菜单个数
      const menuTotal = ref<number>(0);
      const [register1, { openModal }] = useModal();
      const [register2, { openModal: openModalE }] = useModal();
      const [register3, { openModal: openModalS }] = useModal();
      const [register4, { openModal: openModalH }] = useModal();
      const [registerTable, { getForm, reload }] = useTable({
        // title: '开启搜索区域',
        api: async (params) => {
          const data: any = {};
          if (menuId.value && !isNaN(Number(menuId.value))) {
            data.parId = Number(menuId.value);
          }
          const result = await menuStore.getMenuItemList(data);
          menuTotal.value = result.length || 0;
          return result;
          // return Promise.resolve([{}]);
        },
        columns: getBasicColumns(),
        useSearchForm: false,
        // formConfig: searchCondition(),
        showTableSetting: true,
        pagination: false,
        tableSetting: { fullScreen: true },
        showIndexColumn: false,
        ellipsis: false,
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
        const result = await menuStore.deleteMenuItem({
          id: record.id,
        });
        if (result) {
          reload();
        }
      }

      function handleAddMenu() {
        openModal();
      }
      function handleSuccess() {
        reload();
      }
      // 跳转菜单
      function jump(id: number) {
        // id && router.push('/sysManagement/sysSetting/menuSetting/' + id);
        id && router.push('/menuSetting/' + id);
      }
      // 当前页内排序
      function handleDropSort(sequence: number, id: number) {
        openModalS(true, {
          menuTotal: menuTotal.value,
          sequence,
          id,
        });
      }
      // 打开菜单层级弹窗
      function handleDropHierarchy(id: number) {
        openModalH(true, {
          id,
        });
      }
      return {
        registerTable,
        handleEdit,
        register1,
        register2,
        register3,
        register4,
        openModal,
        openModalE,
        openModalS,
        openModalH,
        handleSuccess,
        handleAddMenu,
        handleDelete,
        jump,
        handleDropSort,
        handleDropHierarchy,
        menuTotal,
        hasPermission,
        permissionListSetting,
      };
    },
  });
</script>

<style lang="less" scoped>
  .menu-name {
    color: @primary-color;
    cursor: pointer;
  }
  .btn {
    margin-right: 8px;
    font-size: 12px;
    margin-top: 5px;
  }
  .menu-setting {
    padding: 16px;
  }
</style>
