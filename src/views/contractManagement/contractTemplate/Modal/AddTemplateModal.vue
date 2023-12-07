<!--
 * @Description: 
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-10 10:36:53
 * @LastEditors: shangxia
 * @LastEditTime: 2023-04-10 10:28:35
-->
<template>
  <BasicModal v-bind="$attrs" @register="register" title="添加模板" @ok="handleSubmit" :width="660">
    <BasicForm @register="register1">
      <!-- <template #coordinate="{ model, field }">
        <div>
          
        </div>
      </template> -->
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, UnwrapRef, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useContractStore } from '/@/store/modules/contract';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './data';
  import { Upload } from 'ant-design-vue';

  export default defineComponent({
    name: 'AddTemplateModal',
    components: { BasicModal, BasicForm, [Upload.name]: Upload },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const contractStore = useContractStore();
      const [register1, { validate, resetFields, setFieldsValue }] = useForm({
        size: 'large',
        labelWidth: 120,
        showActionButtonGroup: false,
        schemas: formSchema,
      });

      const [register, { closeModal, setModalProps }] = useModalInner();

      async function handleSubmit() {
        const values = await validate();
        const data: any = {
          ...values,
        };
        const result = await contractStore.addContractTemplate(data);
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
