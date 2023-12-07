<!--
 * @Description: 
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-12-02 16:36:49
 * @LastEditors: shangxia
 * @LastEditTime: 2023-12-06 09:24:08
-->
<template>
  <div>
    <BasicTable @register="registerTable" bordered>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '审核',
              onClick: handleAudit.bind(null, record),
            },
          ]"
        />
      </template>
      <!-- <template #toolbar>
        <div class="btn-box">
          <Button type="primary" @click="handleUpload"> 上传图片/视频 </Button>
        </div>
      </template> -->
      <template #pic="{ record }">
        <div v-if="record.informalCheckInfo">
          <ImagePreview :imageList="record.informalCheckInfo.picUrls.split(',')" class="img-list" />
        </div>
        <div v-else>
          <ImagePreview
            v-if="record.picUrls"
            :imageList="record.picUrls.split(',')"
            class="img-list"
          />
        </div>
      </template>
      <template #video="{ record }">
        <video
          class="img-video"
          v-if="record.informalCheckInfo"
          width="80"
          height="80"
          autoplay
          muted
          @click="handlePreview(record.informalCheckInfo.videoUrl)"
        >
          <source :src="record.informalCheckInfo.videoUrl" type="video/mp4" />
          <source :src="record.informalCheckInfo.videoUrl" type="video/ogg" />
          <source :src="record.informalCheckInfo.videoUrl" type="video/webm" />
          您的浏览器不支持 video 标签。
        </video>
        <video
          class="img-video"
          v-else
          width="80"
          height="80"
          autoplay
          muted
          @click="handlePreview(record.videoUrl)"
        >
          <source :src="record.videoUrl" type="video/mp4" />
          <source :src="record.videoUrl" type="video/ogg" />
          <source :src="record.videoUrl" type="video/webm" />
          您的浏览器不支持 video 标签。
        </video>
      </template>
    </BasicTable>
    <Modal
      :visible="previewVisible"
      :footer="null"
      @cancel="handleCancel"
      :width="600"
      centered
      destroyOnClose
    >
      <video width="600" controls autoplay muted>
        <source :src="previewImage.url" type="video/mp4" />
        <source :src="previewImage.url" type="video/ogg" />
        <source :src="previewImage.url" type="video/webm" />
        您的浏览器不支持 video 标签。
      </video>
    </Modal>
    <AuditModal @register="register1" @success="handleSuccess" />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { Button, Image, Modal } from 'ant-design-vue';
  import { getBasicColumns, searchBasic } from './data';
  import { useModal } from '/@/components/Modal';
  import { useStockStore } from '/@/store/modules/stock';
  import { ImagePreview } from '/@/components/Preview/index';
  import { useRoute } from 'vue-router';
  import AuditModal from './Modal/AuditModal.vue';

  export default defineComponent({
    name: 'ModelPicVideoLibrary',
    components: {
      BasicTable,
      TableAction,
      Button,
      Image,
      ImagePreview,
      Modal,
      AuditModal,
    },
    setup() {
      const route = useRoute();
      const stockStore = useStockStore();
      const [register1, { openModal }] = useModal();

      const [registerTable, { getForm, reload }] = useTable({
        api: (params) => {
          return stockStore.getStockPicVideoPageList(params);
        },
        columns: getBasicColumns(),
        canResize: true,
        showIndexColumn: false,
        showTableSetting: true,
        ellipsis: false,
        rowKey: 'id',
        actionColumn: {
          width: 150,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        tableSetting: { fullScreen: true },
        useSearchForm: true,
        formConfig: searchBasic(),
      });

      const previewImage = ref<{ url: string | undefined; name?: string | undefined }>({
        url: undefined,
      });
      const previewVisible = ref<boolean>(false);

      const handleCancel = () => {
        previewVisible.value = false;
      };
      function handlePreview(url: string) {
        previewImage.value = {
          url,
        };
        previewVisible.value = true;
      }

      function handleAudit(record: any) {
        openModal(true, {
          id: record.id,
        });
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleSuccess,
        handlePreview,
        previewVisible,
        previewImage,
        handleCancel,
        handleAudit,
        register1,
      };
    },
  });
</script>

<style lang="less" scoped>
  .btn-box {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
  :deep(.img-list) {
    .ant-image-img {
      width: 50px;
    }
  }
  .img-video {
    width: 80px;
    margin: 0 auto;
    // height: 76px;
  }
</style>
