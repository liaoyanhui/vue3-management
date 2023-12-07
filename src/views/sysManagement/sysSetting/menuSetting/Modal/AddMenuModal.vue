<!--
 * @Description: 
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-03 09:15:59
 * @LastEditors: shangxia
 * @LastEditTime: 2023-02-17 09:45:06
-->
<template>
  <BasicModal v-bind="$attrs" @register="register" title="添加菜单" @ok="handleSubmit" :width="660">
    <BasicForm @register="register1" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, UnwrapRef, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useMenuStore } from '/@/store/modules/menu';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './data';
  import { Upload } from 'ant-design-vue';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'AddMenuModal',
    components: { BasicModal, BasicForm, [Upload.name]: Upload },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const menuStore = useMenuStore();
      const route = useRoute();
      // 用户ID
      const menuId = ref(route.params?.menuId);
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
          path: values.path,
          name: values.name,
          component: values.component,
          code: values.code,
          redirect: values.redirect,
          menuType: values.menuType,
          meta: {
            title: values.title,
            // icon: ,
            hideMenu: values.hideMenu,
            ignoreKeepAlive: values.ignoreKeepAlive,
            currentActiveMenu: values.currentActiveMenu,
          },
        };
        if (menuId.value && !isNaN(Number(menuId.value))) {
          data.parId = Number(menuId.value);
        }
        const result = await menuStore.addMenuItem(data);
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
