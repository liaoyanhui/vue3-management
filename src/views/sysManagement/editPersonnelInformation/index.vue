<template>
  <PageWrapper>
    <div class="py-8 bg-white flex flex-col justify-center">
      <BasicForm @register="register">
        <template #pictureUrl="{ model, field }">
          <a-upload
            accept=".jpg,.jpeg,.png"
            :file-list="imageUrl"
            list-type="picture-card"
            :show-upload-list="false"
            :customRequest="(file) => uploadImageOrVideo(file, UploadImgType['PICTURE'])"
          >
            <img v-if="imageUrl[0]" :src="imageUrl[0]" alt="avatar" />
            <div v-else>
              <LoadingOutlined v-if="loading" />
              <PlusOutlined v-else />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </template>
        <template #wechatUrl="{ model, field }">
          <a-upload
            accept=".jpg,.jpeg,.png"
            :file-list="wechatUrl"
            list-type="picture-card"
            :show-upload-list="false"
            :customRequest="(file) => uploadImageOrVideo(file, UploadImgType['WECHAT'])"
          >
            <img v-if="wechatUrl[0]" :src="wechatUrl[0]" alt="avatar" />
            <div v-else>
              <LoadingOutlined v-if="wechatLoading" />
              <PlusOutlined v-else />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </template>
        <template #videoPic="{ model, field }">
          <a-upload
            accept="video/*"
            :file-list="videoPic"
            list-type="picture-card"
            :show-upload-list="false"
            :customRequest="(file) => uploadImageOrVideo(file, UploadImgType['VIDEO'])"
          >
            <img v-if="videoPic[0]" :src="videoPic[0]" alt="avatar" />
            <div v-else>
              <LoadingOutlined v-if="videoLoading" />
              <PlusOutlined v-else />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </template>
      </BasicForm>
      <div class="flex justify-center">
        <a-button
          v-if="hasPermission(permissionListSetting.USER_ENTITY_UPDATE)"
          class="!ml-4"
          type="primary"
          @click="handleSubmit"
        >
          修改
        </a-button>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, watchEffect, reactive, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form';
  import { Select, Input, Divider, Upload, message } from 'ant-design-vue';
  import { useUserStore } from '/@/store/modules/user';
  import { useUploadStore } from '/@/store/modules/upload';
  import { useAccountStore } from '/@/store/modules/account';
  // import { useRoleStore } from '/@/store/modules/role';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import { formSchema } from './data';
  import { UploadImgType } from '/@/enums/globalEnum';
  import { usePermission } from '/@/hooks/web/usePermission';
  import permissionListSetting from '/@/settings/permissionListSetting';

  export default defineComponent({
    name: 'EditPersonnelInformation',
    components: {
      BasicForm,
      PageWrapper,
      [Select.name]: Select,
      [Upload.name]: Upload,
      [Input.name]: Input,
      [Input.Group.name]: Input.Group,
      [Divider.name]: Divider,
      LoadingOutlined,
      PlusOutlined,
    },
    setup() {
      const { hasPermission } = usePermission();
      const accountStore = useAccountStore();
      const uploadStore = useUploadStore();

      const imageUrl = ref<any[]>([]);
      const wechatUrl = ref<any[]>([]);
      const videoPic = ref<any[]>([]);
      const videoUrl = ref();
      const loading = ref<boolean>(false);
      const wechatLoading = ref<boolean>(false);
      const videoLoading = ref<boolean>(false);

      const [register, { validate, resetFields, setFieldsValue }] = useForm({
        size: 'large',
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: formSchema,
      });

      onMounted(async () => {
        const userInfo: any = await accountStore.getUserInfoAction();
        setFieldsValue({
          username: userInfo.username,
          englishName: userInfo.englishName,
          tel: userInfo.tel,
          qq: userInfo.qq,
          email: userInfo.email,
          isOnline: userInfo.isOnline ? 1 : 0,
        });
        imageUrl.value = [userInfo.pictureUrl];
        wechatUrl.value = [userInfo.wechatUrl];
        videoPic.value = [userInfo.thumbnailUrl];
      });

      function fnLoading(type: UploadImgType, doSth: boolean) {
        switch (type) {
          case UploadImgType.PICTURE:
            loading.value = doSth;
            break;
          case UploadImgType.WECHAT:
            wechatLoading.value = doSth;
            break;
          case UploadImgType.VIDEO:
            videoLoading.value = doSth;
            break;
          default:
            break;
        }
      }
      // 上传图片或者视频
      const uploadImageOrVideo = async (info: any, type: UploadImgType) => {
        fnLoading(type, true);
        const formData = new FormData();
        formData.append('formFile', info.file);
        let result: any = await uploadStore.globalUpload({
          data: formData,
          type: info.file.type,
        });
        fnLoading(type, false);
        if (result) {
          switch (type) {
            case UploadImgType.PICTURE:
              imageUrl.value = [result.fileUrl];
              break;
            case UploadImgType.WECHAT:
              wechatUrl.value = [result.fileUrl];
              break;
            case UploadImgType.VIDEO:
              videoPic.value = [result.thumbnailUrl];
              videoUrl.value = result.fileUrl;
              break;
            default:
              break;
          }
        }
      };

      async function handleSubmit() {
        try {
          const values = await validate();
          if (values.password) {
            if (values.password !== values.passwordAgain) {
              message.error('两次密码不一致');
              return;
            }
          }
          const data = {
            ...values,
            pictureUrl: imageUrl.value[0],
            videoUrl: videoUrl.value,
            wechatUrl: wechatUrl.value[0],
          };
          const result = await accountStore.updateUserInfo(data);
          if (result) {
            message.success('修改信息成功!');
          }
        } catch (error) {}
      }

      return {
        register,
        resetFields,
        handleSubmit,
        uploadImageOrVideo,
        imageUrl,
        wechatUrl,
        loading,
        wechatLoading,
        // roleIds,
        // options,
        UploadImgType,
        videoLoading,
        videoUrl,
        videoPic,
        hasPermission,
        permissionListSetting,
      };
    },
  });
</script>
