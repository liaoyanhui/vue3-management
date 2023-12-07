<template>
  <BasicModal v-bind="$attrs" @register="register" title="菜单层级" @ok="handleSubmit">
    <BasicForm @register="register1" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, unref, watchEffect } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useMenuStore } from '/@/store/modules/menu';
  import { BasicForm, useForm } from '/@/components/Form';
  import { hierarchyForm } from './data';
  import { Select } from 'ant-design-vue';
  // import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'MenuHierarchyModal',
    components: { BasicModal, BasicForm, [Select.name]: Select, ASelectOption: Select.Option },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const menuStore = useMenuStore();
      // const route = useRoute();
      // 用户ID
      // const menuId = ref(route.params?.menuId);

      // async function fetch() {
      //   const result = await menuStore.getMenuItemTree();
      //   console.log(result, 'result');
      // }
      // watchEffect(() => {
      //   fetch();
      // });
      const [register1, { validate, resetFields, setFieldsValue, updateSchema }] = useForm({
        size: 'large',
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: hierarchyForm,
      });

      // 菜单个数
      const id = ref<number>(0);
      const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
        id.value = data.id;
        const treeData = await menuStore.getMenuItemTree();
        updateSchema({
          field: 'hierarchy',
          componentProps: { treeData },
        });
      });

      function renderTotalArr(total: number): number[] {
        const arr: number[] = [];
        for (var i = 1; i < total; i++) {
          arr.push(i);
        }
        return arr;
      }

      async function handleSubmit() {
        const value = await validate();
        const data = {
          id: unref(id),
          destParId: value.hierarchy,
        };
        const result = await menuStore.moveMenuItem(data);
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
        renderTotalArr,
        id,
      };
    },
  });
</script>

<style lang="less" scoped></style>
