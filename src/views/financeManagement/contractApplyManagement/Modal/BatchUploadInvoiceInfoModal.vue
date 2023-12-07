<template>
  <BasicModal
    v-bind="$attrs"
    title="批量上传发票信息"
    destroyOnClose
    :width="500"
    @register="register"
    @ok="handleSubmit"
  >
    <div class="tip">只针对已下载过的“正在开票”的数据进行批量更新</div>
    <BasicForm @register="register1">
      <template #invoiceZip="{ record }">
        <div class="up-file">
          <Upload
            name="file"
            multiple
            :customRequest="uploadImage"
            :beforeUpload="beforeUpload"
            :showUploadList="false"
            accept=".zip,.rar,"
          >
            <Button>选择文件</Button>
          </Upload>
          <span style="margin-left: 5px">{{ fileList ? fileList.file.name : '' }}</span>
          <div class="detail">
            xlsx中的格式为：发票号码|销售方名称|购买方名称|文件格式|下载结果如有变动，需要联系技术人员调整
          </div>
        </div>
      </template>
    </BasicForm>
    <Modal
      :visible="previewVisible"
      :footer="null"
      @cancel="handleCancel"
      :width="400"
      centered
      destroyOnClose
    >
      <div v-html="text" class="text"></div>
    </Modal>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { batchUploadInvoiceModalSchema } from './data';
  import { Upload, Button, message, Modal } from 'ant-design-vue';
  import { useInvoiceStore } from '/@/store/modules/invoice';

  export default defineComponent({
    name: 'BatchUploadInvoiceInfoModal',
    components: {
      BasicForm,
      BasicModal,
      Upload,
      Button,
      Modal,
    },
    emits: ['success', 'register', 'register1'],
    setup(props, { emit }) {
      const invoiceStore = useInvoiceStore();
      const [register, { closeModal }] = useModalInner();
      const [register1, { validate, resetFields, setFieldsValue }] = useForm({
        size: 'large',
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: batchUploadInvoiceModalSchema,
      });

      const fileList = ref<any>(undefined);
      const previewVisible = ref<boolean>(false);
      const text = ref<string>('');

      // 是否允许上传
      function beforeUpload(file: any) {
        const isLt2M = file.size / 1024 / 1024 < 50;
        if (!isLt2M) {
          message.error('文件不得大于50MB!');
          return false;
        }
        return true;
      }

      function uploadImage(info: any) {
        fileList.value = info;
      }
      const handleCancel = () => {
        previewVisible.value = false;
        text.value = '';
        fileList.value = undefined;
      };

      function handleSubmit() {
        if (fileList.value) {
          const formData: any = new FormData();
          formData.append('file', unref(fileList).file);
          invoiceStore.uploadInvoiceFile(formData).then((result: any) => {
            if (result) {
              text.value = result;
              previewVisible.value = true;
              closeModal();
              emit('success');
            }
          });
        } else {
          message.warn('请选择文件');
        }
      }

      return {
        register,
        register1,
        handleSubmit,
        beforeUpload,
        uploadImage,
        previewVisible,
        text,
        handleCancel,
        fileList,
      };
    },
  });
</script>

<style lang="less" scoped>
  .tip {
    color: red;
  }
  .up-file {
    margin: 5px 0 0 5px;
    .detail {
      font-size: 12px;
      margin-top: 5px;
    }
  }
  .text {
    text-align: center;
    padding: 40px 0;
  }
</style>
