<!--
 * @Description: 
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-23 15:29:02
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-24 11:11:34
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    :title="modelType === 1 ? '查看' : '编辑'"
    @ok="handleSubmit"
    :footer="null"
    :width="1000"
    :minHeight="450"
    :after-close="handleClose"
  >
    <Tabs type="card" v-model:activeKey="activeKey">
      <TabPane key="1" tab="会员简要信息">
        <MemberInfo :id="id" :modelType="modelType" />
      </TabPane>
      <TabPane key="2" tab="会员公司信息">
        <CompanyInfo :id="id" :modelType="modelType" />
      </TabPane>
      <TabPane key="3" tab="开通会员" v-if="modelType == 2">
        <OpenMember :id="id" :modelType="modelType" />
      </TabPane>
      <TabPane key="4" tab="开通现货" v-if="modelType == 2">
        <OpenStock :id="id" :modelType="modelType" />
      </TabPane>
    </Tabs>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Select, Tabs, TabPane } from 'ant-design-vue';
  import CompanyInfo from '../component/CompanyInfo.vue';
  // import EditCompanyInfo from '../component/EditCompanyInfo.vue';
  import MemberInfo from '../component/MemberInfo.vue';
  // import EditMemberInfo from '../component/EditMemberInfo.vue';
  import OpenMember from '../component/OpenMember.vue';
  import OpenStock from '../component/OpenStock.vue';

  export default defineComponent({
    name: 'MemberDetailModal',
    components: {
      BasicModal,
      Tabs,
      TabPane,
      [Select.name]: Select,
      CompanyInfo,
      MemberInfo,
      OpenMember,
      OpenStock,
    },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const modelType = ref();
      // const memberStore = useMemberStore();
      const activeKey = ref('1');
      const id = ref(null);

      const [register, { closeModal, setModalProps }] = useModalInner((data) => {
        id.value = data.id;
        modelType.value = data.modelType;
      });

      async function handleClose() {
        activeKey.value = '1';
      }

      async function handleSubmit() {}
      return {
        register,
        closeModal,
        handleSubmit,
        activeKey,
        id,
        modelType,
        handleClose,
      };
    },
  });
</script>

<style lang="less" scoped></style>
