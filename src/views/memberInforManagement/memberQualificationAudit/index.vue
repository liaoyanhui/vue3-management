<template>
  <div>
    <BasicTable
      bordered
      @register="registerTable"
      :rowSelection="{ type: 'checkbox', selectedRowKeys: checkedKeys, onChange: onSelectChange }"
    >
      <template #pic="{ record }">
        <Image
          v-if="record.checkFlag != 2 && record.checkUrl"
          :src="record.checkUrl"
          class="pic"
          :width="60"
        />
        <Image v-else :src="record.url" class="pic" :width="60" />
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '审核通过',
              onClick: handlePass.bind(null, record),
              ifShow:
                hasPermission(permissionListSetting.MEMBERPICTURE_ENTITY_CHECK) &&
                record.checkFlag == 1,
            },
            {
              label: '审核不通过',
              onClick: handleUnPass.bind(null, record),
              ifShow:
                hasPermission(permissionListSetting.MEMBERPICTURE_ENTITY_CHECK) &&
                record.checkFlag == 1,
            },
            {
              label: '删除',
              popConfirm: {
                title: '是否删除?',
                confirm: handleDelete.bind(null, record),
              },
              ifShow: hasPermission(permissionListSetting.MEMBERPICTURE_ENTITY_DELETE),
            },
          ]"
        />
      </template>
      <template #toolbar>
        <a-button
          v-if="hasPermission(permissionListSetting.MEMBERPICTURE_ENTITY_CHECK)"
          type="primary"
          @click="handlePassMore"
          >批量审核通过</a-button
        >
        <a-button
          v-if="hasPermission(permissionListSetting.MEMBERPICTURE_ENTITY_CHECK)"
          type="primary"
          @click="handleUnPassMore"
          >批量审核不通过</a-button
        >
        <a-button
          v-if="hasPermission(permissionListSetting.MEMBERPICTURE_ENTITY_DELETE)"
          type="primary"
          @click="handleDeleteMore"
          >批量删除</a-button
        >
      </template>
    </BasicTable>
    <AuditModal @register="register1" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, searchCondition } from './data';
  import { message, Image } from 'ant-design-vue';

  import { useMemberStore } from '/@/store/modules/member';
  import { useModal } from '/@/components/Modal';
  import AuditModal from './Modal/AuditModal.vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import permissionListSetting from '/@/settings/permissionListSetting';

  export default defineComponent({
    name: 'MemberQualificationAudit',
    components: { BasicTable, TableAction, Image, AuditModal },
    setup() {
      const { hasPermission } = usePermission();
      const memberStore = useMemberStore();
      const checkedKeys = ref<Array<string | number>>([]);

      const [register1, { openModal }] = useModal();
      const [registerTable, { getForm, reload }] = useTable({
        // title: '开启搜索区域',
        api: (params) => {
          return memberStore.getReviewUserPicturePagedList(params);
        },
        columns: getBasicColumns(),
        useSearchForm: true,
        formConfig: searchCondition(),
        showTableSetting: true,
        tableSetting: { fullScreen: true },
        showIndexColumn: false,
        ellipsis: false,
        rowKey: 'id',
        actionColumn: {
          width: 230,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function onSelectChange(selectedRowKeys: (string | number)[]) {
        checkedKeys.value = selectedRowKeys;
      }

      async function handlePass(record: any) {
        const result = await memberStore.checkUserPictureById({
          ids: [record.id],
          checkFlag: 2,
        });
        if (result) {
          reload();
        }
      }

      function handleUnPass(record: any) {
        openModal(true, {
          type: 1,
          params: record.id,
        });
      }
      // function handleChange(record: any) {
      //   openModal(true, {
      //     record,
      //   });
      // }

      async function handleDelete(record: any) {
        const result = await memberStore.deleteUserPictureByIds({
          ids: [record.id],
        });
        if (result) {
          reload();
        }
      }

      async function handlePassMore() {
        if (checkedKeys.value.length === 0) {
          message.info('请先选中');
          return;
        }

        const result = await memberStore.checkUserPictureById({
          ids: checkedKeys.value,
          checkFlag: 2,
        });
        if (result) {
          reload();
        }
      }
      function handleUnPassMore() {
        if (checkedKeys.value.length === 0) {
          message.info('请先选中');
          return;
        }
        openModal(true, {
          type: 2,
          params: checkedKeys.value,
        });
      }
      async function handleDeleteMore() {
        if (checkedKeys.value.length === 0) {
          message.info('请先选中');
          return;
        }
        const result = await memberStore.deleteUserPictureByIds({
          ids: checkedKeys.value,
        });
        if (result) {
          reload();
        }
      }
      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        checkedKeys,
        onSelectChange,
        handlePass,
        handleUnPass,
        handleUnPassMore,
        handlePassMore,
        // handleChange,
        register1,
        openModal,
        handleSuccess,
        handleDeleteMore,
        handleDelete,
        hasPermission,
        permissionListSetting,
      };
    },
  });
</script>

<style lang="less">
  img.qualification-pic {
    width: auto;
    height: 50px;
    cursor: pointer;
  }
</style>
