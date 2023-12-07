<!--
 * @Description: 
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-23 16:43:49
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-29 16:34:18
-->
<template>
  <div>
    <BasicForm @register="register1" :mergeDynamicData="{ modelType }">
      <template #lastLoginDate="{ model, field }">
        <div>
          <span>{{ model['loginTime'] }}</span>
          <span style="margin-left: 8px">IP: {{ model['loginIP'] }}</span>
          <span class="canClick" @click="handleCheckLoginRecord">查看登录记录</span>
        </div>
      </template>
    </BasicForm>
    <div class="btn">
      <Button type="primary" @click="handleSubmit">修改</Button>
    </div>
    <LoginRecordModal @register="register2" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { memberFormSchema } from './data';
  import { useMemberStore } from '/@/store/modules/member';
  import LoginRecordModal from '../Modal/LoginRecordModal.vue';
  import { useModal } from '/@/components/Modal';
  import { Button, message } from 'ant-design-vue';

  export default defineComponent({
    name: 'MemberInfo',
    components: { BasicForm, LoginRecordModal, Button },
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
      const items = ref<any>({});
      const [register2, { openModal }] = useModal();
      const [register1, { validate, resetFields, setFieldsValue }] = useForm({
        size: 'large',
        labelWidth: 110,
        showActionButtonGroup: false,
        schemas: memberFormSchema,
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
                userName: result.userName,
                loginIP: result.loginIP,
                loginTime: result.loginTime,
                loginTimes: result.loginTimes,
                addDate: result.addDate,
                userType: result.userType,
                businessSysUserId: result.businessSysUserId == 0 ? null : result.businessSysUserId,
                state: result.state,
                autoRefreshCount: result.autoRefreshCount,
              });
              items.value = result;
            }
          }
        },
        { immediate: true },
      );

      function handleCheckLoginRecord() {
        openModal(true, {
          userId: props.id,
        });
      }

      function handleSuccess() {}
      async function handleSubmit() {
        try {
          const values = await validate();
          const data = {
            ...items.value,
            userId: props.id,
            userType: values.userType,
            businessSysUserId: values.businessSysUserId,
            state: values.state,
            autoRefreshCount: values.autoRefreshCount,
          };
          if (values.password) {
            data.password = values.password;
          }
          memberStore.saveUserInfoEdit({ ...data }).then((res) => {
            if (res) {
              message.success('操作成功');
            }
          });
        } catch (error) {}
      }
      return {
        register1,
        register2,
        handleCheckLoginRecord,
        handleSuccess,
        handleSubmit,
      };
    },
  });
</script>

<style lang="less" scoped>
  :global(.ant-form-item-label > label) {
    white-space: pre-wrap !important;
  }
  .canClick {
    color: @primary-color;
    cursor: pointer;
    margin-left: 5px;
  }
  .btn {
    text-align: center;
    margin: 15px 0 20px 0;
  }
</style>
