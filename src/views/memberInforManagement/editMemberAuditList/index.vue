<template>
  <div>
    <BasicTable
      bordered
      @register="registerTable"
      :rowSelection="{ type: 'checkbox', selectedRowKeys: checkedKeys, onChange: onSelectChange }"
    >
      <template #info="{ record }">
        <div class="info">
          <div>
            <span>【公司】{{ record.companyName || ' -- ' }}</span>
            <span>【用户名】{{ record.userName || ' -- ' }}</span>
            <span>【手机号】{{ record.mobilePhone || ' -- ' }}</span>
          </div>
          <div>
            <span>【联系人】{{ record.contact || ' -- ' }}</span>
            <span>【电话】{{ record.telephone || ' -- ' }}</span>
            <span>【QQ】{{ record.qq || ' -- ' }}</span>
          </div>
          <div>
            <span>【地址】{{ record.companyAddress || ' -- ' }}</span>
          </div>
          <div>
            <span>【邮箱】{{ record.email || ' -- ' }}</span>
          </div>
          <div>
            <span>【公司简介】{{ record.companyProfile || ' -- ' }}</span>
          </div>
        </div>
      </template>
      <template #action="{ record }">
        <TableAction
          v-if="record.state == 1"
          :actions="[
            {
              label: '审核通过',
              onClick: handlePass.bind(null, record),
              ifShow: hasPermission(permissionListSetting.MEMBEREDIT_ENTITY_CHECK),
            },
            {
              label: '审核不通过',
              onClick: handleUnPass.bind(null, record),
              ifShow: hasPermission(permissionListSetting.MEMBEREDIT_ENTITY_CHECK),
            },
          ]"
        />
      </template>
      <template #toolbar>
        <a-button
          v-if="hasPermission(permissionListSetting.MEMBEREDIT_ENTITY_CHECK)"
          type="primary"
          @click="handlePassMore"
          >批量通过</a-button
        >
        <a-button
          v-if="hasPermission(permissionListSetting.MEMBEREDIT_ENTITY_CHECK)"
          type="primary"
          @click="handleUnPassMore"
          >批量不通过</a-button
        >
        <!-- <a-button type="primary" @click="handleDeleteMore">批量删除</a-button> -->
      </template>
    </BasicTable>
    <MemberAuditModal @register="register1" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, searchCondition } from './data';
  import { message, Image } from 'ant-design-vue';
  import { useMemberStore } from '/@/store/modules/member';
  import { useModal } from '/@/components/Modal';
  import MemberAuditModal from './Modal/MemberAuditModal.vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import permissionListSetting from '/@/settings/permissionListSetting';

  export default defineComponent({
    name: 'EditMemberAuditList',
    components: { BasicTable, TableAction, Image, MemberAuditModal },
    setup() {
      const { hasPermission } = usePermission();
      const memberStore = useMemberStore();
      const checkedKeys = ref<Array<string | number>>([]);

      const [register1, { openModal }] = useModal();
      const [registerTable, { getForm, reload }] = useTable({
        // title: '开启搜索区域',
        api: (params) => {
          return memberStore.getEditingMemberPagedList(params);
        },
        columns: getBasicColumns(),
        useSearchForm: true,
        formConfig: searchCondition(),
        showTableSetting: true,
        tableSetting: { fullScreen: true },
        showIndexColumn: false,
        rowKey: 'id',
        actionColumn: {
          width: 280,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      function onSelectChange(selectedRowKeys: (string | number)[]) {
        checkedKeys.value = selectedRowKeys;
      }

      async function handlePass(record: any) {
        const result = await memberStore.checkEditedMemberById({
          id: record.id,
          auditState: 2,
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

      async function handleDelete(record: any) {
        const result = await memberStore.deleteMemberById({
          id: record.id,
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
        const result = await memberStore.checkEditedMemberByIds({
          ids: checkedKeys.value,
          auditState: 2,
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
      // async function handleDeleteMore() {
      //   if (checkedKeys.value.length === 0) {
      //     message.info('请先选中');
      //     return;
      //   }
      //   const result = await memberStore.deleteMemberByIds({
      //     ids: checkedKeys.value,
      //   });
      //   if (result) {
      //     reload();
      //   }
      // }
      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        checkedKeys,
        onSelectChange,
        handleUnPass,
        handlePass,
        handleUnPassMore,
        handlePassMore,
        register1,
        openModal,
        handleSuccess,
        hasPermission,
        permissionListSetting,
      };
    },
  });
</script>

<style lang="less">
  .pic {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  .info {
    text-align: left;
    span {
      margin-right: 8px;
      // white-space: nowrap;
    }
  }
</style>
