<!--
 * @Description: 
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-11-21 11:28:49
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-22 15:17:05
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="编辑合同"
    @ok="handleSubmit"
    :width="660"
    :minHeight="450"
  >
    <BasicForm @register="register1" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, unref, computed, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useContractStore } from '/@/store/modules/contract';
  import { getContractTemplateList } from '/@/api/sys/contract';

  import { BasicForm, useForm, ApiSelect } from '/@/components/Form';
  import { editFormSchema } from './data';
  import { Upload } from 'ant-design-vue';
  import moment from 'moment';

  export default defineComponent({
    name: 'EditContractModal',
    components: { BasicModal, BasicForm, [Upload.name]: Upload, ApiSelect },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const contractStore = useContractStore();
      const templateId = ref<any>(null);
      const contractId = ref<any>(null);
      const [
        register1,
        { validate, resetFields, setFieldsValue, appendSchemaByField, removeSchemaByFiled },
      ] = useForm({
        size: 'large',
        labelWidth: 120,
        showActionButtonGroup: false,
        schemas: editFormSchema,
      });

      const schemasKey = ref<any>([]);
      /**
       * @description: 插入表单
       * @param {*} data 默认模板数据
       * @param {*} attributeValues 填写的数据
       * @return {*}
       */
      function appendField(data: any, attributeValues: any) {
        const schemas = data.map((item, index) => {
          const newItem: any = {
            field: 'attributeName-' + item.id,
            label: item.attributeName,
            component: item.attributeTypeName,
            defaultValue: item.defaultValue,
            required: item.required,
            colProps: {
              span: 22,
            },
          };
          schemasKey.value.push('attributeName-' + item.id);
          if (item.attributeTypeName === 'Select') {
            const arr = item.defaultValue.split('|');
            const newArr: any = arr.map((item, index) => {
              return {
                label: item,
                value: item,
              };
            });
            newItem.componentProps = {
              options: [...newArr],
            };
            newItem.defaultValue = arr[0];
          }
          return newItem;
        });
        schemas.forEach((child: any, key: number) => {
          if (key === 0) {
            appendSchemaByField({ ...child }, 'userName');
          } else {
            appendSchemaByField({ ...child }, schemas[key].field);
          }
        });

        attributeValues.forEach((item: any, index: number) => {
          setFieldsValue({
            [`attributeName-${item.attributeId}`]: item.attributeValue,
          });
        });
      }
      const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
        removeSchemaByFiled(schemasKey.value);
        templateId.value = data.record.templateId;
        contractId.value = data.record.id;
        console.log(data.record, 'mmm');
        setFieldsValue({
          userName: data.record.userName,
        });
        const result = await contractStore.getContractAttributeList({
          templateId: data.record.templateId,
        });
        const attributeValues = data.record.attributeValueItems || [];
        appendField(result, attributeValues);
      });

      async function handleSubmit() {
        const values = await validate();
        const attributeArr = Object.keys(values).filter((item: any) => {
          return item.indexOf('attributeName-') >= 0;
        });
        const attributeValues = attributeArr.map((item: any) => {
          return {
            attributeId: Number(item.split('-')[1]),
            attributeValue:
              values[item] && values[item].toDate
                ? moment(values[item]).format('YYYY-MM-DD')
                : values[item],
          };
        });

        const data: any = {
          id: unref(contractId),
          templateId: unref(templateId),
          attributeValues: [...attributeValues],
        };
        const result = await contractStore.updateContract(data);
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
        getContractTemplateList,
      };
    },
  });
</script>

<style lang="less" scoped></style>
