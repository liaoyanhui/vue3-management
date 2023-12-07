<!--
 * @Description: 
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-11-23 16:57:50
 * @LastEditors: shangxia
 * @LastEditTime: 2023-12-06 16:24:40
-->
<template>
  <div>
    <BasicForm @register="register">
      <template #stockConfig="{ model, field }">
        <div class="flex items-center">
          <span>原装现货库存(已发布{{ stockConfig.data.originSpotStockUsed }}条)</span>
          <Input
            size="large"
            v-model:value="stockConfig.data.originSpotStockQuota"
            style="width: 120px; margin-left: 8px; margin-right: 8px"
          />
          <span>现货库存(已发布{{ stockConfig.data.spotStockUsed }}条)</span>
          <Input
            size="large"
            v-model:value="stockConfig.data.spotStockQuota"
            style="width: 120px; margin-left: 8px; margin-right: 8px"
          />
          <span>订货库存(已发布{{ stockConfig.data.orderStockUsed }}条)</span>
          <Input
            size="large"
            v-model:value="stockConfig.data.orderStockQuota"
            style="width: 120px; margin-left: 8px; margin-right: 8px"
          />
        </div>
      </template>
    </BasicForm>
    <div class="btn">
      <Button type="primary" @click="handleSubmit">确定</Button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, unref, watch, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { stockInfo } from './data';
  import { Input, Button, message } from 'ant-design-vue';
  import { useMemberStore } from '/@/store/modules/member';
  import moment from 'moment';

  export default defineComponent({
    name: 'OpenStock',
    components: { BasicForm, Input, Button },
    props: {
      id: {
        type: [Number, null] as PropType<Number | null>,
        default: null,
      },
    },
    setup(props, ctx) {
      const memberStore = useMemberStore();
      const stockConfig: any = reactive({
        data: {
          originSpotStockQuota: 0,
          originSpotStockUsed: 0,
          spotStockUsed: 0,
          spotStockQuota: 0,
          orderStockUsed: 0,
          orderStockQuota: 0,
        },
      });
      const id = ref<number>(0);
      const [register, { validate, resetFields, setFieldsValue }] = useForm({
        size: 'large',
        labelWidth: 120,
        showActionButtonGroup: false,
        schemas: stockInfo,
      });

      watch(
        () => props.id,
        async (newValue) => {
          if (newValue) {
            const result = await memberStore.getUserAllServiceList({
              userId: newValue,
              serviceType: 200,
            });
            if (result) {
              result.forEach((item: any) => {
                if (item.serviceType == 200) {
                  id.value = item.id;
                  setFieldsValue({
                    serviceType: item.serviceType,
                    payType: item.payType,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    state: item.state,
                    remark: item.remark,
                  });
                }
                if (item.serviceType == 201) {
                  stockConfig.data.originSpotStockQuota = item.maxUploadCount;
                  stockConfig.data.originSpotStockUsed = item.hasUploadCount;
                }
                if (item.serviceType == 202) {
                  stockConfig.data.spotStockQuota = item.maxUploadCount;
                  stockConfig.data.spotStockUsed = item.hasUploadCount;
                }
                if (item.serviceType == 203) {
                  stockConfig.data.orderStockQuota = item.maxUploadCount;
                  stockConfig.data.orderStockUsed = item.hasUploadCount;
                }
              });
            }
          }
        },
        { immediate: true },
      );

      async function handleSubmit() {
        const values = await validate();
        if (!stockConfig.data.spotStockQuota || !stockConfig.data.orderStockQuota) {
          message.warn('库存数量不能为空');
          return;
        }

        memberStore
          .saveUserService({
            userId: props.id,
            details: [
              {
                id: unref(id),
                serviceType: 200,
                serviceGrade: values.serviceGrade,
                payType: values.payType,
                startDate: moment(values.startDate).format('YYYY-MM-DD') + ' 00:00:00',
                endDate: moment(values.endDate).format('YYYY-MM-DD') + ' 00:00:00',
                state: values.state,
                remark: values.remark,
              },
              {
                id: unref(id),
                serviceType: 201,
                maxUploadCount: stockConfig.data.originSpotStockQuota,
              },
              {
                id: unref(id),
                serviceType: 202,
                maxUploadCount: stockConfig.data.spotStockQuota,
              },
              {
                id: unref(id),
                serviceType: 203,
                maxUploadCount: stockConfig.data.orderStockQuota,
              },
            ],
          })
          .then((res) => {
            if (res) {
              message.success('操作成功');
            }
          });
      }

      return { register, stockConfig, handleSubmit };
    },
  });
</script>
<style lang="less" scoped>
  .btn {
    text-align: center;
    margin: 15px 0 20px 0;
  }
</style>
