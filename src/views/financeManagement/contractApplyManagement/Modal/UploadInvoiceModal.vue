<!--
 * @Description: 申请开票 
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-11-30 10:29:12
 * @LastEditors: shangxia
 * @LastEditTime: 2023-12-06 10:46:04
-->
<template>
  <BasicModal
    v-bind="$attrs"
    title="上传发票"
    destroyOnClose
    :width="700"
    @register="register"
    @ok="handleSubmit"
    :afterClose="handleAfterClose"
  >
    <BasicForm @register="register1">
      <template #invoicePic>
        <div class="box">
          <div class="img-list" v-for="(item, index) in fileList" :key="index">
            <Image
              v-if="pdfReg.test(item)"
              src="/src/assets/images/pdf.png"
              alt=""
              :width="40"
              :height="40"
            />
            <Image v-else :src="item" alt="" :width="70" :height="70" />
            <DeleteOutlined @click="handleDel(item)" class="icon" />
          </div>
          <Upload
            class="invoice-upload"
            name="formFile"
            multiple
            list-type="picture-card"
            :customRequest="uploadImage"
            :beforeUpload="beforeUpload"
            :showUploadList="false"
            accept=".jpg,.jpeg,.gif,.png,.webp,.pdf"
          >
            <div v-if="fileList.length < 5" class="upload-btn">
              <span>请上传图片</span>
            </div>
          </Upload>
        </div>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Button, Upload, message, Image } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form';
  import { uploadInvoiceModalSchema } from './data';
  import { useUploadStore } from '/@/store/modules/upload';
  import { useInvoiceStore } from '/@/store/modules/invoice';
  import { DeleteOutlined } from '@ant-design/icons-vue';
  import { pdfReg } from '/@/utils/reg';

  export default defineComponent({
    name: 'UploadInvoiceModal',
    components: {
      BasicForm,
      BasicModal,
      Button,
      Upload,
      Image,
      DeleteOutlined,
    },
    emits: ['success', 'register', 'register1'],
    setup(props, { emit }) {
      const uploadStore = useUploadStore();
      const invoiceStore = useInvoiceStore();
      const invoiceId = ref<number | undefined>(undefined);
      const [register, { closeModal }] = useModalInner((data) => {
        const { record } = data;
        invoiceId.value = record.id;
        setFieldsValue({
          invoiceStateDesc: record.invoiceStateDesc,
          invoiceTypeDesc: record.invoiceTypeDesc,
          invoiceCompany: record.invoiceCompany,
          paymentDate: record.paymentDate,
          title: record.title,
          taxpayerNumber: record.taxpayerNumber,
          address: record.address,
          telePhone: record.telePhone,
          bankName: record.bankName,
          bankNumber: record.bankNumber,
          // remark: record.remark,
        });
      });
      const [register1, { validate, resetFields, setFieldsValue }] = useForm({
        size: 'large',
        labelWidth: 100,
        showActionButtonGroup: false,
        schemas: uploadInvoiceModalSchema,
      });
      const fileList = ref<any[]>([]);

      // 是否允许上传
      function beforeUpload(file: any) {
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
          message.error('图片不得大于5MB!');
          return false;
        }
        return true;
      }

      async function uploadImage(info: any) {
        // 图片
        const formData: any = new FormData();
        formData.append('formFile', info?.file);
        uploadStore
          .globalUpload({
            data: formData,
            type: info.file.type,
          })
          .then((result: any) => {
            if (result) {
              fileList.value = [...fileList.value, result.fileUrl];
            }
          });
      }

      function handleDel(url: string) {
        const list = fileList.value.filter((item) => item != url);
        fileList.value = [...list];
      }

      // 提交保存
      async function handleSubmit() {
        if (!fileList.value || fileList.value.length == 0) {
          message.warn('请上传发票');
          return;
        }
        await validate()
          .then((res) => {
            if (res) {
              invoiceStore
                .saveInvoiceDetail({
                  id: invoiceId.value,
                  invoicePicsUrl: fileList.value.join('|'),
                  remark: res.remark,
                })
                .then((result) => {
                  if (result) {
                    fileList.value = [];
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

      function handleAfterClose(): any {
        resetFields();
      }

      return {
        register,
        register1,
        resetFields,
        handleSubmit,
        handleAfterClose,
        beforeUpload,
        uploadImage,
        fileList,
        handleDel,
        pdfReg,
      };
    },
  });
</script>

<style lang="less" scoped>
  .tip {
    color: red;
    padding-left: 30px;
  }
  .box {
    display: flex;
  }
  .img-list {
    display: inline-block;
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
    border: 1px solid #ddd;
    margin-right: 8px;
    cursor: pointer;
    position: relative;
    & :deep(.ant-image) {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .ant-image-img {
        max-height: 100%;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .icon {
      font-size: 16px;
      display: none;
      color: red;
      background-color: #fff;
      border-radius: 5px;
      padding: 3px;
      position: absolute;
      top: 2px;
      right: 2px;
    }
  }
  .img-list:hover {
    .icon {
      display: block;
    }
  }
  .invoice-upload {
    width: auto;
    & :deep(.ant-upload.ant-upload-select-picture-card) {
      background-color: #fff;
      width: 90px;
      height: 90px;
    }
  }
</style>
