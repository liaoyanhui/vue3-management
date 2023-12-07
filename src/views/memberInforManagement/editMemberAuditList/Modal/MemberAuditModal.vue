<!--
 * @Description: 
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-15 14:07:02
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-17 17:25:40
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="审核"
    @ok="handleSubmit"
    :destroyOnClose="true"
  >
    <BasicForm @register="register1" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { auditFormSchema } from './data';
  import { useMemberStore } from '/@/store/modules/member';
  import { Select } from 'ant-design-vue';

  export default defineComponent({
    name: 'MemberAuditModal',
    components: { BasicModal, BasicForm, [Select.name]: Select },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const memberStore = useMemberStore();
      const product = reactive<any>({});
      const [register, { closeModal }] = useModalInner((data) => {
        product.value = data;
      });

      const [register1, { validate }] = useForm({
        size: 'large',
        labelWidth: 120,
        showActionButtonGroup: false,
        schemas: auditFormSchema,
      });

      async function handleSubmit() {
        const values = await validate();
        const { type, params } = product.value;
        let result: any;
        if (type === 1) {
          const data = {
            id: params,
            auditState: 3,
            auditMessage: values.auditMessage,
          };
          result = await memberStore.checkEditedMemberById(data);
        }

        if (type === 2) {
          const data = {
            ids: params,
            auditState: 3,
            auditMessage: values.auditMessage,
          };
          result = await memberStore.checkEditedMemberByIds(data);
        }
        if (result) {
          closeModal();
          emit('success');
        }
      }
      return {
        register,
        register1,
        closeModal,
        handleSubmit,
        product,
      };
    },
  });
</script>

<style lang="less" scoped>
  ul {
    li {
      display: flex;
      margin-bottom: 10px;
      .lable {
        width: 100px;
        text-align: right;
        margin-right: 8px;
      }
    }
  }
</style>
