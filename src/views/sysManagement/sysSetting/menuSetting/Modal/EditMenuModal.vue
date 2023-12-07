<template>
  <BasicModal v-bind="$attrs" @register="register" title="编辑菜单" @ok="handleSubmit" :width="660">
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
    name: 'EditMenuModal',
    components: { BasicModal, BasicForm, [Upload.name]: Upload },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const menuStore = useMenuStore();
      const route = useRoute();
      // 用户ID
      const menuId = ref(route.params?.menuId);
      const currentId = ref();
      const [register1, { validate, resetFields, setFieldsValue }] = useForm({
        size: 'large',
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: formSchema,
      });

      const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
        const record = data.record;
        setFieldsValue({
          path: record.path,
          name: record.name,
          component: record.component,
          redirect: record.redirect,
          menuType: record.menuType,
          code: record.code,
          title: record.meta.title,
          hideMenu: record.meta.hideMenu,
          ignoreKeepAlive: record.meta.ignoreKeepAlive,
          currentActiveMenu: record.meta.currentActiveMenu,
        });
        currentId.value = record.id;
      });

      async function handleSubmit() {
        const values = await validate();
        const data: any = {
          id: currentId.value,
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
        const result = await menuStore.updateMenuItem(data);
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
