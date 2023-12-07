<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="申请合同"
    @ok="handleSubmit"
    :width="660"
    :minHeight="450"
  >
    <BasicForm @register="register1">
      <template #contract="{ model, field }">
        <ApiSelect
          :api="getContractTemplateList"
          showSearch
          v-model:value="model[field]"
          optionFilterProp="label"
          resultField="list"
          labelField="name"
          valueField="id"
          @change="onChange"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, unref, computed, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useContractStore } from '/@/store/modules/contract';
  import { getContractTemplateList } from '/@/api/sys/contract';

  import { BasicForm, useForm, ApiSelect } from '/@/components/Form';
  import { formSchema } from './data';
  import { Upload } from 'ant-design-vue';
  import moment from 'moment';

  export default defineComponent({
    name: 'ApplyContractModal',
    components: { BasicModal, BasicForm, [Upload.name]: Upload, ApiSelect },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const contractStore = useContractStore();
      const templateId = ref<any>(null);
      const [
        register1,
        { validate, resetFields, setFieldsValue, appendSchemaByField, removeSchemaByFiled },
      ] = useForm({
        size: 'large',
        labelWidth: 120,
        showActionButtonGroup: false,
        schemas: formSchema,
      });

      const schemasKey = ref<any>([]);
      function appendField(data: any) {
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
            const arr = item.defaultValue ? item.defaultValue.split('|') : [];
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
            appendSchemaByField({ ...child }, 'contract');
          } else {
            appendSchemaByField({ ...child }, schemas[key].field);
          }
          setFieldsValue({
            [`${child['field']}`]: child.defaultValue,
          });
        });
      }
      async function onChange(value: string) {
        removeSchemaByFiled(schemasKey.value);
        const result = await contractStore.getContractAttributeList({
          templateId: value,
        });
        templateId.value = value;
        appendField(result);
      }
      const [register, { closeModal, setModalProps }] = useModalInner();

      async function handleSubmit() {
        const values = await validate();
        const attributeArr = Object.keys(values).filter((item: any) => {
          return item.indexOf('attributeName-') >= 0;
        });
        const attributeValues = attributeArr.map((item: any) => {
          return {
            attributeId: Number(item.split('-')[1]),
            attributeValue: values[item]
              ? values[item].toDate
                ? moment(values[item]).format('YYYY-MM-DD')
                : values[item]
              : '',
          };
        });
        const data: any = {
          userName: values.userName,
          userNames: values.userNames && values.userNames.split('|'),
          templateId: unref(templateId),
          attributeValues: [...attributeValues],
        };
        const result = await contractStore.applyContract(data);
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
        // searchParams,
        // keyword,
        onChange,
        getContractTemplateList,
      };
    },
  });
</script>

<style lang="less" scoped></style>
