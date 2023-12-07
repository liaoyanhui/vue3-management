<!--
 * @Description: 
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-10 10:37:06
 * @LastEditors: shangxia
 * @LastEditTime: 2023-04-10 10:28:20
-->
<template>
  <BasicModal v-bind="$attrs" @register="register" title="编辑模板" @ok="handleSubmit" :width="660">
    <BasicForm @register="register1" />
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
    name: 'EditTemplateModal',
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

      const templateId = ref<number | null>(null);
      const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
        const record = data.record;
        // console.log(record, 'ress')
        const result = await contractStore.getContractTemplateById({ id: record.id });
        if (result) {
          setFieldsValue({
            name: result.name,
            code: result.code,
            fileName: result.fileName,
            logoUrl: result.logoUrl,
            sealType: result.sealType,
            sealPageNumber: result.sealPageNumber,
            pageCount: result.pageCount,
            coordinateX: result.coordinateX,
            coordinateY: result.coordinateY,
            userCoordinateX: result.userCoordinateX,
            userCoordinateY: result.userCoordinateY,
            sequence: result.sequence,
            isShow: result.isShow ? 1 : 0,
          });
          templateId.value = record.id;
        }
      });

      async function handleSubmit() {
        const values = await validate();
        const data: any = {
          ...values,
          id: templateId.value,
        };
        const result = await contractStore.updateContractTemplate(data);
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
