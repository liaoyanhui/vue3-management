<!--
 * @Description: 
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-11-10 08:55:11
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-10 14:07:27
-->
<template>
  <BasicModal v-bind="$attrs" @register="register" title="编辑权限组" @ok="handleSubmit">
    <BasicForm @register="register1" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, UnwrapRef, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useRoleStore } from '/@/store/modules/role';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './data';
  import { Upload } from 'ant-design-vue';

  export default defineComponent({
    name: 'EditGroupModal',
    components: { BasicModal, BasicForm, [Upload.name]: Upload },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const roleStore = useRoleStore();
      // 用户ID
      const [register1, { validate, resetFields, setFieldsValue }] = useForm({
        size: 'large',
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: formSchema,
      });
      const item = reactive<any>({
        data: {},
      });
      const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
        item.data = data.record;
        setFieldsValue({
          name: data.record.name,
          note: data.record.note,
        });
      });

      async function handleSubmit() {
        const values = await validate();
        const data: any = {
          id: item.data.id,
          name: values.name,
          note: values.note,
        };
        const result = await roleStore.updateRole(data);
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
