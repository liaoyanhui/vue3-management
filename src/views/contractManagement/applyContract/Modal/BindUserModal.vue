<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="绑定用户"
    @ok="handleSubmit"
    :width="400"
    :minHeight="150"
    okText="绑定用户"
  >
    <BasicForm @register="register1" />
    <div class="tip">
      <div>请注意：</div>
      <div>后绑定用户只能绑定单个用户</div>
      <div>只有在申请合同的时候才能绑定多个用户名</div>
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, unref, computed, ref, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useContractStore } from '/@/store/modules/contract';
  import { getContractTemplateList } from '/@/api/sys/contract';

  import { BasicForm, useForm, ApiSelect } from '/@/components/Form';
  import { bindSchema } from './data';
  import { Upload } from 'ant-design-vue';

  export default defineComponent({
    name: 'BindUserModal',
    components: { BasicModal, BasicForm, [Upload.name]: Upload, ApiSelect },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const contractStore = useContractStore();

      const [register1, { validate, resetFields, setFieldsValue }] = useForm({
        size: 'large',
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: bindSchema,
      });

      const contractId = ref<any>(null);
      const [register, { closeModal, setModalProps }] = useModalInner((data) => {
        contractId.value = data.record.id;
        setFieldsValue({
          creatorName: data.record.creatorName,
        });
      });

      async function handleSubmit() {
        const values = await validate();
        const data: any = {
          id: contractId.value,
          userName: values.creatorName,
        };
        const result = await contractStore.updateContractUser(data);
        if (result) {
          resetFields();
          closeModal();
          emit('success');
        }
      }
      return {
        register,
        register1,
        closeModal,
        handleSubmit,
        getContractTemplateList,
      };
    },
  });
</script>

<style lang="less" scoped>
  .tip {
    > div {
      margin-left: 100px;
    }
  }
</style>
