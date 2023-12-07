<!--
 * @Description: 
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-12-05 11:40:30
 * @LastEditors: shangxia
 * @LastEditTime: 2023-12-05 14:21:09
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="审核"
    @ok="handleSubmit"
    :width="660"
    :destroyOnClose="true"
  >
    <BasicForm @register="register1" />
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './data';
  import { useStockStore } from '/@/store/modules/stock';

  export default defineComponent({
    name: 'AuditModal',
    components: {
      BasicModal,
      BasicForm,
    },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const stockStore = useStockStore();
      const [register1, { validate }] = useForm({
        size: 'large',
        labelWidth: 120,
        showActionButtonGroup: false,
        schemas: formSchema,
      });

      const pvId = ref<number | undefined>(undefined);
      const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
        pvId.value = data.id;
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          stockStore
            .batchReviewStockPicVideo({
              ids: [pvId.value],
              checkFlag: values.checkFlag,
              checkNote: values.checkNote,
            })
            .then((res: any) => {
              if (res) {
                closeModal();
                emit('success');
              }
            });
        } catch (error) {}
      }

      return {
        register,
        register1,
        closeModal,
        handleSubmit,
        pvId,
      };
    },
  });
</script>
