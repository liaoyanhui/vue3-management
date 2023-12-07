<!--
 * @Description: 
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-11-23 16:57:50
 * @LastEditors: shangxia
 * @LastEditTime: 2023-12-06 14:47:06
-->
<template>
  <div>
    <BasicForm @register="register">
      <template #stockConfig="{ model, field }">
        <div class="flex items-center">
          <span>普通库存(已发布{{ stockConfig.data.normalStockUsed }}条)</span>
          <Input
            size="large"
            v-model:value="stockConfig.data.normalStockQuota"
            style="width: 160px; margin-left: 8px; margin-right: 8px"
          />
          <span>热卖库存(已发布{{ stockConfig.data.hotStockUsed }}条)</span>
          <Input
            size="large"
            v-model:value="stockConfig.data.hotStockQuota"
            style="width: 160px; margin-left: 8px; margin-right: 8px"
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
  import { memberInfo } from './data';
  import { Input, Button, message } from 'ant-design-vue';
  import { useMemberStore } from '/@/store/modules/member';
  import moment from 'moment';

  export default defineComponent({
    name: 'OpenMember',
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
          normalStockUsed: 0,
          normalStockQuota: 0,
          hotStockUsed: 0,
          hotStockQuota: 0,
        },
      });
      const id = ref<number>(0);
      const [register, { validate, resetFields, setFieldsValue }] = useForm({
        size: 'large',
        labelWidth: 120,
        showActionButtonGroup: false,
        schemas: memberInfo,
      });

      watch(
        () => props.id,
        async (newValue) => {
          if (newValue) {
            const result = await memberStore.getUserAllServiceList({
              userId: newValue,
              serviceType: 100,
            });
            console.log(result, '111');

            if (result) {
              result.forEach((item: any) => {
                if (item.serviceType == 100) {
                  id.value = item.id;
                  setFieldsValue({
                    serviceType: item.serviceType,
                    serviceGrade: item.serviceGrade,
                    payType: item.payType,
                    startDate: item.startDate,
                    endDate: item.endDate,
                    state: item.state,
                    remark: item.remark,
                  });
                }
                if (item.serviceType == 101) {
                  stockConfig.data.normalStockQuota = item.maxUploadCount;
                  stockConfig.data.normalStockUsed = item.hasUploadCount;
                }
                if (item.serviceType == 102) {
                  stockConfig.data.hotStockQuota = item.maxUploadCount;
                  stockConfig.data.hotStockUsed = item.hasUploadCount;
                }
              });
            }
          }
        },
        { immediate: true },
      );

      async function handleSubmit() {
        const values = await validate();
        if (!stockConfig.data.normalStockQuota || !stockConfig.data.hotStockQuota) {
          message.warn('库存数量不能为空');
          return;
        }

        memberStore
          .saveUserService({
            userId: props.id,
            details: [
              {
                id: unref(id),
                serviceType: 100,
                serviceGrade: values.serviceGrade,
                payType: values.payType,
                startDate: moment(values.startDate).format('YYYY-MM-DD') + ' 00:00:00',
                endDate: moment(values.endDate).format('YYYY-MM-DD') + ' 00:00:00',
                state: values.state,
                remark: values.remark,
              },
              {
                id: unref(id),
                serviceType: 101,
                maxUploadCount: stockConfig.data.normalStockQuota,
              },
              {
                id: unref(id),
                serviceType: 102,
                maxUploadCount: stockConfig.data.hotStockQuota,
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
