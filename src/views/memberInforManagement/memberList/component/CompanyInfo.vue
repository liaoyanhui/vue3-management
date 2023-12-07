<!--
 * @Description: 
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-23 16:43:49
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-28 09:09:24
-->
<template>
  <div>
    <BasicForm @register="register1" :mergeDynamicData="{ modelType }">
      <template #localMap>
        <div>
          <Select
            :disabled="modelType == 1"
            v-model:value="province"
            size="large"
            class="drop"
            :options="provinceData"
          />
          <Select
            :disabled="modelType == 1"
            v-model:value="city"
            size="large"
            class="drop"
            :options="cityData"
          />
        </div>
      </template>
      <template #mainApplications="{ model, field }">
        <CheckboxGroup
          :disabled="modelType == 1"
          v-model:value="model[field]"
          name="checkboxgroup"
          :options="mainProductsOptions"
        />
      </template>
    </BasicForm>
    <div class="btn">
      <Button type="primary" @click="handleSubmit">修改</Button>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, unref, onMounted, ref, watch, reactive, watchEffect } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './data';
  import { useMemberStore } from '/@/store/modules/member';
  import { useCommonStore } from '/@/store/modules/common';
  import { Select, Button, CheckboxGroup, message } from 'ant-design-vue';

  export default defineComponent({
    name: 'CompanyInfo',
    components: { BasicForm, Select, Button, CheckboxGroup },
    props: {
      id: {
        type: [Number, null] as PropType<Number | null>,
        default: null,
      },
      modelType: {
        type: Number,
        default: () => null,
      },
    },
    setup(props, { emit }) {
      const memberStore = useMemberStore();
      const commonStore = useCommonStore();
      const items = ref<any>({});
      const [register1, { validate, resetFields, setFieldsValue }] = useForm({
        size: 'large',
        labelWidth: 120,
        showActionButtonGroup: false,
        schemas: formSchema,
      });

      // 获取主营应用领域列表
      const mainProductsOptions = ref<any[]>([]);
      function fetchMainProductList() {
        commonStore.getMainProductList().then((res) => {
          mainProductsOptions.value = res;
        });
      }

      onMounted(() => {
        fetchMainProductList();
      });

      // 国家 省 市
      const province = ref<any>(null);
      const city = ref<any>(null);
      const provinceData = ref([]);
      const cityData = ref([]);

      watchEffect(() => {
        commonStore.getProvinceList().then((res: any) => {
          provinceData.value = res;
        });
      });

      watch(
        () => province.value,
        (newVal) => {
          if (newVal) {
            commonStore.getCityList({ parId: province.value }).then((res: any) => {
              cityData.value = res;
            });
          } else {
            cityData.value = [];
          }
        },
        { deep: true, immediate: true },
      );

      const countryInfo: any = reactive({
        data: {},
      });
      watch(
        () => props.id,
        async (newValue) => {
          if (newValue) {
            const result = await memberStore.getMemberDetailById({
              userid: newValue,
            });
            if (result) {
              setFieldsValue({
                companyName: result.companyName,
                companyType: result.companyType ? result.companyType : null,
                companyProfile: result.companyProfile,
                companyShortName: result.companyShortName,
                mainApplications: result.mainApplications
                  ? result.mainApplications.split(',')
                  : null,
                companyAddress: result.companyAddress,
                contact: result.contact,
                email: result.email,
                telephone: result.telephone,
                mobilePhone: result.mobilePhone,
                qq: result.qq,
              });

              items.value = result;
              province.value = result.companyProvinceId;
              city.value = result.companyCityId;
            }
          }
        },
        { immediate: true },
      );

      async function handleSubmit() {
        try {
          const values = await validate();
          // 验证公司所在城市
          if (!province.value || !city.value) {
            message.warn('公司所在省市不能为空');
            return;
          }
          const data = {
            ...items.value,
            userId: props.id,
            companyName: values.companyName,
            companyShortName: values.companyShortName,
            companyType: values.companyType,
            companyProvinceId: province.value,
            companyCityId: city.value,
            companyProfile: values.companyProfile,
            mainApplications: values.mainApplications.join(','),
            companyAddress: values.companyAddress,
            contact: values.contact,
            email: values.email,
            telephone: values.telephone,
            mobilePhone: values.mobilePhone,
            qq: values.qq,
          };
          memberStore.saveUserInfoEdit({ ...data }).then((res) => {
            if (res) {
              message.success('操作成功');
            }
          });
        } catch (error) {}
      }

      return {
        register1,
        countryInfo,
        provinceData,
        province,
        city,
        cityData,
        handleSubmit,
        mainProductsOptions,
      };
    },
  });
</script>

<style lang="less" scoped>
  .drop {
    width: 130px;
    margin-right: 5px;
  }
  .btn {
    text-align: center;
    margin: 15px 0 20px 0;
  }
</style>
