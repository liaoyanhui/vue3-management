<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="合同审核"
    @ok="handleSubmit"
    :width="660"
    :minHeight="450"
  >
    <ul>
      <li v-for="(item, index) in attributeValueItems.data" :key="index">
        <div class="label">
          {{ item.attributeName }}
        </div>
        <div>{{ item.attributeValue }}</div>
      </li>
    </ul>
    <BasicForm @register="register1" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, unref, computed, ref, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useContractStore } from '/@/store/modules/contract';
  import { getContractTemplateList } from '/@/api/sys/contract';

  import { BasicForm, useForm, ApiSelect } from '/@/components/Form';
  import { auditSchema } from './data';
  import { Upload, message } from 'ant-design-vue';

  export default defineComponent({
    name: 'AuditContractModal',
    components: { BasicModal, BasicForm, [Upload.name]: Upload, ApiSelect },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const contractStore = useContractStore();
      const templateId = ref<any>(null);

      const [register1, { validate, resetFields, setFieldsValue, appendSchemaByField }] = useForm({
        size: 'large',
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: auditSchema,
      });

      const attributeValueItems = reactive<any>({
        data: [],
      });
      const contractId = ref<any>(null);
      const checkFlag = ref<any>(null);
      const [register, { closeModal, setModalProps }] = useModalInner((data) => {
        resetFields();
        console.log(data.record, 'record');
        attributeValueItems.data = data.record.attributeValueItems;
        contractId.value = data.record.id;
        checkFlag.value = data.record.checkFlag;
        let value: any = null;
        if (data.record.checkFlag) {
          value = null;
        }
        if (data.record.checkFlag === 1 || data.record.checkFlag === 3) {
          value = 1;
        }
        if (data.record.checkFlag === 2) {
          value = 0;
          setFieldsValue({
            checkFlag: value,
            errorMsg: data.record.errorMsg,
          });
        }
      });

      async function handleSubmit() {
        const values = await validate();
        if (checkFlag.value == 1 || checkFlag.value == 3) {
          if (values.checkFlag == 1) {
            message.warn('该合同已审核通过，不能重复通过！');
            return;
          }
        }
        const data: any = {
          contractId: contractId.value,
          checkFlag: values.checkFlag ? true : false,
          errorMsg: values.errorMsg,
        };
        // console.log(data, 'data')
        const result = await contractStore.checkContract(data);
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
        attributeValueItems,
        // keyword,
        getContractTemplateList,
      };
    },
  });
</script>

<style lang="less" scoped>
  ul {
    li {
      display: flex;
      margin-bottom: 10px;
      .label {
        width: 100px;
        text-align: right;
        margin-right: 8px;
      }
    }
  }
</style>
