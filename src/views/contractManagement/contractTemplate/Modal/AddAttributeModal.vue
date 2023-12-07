<template>
  <BasicModal v-bind="$attrs" @register="register" title="添加属性" @ok="handleSubmit" :width="660">
    <BasicForm @register="register1" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, UnwrapRef, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useContractStore } from '/@/store/modules/contract';
  import { BasicForm, useForm } from '/@/components/Form';
  import { attributeForm } from './data';
  import { Upload } from 'ant-design-vue';

  export default defineComponent({
    name: 'AddAttributeModal',
    components: { BasicModal, BasicForm, [Upload.name]: Upload },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const contractStore = useContractStore();
      const templateId = ref<number | null>(null);

      const [register1, { validate, resetFields, setFieldsValue }] = useForm({
        size: 'large',
        labelWidth: 150,
        showActionButtonGroup: false,
        schemas: attributeForm,
      });

      const [register, { closeModal, setModalProps }] = useModalInner((data) => {
        templateId.value = data.templateId;
      });

      async function handleSubmit() {
        const values = await validate();
        const data: any = {
          templateId: templateId.value,
          ...values,
        };
        const result = await contractStore.addContractAttribute(data);
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
      };
    },
  });
</script>

<style lang="less" scoped></style>
