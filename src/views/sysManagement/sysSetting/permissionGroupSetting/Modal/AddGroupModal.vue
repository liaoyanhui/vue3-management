<template>
  <BasicModal v-bind="$attrs" @register="register" title="添加权限组" @ok="handleSubmit">
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
  // import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'AddGroupModal',
    components: { BasicModal, BasicForm, [Upload.name]: Upload },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const roleStore = useRoleStore();
      // const route = useRoute();
      // 用户ID
      // const menuId = ref(route.params?.menuId);
      const [register1, { validate, resetFields, setFieldsValue }] = useForm({
        size: 'large',
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: formSchema,
      });

      const [register, { closeModal, setModalProps }] = useModalInner();

      async function handleSubmit() {
        const values = await validate();
        const data: any = {
          name: values.name,
          note: values.note,
        };
        // if (menuId.value && !isNaN(Number(menuId.value))) {
        //   data.parId = Number(menuId.value);
        // }
        const result = await roleStore.addRole(data);
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
