<!--
 * @Description: 
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-06 11:47:12
 * @LastEditors: shangxia
 * @LastEditTime: 2023-02-23 09:05:54
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="菜单排序"
    @ok="handleSubmit"
    :width="400"
    :bodyStyle="{ minHeight: '150px' }"
  >
    <BasicForm @register="register1">
      <template #destSequence="{}">
        <a-select v-model:value="sequence">
          <a-select-option v-for="(item, index) in menuTotal" :key="index" :value="item">
            {{ item }}
          </a-select-option>
        </a-select>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, UnwrapRef, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useMenuStore } from '/@/store/modules/menu';
  import { BasicForm, useForm } from '/@/components/Form';
  import { sequenceForm } from './data';
  import { Select } from 'ant-design-vue';
  // import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'MenuSortModal',
    components: { BasicModal, BasicForm, [Select.name]: Select, ASelectOption: Select.Option },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const menuStore = useMenuStore();
      // const route = useRoute();
      // 用户ID
      // const menuId = ref(route.params?.menuId);
      const [register1, { validate, resetFields, setFieldsValue }] = useForm({
        size: 'large',
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: sequenceForm,
      });

      // 菜单个数
      const menuTotal = ref<number>(0);
      const sequence = ref<number>(0);
      const id = ref<number>(0);
      const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
        menuTotal.value = data.menuTotal;
        sequence.value = data.sequence;
        id.value = data.id;
      });

      function renderTotalArr(total: number): number[] {
        const arr: number[] = [];
        for (var i = 1; i < total; i++) {
          arr.push(i);
        }
        return arr;
      }

      async function handleSubmit() {
        await validate();
        const data = {
          id: unref(id),
          destSequence: unref(sequence),
        };
        // console.log(data, '222');
        const result = await menuStore.updateMenuItemSequence(data);
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
        menuTotal,
        renderTotalArr,
        sequence,
        id,
      };
    },
  });
</script>

<style lang="less" scoped></style>
