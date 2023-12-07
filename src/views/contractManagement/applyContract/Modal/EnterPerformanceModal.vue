<!--
 * @Description: 申请开票
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-11-30 10:29:12
 * @LastEditors: shangxia
 * @LastEditTime: 2023-12-01 14:57:46
-->
<template>
  <BasicModal
    v-bind="$attrs"
    title="业绩录入"
    destroyOnClose
    :width="700"
    @register="register"
    @ok="handleSubmit"
    :afterClose="handleAfterClose"
  >
    <BasicForm @register="register1">
      <template #businessType="{ model, field }">
        <Select
          style="width: 130px"
          size="large"
          placeholder="请选择"
          allowClear
          v-model:value="businessType1"
          :options="businessTypeList1"
        />
        <Select
          v-if="businessType1"
          allowClear
          size="large"
          placeholder="请选择"
          style="width: 130px; margin-left: 10px"
          v-model:value="businessType2"
          :options="businessTypeList2"
        />
        <Select
          v-if="businessType2 && businessType2 == 7"
          allowClear
          size="large"
          placeholder="请选择"
          style="width: 240px; margin-left: 10px"
          v-model:value="businessType3"
          :options="businessTypeList3"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { Button, Upload, Select, message } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { enterPerformanceModalSchema } from './data';
  import { useContractStore } from '/@/store/modules/contract';
  import moment from 'moment';

  export default defineComponent({
    name: 'EnterPerformanceModal',
    components: {
      BasicForm,
      BasicModal,
      Button,
      Upload,
      Select,
    },
    emits: ['success', 'register', 'register1'],
    setup(props, { emit }) {
      const contractStore = useContractStore();
      const [register1, { validate, resetFields, setFieldsValue }] = useForm({
        size: 'large',
        labelCol: { style: { width: '95px', whiteSpace: 'pre-wrap' } },
        showActionButtonGroup: false,
        schemas: enterPerformanceModalSchema,
      });

      const businessType1 = ref<number | undefined>(undefined);
      const businessTypeList1 = ref<any[]>([]);

      const businessType2 = ref<number | undefined>(undefined);
      const businessTypeList2 = ref<any[]>([]);

      const businessType3 = ref<number | undefined>(undefined);
      const businessTypeList3 = ref<any[]>([]);

      const contractId = ref<number | undefined>(undefined);
      const [register, { closeModal }] = useModalInner((data: any) => {
        contractId.value = data.contractId;
        contractStore.getInitPerformanceInfo({ contractId: contractId.value }).then((res) => {
          res &&
            setFieldsValue({
              contractNo: res.contractNo,
              companyName: res.companyName,
            });
        });

        // 获取业务类型
        getBusinessList(1, 0, 1);
      });

      //
      function getBusinessList(type: number, parId: number, updateType: number) {
        // 获取业务类型
        contractStore
          .getPerformanceOptionByType({
            type,
            parId,
          })
          .then((res) => {
            if (res) {
              if (updateType == 1) {
                businessTypeList1.value = res;
              } else if (updateType == 2) {
                businessTypeList2.value = res;
              } else if (updateType == 3) {
                businessTypeList3.value = res;
              }
            }
          });
      }

      // 监听业务类型1变化
      watch(
        () => businessType1.value,
        (val) => {
          if (val) {
            businessType2.value = undefined;
            getBusinessList(1, val, 2);
          }
        },
      );

      // 监听业务类型2变化
      watch(
        () => businessType2.value,
        (val) => {
          if (val && val == 7) {
            businessType3.value = undefined;
            getBusinessList(4, val, 3);
          } else {
            businessTypeList3.value = [];
          }
        },
      );

      // 提交保存
      async function handleSubmit() {
        // 业务类型是否选中判断
        if (!businessType1.value || !businessType2.value) {
          message.warn('业务类型请选择完整');
          return;
        }

        if (businessType2.value == 7 && !businessType3.value) {
          message.warn('业务展会类型未选择');
          return;
        }
        await validate()
          .then((res) => {
            if (res) {
              const data: any = {
                contractId: contractId.value,
                contractNo: res.contractNo,
                companyName: res.companyName,
                years: res.years,
                bankId: res.bankId,
                isRenew: res.isRenew,
                price: res.price,
                balance: res.balance,
                balanceDate: moment(res.balanceDate).format('YYYY-MM-DD'),
                isOpenService: res.isOpenService == 1 ? true : false,
                openServiceEndDate: moment(res.openServiceEndDate).format('YYYY-MM-DD'),
                businessUserId: res.businessUserId,
                remark: res.remark,
                effectDate: moment(res.effectDate).format('YYYY-MM-DD'),
              };

              data.productClassId = businessType2.value;
              data.exhibitionId = businessType3.value;

              contractStore.addPerformanceInfo(data).then((res) => {
                if (res) {
                  message.success('操作成功');
                  clearAll();
                  closeModal();
                  emit('success');
                }
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

      function clearAll() {
        businessType1.value = undefined;
        businessType2.value = undefined;
        businessType3.value = undefined;

        businessTypeList1.value = [];
        businessTypeList2.value = [];
        businessTypeList3.value = [];
      }
      function handleAfterClose(): any {
        resetFields();
      }

      return {
        register,
        register1,
        resetFields,
        handleSubmit,
        handleAfterClose,
        businessType1,
        businessTypeList1,
        businessType2,
        businessTypeList2,
        businessType3,
        businessTypeList3,
      };
    },
  });
</script>

<style lang="less" scoped>
  .tip {
    color: red;
    padding-left: 30px;
  }
</style>
