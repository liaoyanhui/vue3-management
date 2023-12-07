<template>
  <BasicModal
    v-bind="$attrs"
    @register="register"
    title="编辑用户"
    @ok="handleSubmit"
    :width="660"
    :destroyOnClose="true"
  >
    <BasicForm @register="register1">
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
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, unref, UnwrapRef, ref, reactive } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useUserStore } from '/@/store/modules/user';
  import { useUploadStore } from '/@/store/modules/upload';
  import { BasicForm, useForm } from '/@/components/Form';
  import { formSchema } from './data';
  import { UploadImgType } from '/@/enums/globalEnum';
  import { Upload, Checkbox, message } from 'ant-design-vue';
  import { useRoleStore } from '/@/store/modules/role';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  // import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'EditPersonnelModel',
    components: {
      BasicModal,
      BasicForm,
      [Upload.name]: Upload,
      LoadingOutlined,
      PlusOutlined,
      CheckboxGroup: Checkbox.Group,
    },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const roleStore = useRoleStore();
      const userStore = useUserStore();
      const uploadStore = useUploadStore();

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

      async function fetch(id: number) {
        const userInfo = await userStore.getUserById({ id });
        if (userInfo) {
          const rolesIdArr = userInfo.roles || [];
          roleIds.value = rolesIdArr.map((item: any) => {
            return item.roleId;
          });
          setFieldsValue({
            username: userInfo.username,
            password: userInfo.password,
            realName: userInfo.realName,
            acronym: userInfo.acronym,
            sex: userInfo.sex ? 1 : 0,
            tel: userInfo.tel,
            qq: userInfo.qq,
            email: userInfo.email,
            openID: userInfo.openID,
            // wechatUrl: userInfo.wechatUrl,
            // videoUrl: userInfo.videoUrl,
          });
          if (userInfo.pictureUrl) {
            imageUrl.value = [userInfo.pictureUrl];
          }
          if (userInfo.wechatUrl) {
            wechatUrl.value = [userInfo.wechatUrl];
          }
          // if (userInfo.videoUrl) {
          //   videoUrl.value = [userInfo.videoUrl];
          // }
          videoPic.value = [userInfo.thumbnailUrl];
        }

        const result = await roleStore.getRoleList();
        const formatOptions = result.map((item: any) => {
          item.label = item.name;
          item.value = item.id;
          return item;
        });
        options.data = formatOptions;
      }

      // 用户ID
      const currentId = ref();
      const [register1, { validate, resetFields, setFieldsValue }] = useForm({
        size: 'large',
        labelWidth: 120,
        showActionButtonGroup: false,
        schemas: formSchema,
      });

      const [register, { closeModal, setModalProps }] = useModalInner(async (data) => {
        const record = data.record;
        currentId.value = record.id;
        fetch(currentId.value);
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
        const values = await validate();
        if (!roleIds.value || roleIds.value.length == 0) {
          message.warning('权限组必须选择一个！');
          return;
        }
        const data = {
          id: currentId.value,
          username: values.username,
          password: values.password,
          realName: values.realName,
          acronym: values.acronym,
          sex: values.sex ? 1 : 0,
          // videoUrl: videoUrl.value[0],
          wechatUrl: wechatUrl.value[0],
          pictureUrl: imageUrl.value[0],
          videoUrl: videoUrl.value,
          tel: values.tel,
          qq: values.qq,
          email: values.email,
          openID: values.openID,
          roleIds: roleIds.value,
        };
        if (values.password) {
          data.password = values.password;
        }
        const result = await userStore.updateUser(data);
        if (result) {
          resetFields();
          imageUrl.value = [];
          wechatUrl.value = [];
          videoPic.value = [];
          videoUrl.value = null;
          closeModal();
          emit('success');
        }
      }
      return {
        register,
        register1,
        closeModal,
        handleSubmit,
        uploadImageOrVideo,
        imageUrl,
        wechatUrl,
        loading,
        wechatLoading,
        videoLoading,
        videoUrl,
        videoPic,
        roleIds,
        options,
        UploadImgType,
      };
    },
  });
</script>

<style lang="less" scoped></style>
