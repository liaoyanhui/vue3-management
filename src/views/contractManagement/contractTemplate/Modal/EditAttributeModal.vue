<!--
 * @Description: 
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-11-21 11:28:49
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-21 13:43:21
-->
<template>
  <BasicModal v-bind="$attrs" @register="register" title="修改属性" @ok="handleSubmit" :width="660">
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
    name: 'EditAttributeModal',
    components: { BasicModal, BasicForm, [Upload.name]: Upload },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const contractStore = useContractStore();
      const templateId = ref<number | null>(null);
      const attributeItem = reactive<any>({
        data: {},
      });

      const [register1, { validate, resetFields, setFieldsValue }] = useForm({
        size: 'large',
        labelWidth: 150,
        showActionButtonGroup: false,
        schemas: attributeForm,
      });

      const [register, { closeModal, setModalProps }] = useModalInner((data) => {
        templateId.value = data.templateId;
        attributeItem.data = data.record;
        setFieldsValue({
          attributeName: attributeItem.data.attributeName,
          attributeType: attributeItem.data.attributeType,
          required: attributeItem.data.required,
          defaultValue: attributeItem.data.defaultValue,
          replaceVariable: attributeItem.data.replaceVariable,
          sequence: attributeItem.data.sequence,
        });
      });

      async function handleSubmit() {
        const values = await validate();
        const data: any = {
          templateId: templateId.value,
          id: attributeItem.data.id,
          ...values,
        };
        const result = await contractStore.updateContractAttribute(data);
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
