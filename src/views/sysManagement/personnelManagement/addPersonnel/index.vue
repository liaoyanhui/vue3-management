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
        <template #roleIds="{ model, field }">
          <div>
            <CheckboxGroup v-model:value="roleIds" :options="options.data" />
          </div>
        </template>
      </BasicForm>
      <div class="flex justify-center">
        <a-button
          v-if="hasPermission(permissionListSetting.USER_ENTITY_ADD)"
          class="!ml-4"
          type="primary"
          @click="handleSubmit"
        >
          新增
        </a-button>
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref, unref, watchEffect, reactive, onMounted } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicForm, useForm } from '/@/components/Form';
  import { Select, Input, Divider, Upload, Checkbox, message } from 'ant-design-vue';
  import { useUserStore } from '/@/store/modules/user';
  import { useUploadStore } from '/@/store/modules/upload';
  import { useRoleStore } from '/@/store/modules/role';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import { formSchema } from './data';
  import { UploadImgType } from '/@/enums/globalEnum';
  import { usePermission } from '/@/hooks/web/usePermission';
  import permissionListSetting from '/@/settings/permissionListSetting';

  export default defineComponent({
    name: 'AddPersonnel',
    components: {
      BasicForm,
      PageWrapper,
      CheckboxGroup: Checkbox.Group,
      [Select.name]: Select,
      // ASelectOption: Select.Option,
      [Upload.name]: Upload,
      [Input.name]: Input,
      [Input.Group.name]: Input.Group,
      [Divider.name]: Divider,
      LoadingOutlined,
      PlusOutlined,
    },
    setup() {
      const { hasPermission } = usePermission();

      const userStore = useUserStore();
      const uploadStore = useUploadStore();
      const roleStore = useRoleStore();
      const imageUrl = ref<any[]>([]);
      const wechatUrl = ref<any[]>([]);
      const videoPic = ref<any[]>([]);
      const videoUrl = ref();
      const loading = ref<boolean>(false);
      const wechatLoading = ref<boolean>(false);
      const videoLoading = ref<boolean>(false);

      const roleIds = ref<any>([]);
      const options = reactive<any>({
        data: [],
      });
      async function fetch() {
        const result = await roleStore.getRoleList();
        const formatOptions = result.map((item: any) => {
          item.label = item.name;
          item.value = item.id;
          return item;
        });
        options.data = formatOptions;
      }
      fetch();
      const [register, { validate, resetFields, setFieldsValue }] = useForm({
        size: 'large',
        labelWidth: 150,
        showActionButtonGroup: false,
        schemas: formSchema,
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
          console.log(values);
          if (!roleIds.value || roleIds.value.length == 0) {
            message.warn('请选择权限组');
            return;
          }
          const data = {
            ...values,
            pictureUrl: imageUrl.value[0],
            videoUrl: videoUrl.value,
            wechatUrl: wechatUrl.value[0],
            roleIds: roleIds.value,
          };
          const result = await userStore.addUser(data);
          if (result) {
            resetFields();
            roleIds.value = [];
            imageUrl.value = [];
            wechatUrl.value = [];
            videoPic.value = [];
            videoUrl.value = '';
            message.success('操作成功！');
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
        roleIds,
        options,
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
