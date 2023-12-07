<template>
  <div>
    <BasicTable
      bordered
      @register="registerTable"
      :rowSelection="{ type: 'checkbox', selectedRowKeys: checkedKeys, onChange: onSelectChange }"
    >
      <template #userName="{ record }">
        <div class="user-name">
          <div>用户名: {{ record.userName }}</div>
          <div>
            <span>{{ record.userTypeDesc }}</span>
          </div>
          <div>身份证状态:{{ record.hasUploadIdCardPic ? '已上传' : '未上传' }}</div>
        </div>
      </template>
      <template #company="{ record }">
        <div class="company-info">
          <div>公司名：{{ record.companyName }}</div>
          <div>
            <Popover trigger="hover" placement="bottom">
              <template #title>
                <div class="title" @click="handleCopy(record)"> 一键复制联系方式 </div>
              </template>
              <template #content>
                <div class="content">
                  <div>
                    <span class="contact-detail-content-key">联系人：</span>
                    <span>{{ record.contact }}</span>
                  </div>
                  <div>
                    <span class="contact-detail-content-key">地址：</span>
                    <span>{{ record.companyAddress }}</span>
                  </div>
                  <div>
                    <span class="contact-detail-content-key">电话：</span>
                    <span>{{ record.telephone }}</span>
                  </div>
                  <div>
                    <span class="contact-detail-content-key">手机：</span>
                    <span>{{ record.mobilePhone }}</span>
                  </div>
                  <div>
                    <span class="contact-detail-content-key">QQ：</span>
                    <span v-for="(item, index) in record.qq.split(',')" :key="index">
                      <img
                        v-if="item"
                        class="qq-img"
                        src="https://img3.dzsc.com/img/common/qq.gif"
                        alt=""
                        @click="handleDropQQ(item)"
                      />
                    </span>
                  </div>
                </div>
              </template>
              <span class="check-contact">查看联系方式</span>
            </Popover>
            <span
              class="check-license"
              v-if="record.businessLicensePic"
              @click="handleCheckLicense(record.businessLicensePic)"
              >查看执照</span
            >
          </div>
          <div> 主营行业: {{ record.mainApplicationNames }} </div>
        </div>
      </template>
      <template #date="{ record }">
        <div class="date">
          <span>注册时间：</span>
          <span>{{ record.addDate }}</span>
        </div>
        <div class="date">
          <span>最新登录时间：</span>
          <span>{{ record.loginTime }} ({{ record.loginTimes }}次)</span>
        </div>
      </template>
      <template #inventory="{ record }">
        <!-- <div class="inventory">
          <span class="canClick" @click="handleNormal(record.id)"
            >普通{{ record.config.normalStockUsed }}/{{ record.config.normalStockQuota }}</span
          >
          <span class="canClick" @click="handleAdvantage(record.id)">
            现货{{ record.config.advantageStockUsed }}/{{ record.config.advantageStockQuota }}
          </span>
          <span class="canClick" @click="handleOrder(record.id)">
            订货{{ record.config.orderStockUsed }}/{{ record.config.orderStockQuota }}
          </span>
        </div> -->
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '查看',
              onClick: handleCheck.bind(null, record),
              ifShow: hasPermission(permissionListSetting.MEMBER_QUERY_ENTITY),
            },

            {
              label: '编辑',
              onClick: handleEdit.bind(null, record),
              ifShow: hasPermission(permissionListSetting.MEMBER_ENTITY_UPDATE),
            },
          ]"
        />
      </template>
    </BasicTable>
    <MemberDetailModal @register="register1" @success="handleSuccess" :destroyOnClose="true" />
    <NormalStockRecordModal @register="register2" @success="handleSuccess" />
    <AdvantageStockRecordModal @register="register3" @success="handleSuccess" />
    <OrderStockRecordModal @register="register4" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, searchCondition } from './data';
  import { useMemberStore } from '/@/store/modules/member';
  import { useModal } from '/@/components/Modal';
  import MemberDetailModal from './Modal/MemberDetailModal.vue';
  import NormalStockRecordModal from './Modal/NormalStockRecordModal.vue';
  import AdvantageStockRecordModal from './Modal/AdvantageStockRecordModal.vue';
  import OrderStockRecordModal from './Modal/OrderStockRecordModal.vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import permissionListSetting from '/@/settings/permissionListSetting';
  import { useRoute, useRouter } from 'vue-router';
  import { Popover, message } from 'ant-design-vue';
  import useClipboard from 'vue-clipboard3';

  export default defineComponent({
    name: 'MemberList',
    components: {
      BasicTable,
      TableAction,
      MemberDetailModal,
      NormalStockRecordModal,
      AdvantageStockRecordModal,
      OrderStockRecordModal,
      Popover,
    },
    setup() {
      const { toClipboard } = useClipboard();
      const { hasPermission } = usePermission();
      const memberStore = useMemberStore();
      const checkedKeys = ref<Array<string | number>>([]);
      const route = useRoute();
      const router = useRouter();
      const [register1, { openModal }] = useModal();
      const [register2, { openModal: openModalN }] = useModal();
      const [register3, { openModal: openModalA }] = useModal();
      const [register4, { openModal: openModalO }] = useModal();
      const [registerTable, { getForm, reload }] = useTable({
        // title: '开启搜索区域',
        api: (params) => {
          return memberStore.getReviewedMemberPagedList(params);
        },
        columns: getBasicColumns(),
        useSearchForm: true,
        formConfig: searchCondition(),
        showTableSetting: true,
        tableSetting: { fullScreen: true },
        showIndexColumn: false,
        ellipsis: false,
        rowKey: 'id',
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      onMounted(() => {
        if (route.query.memberType) {
          const { setFieldsValue } = getForm();
          setFieldsValue({
            memberType: Number(route.query.memberType),
          });
        }
        if (route.query.memberGrade) {
          const { setFieldsValue } = getForm();
          setFieldsValue({
            memberGrade: route.query.memberGrade,
          });
        }
      });

      function onSelectChange(selectedRowKeys: (string | number)[]) {
        checkedKeys.value = selectedRowKeys;
      }

      function handleCheck(record: any) {
        openModal(true, {
          id: record.id,
          modelType: 1,
        });
      }
      function handleEdit(record: any) {
        openModal(true, {
          id: record.id,
          modelType: 2,
        });
      }

      function handleSuccess() {
        reload();
      }

      function handleNormal(id: any) {
        openModalN(true, {
          userId: id,
        });
      }

      function handleAdvantage(id: any) {
        openModalA(true, {
          userId: id,
        });
      }

      function handleOrder(id: any) {
        openModalO(true, {
          userId: id,
        });
      }

      // 跳转qq
      function handleDropQQ(qq: string) {
        if (qq) {
          window.open(`https://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes&jumpflag=1`);
        }
      }

      // 复制到剪切板
      const handleCopy = async (record?: any) => {
        try {
          const copyContent = `联系人：${record.contact}\n地址：${record.companyAddress}\n电话：${record.telephone}\n手机：${record.mobilePhone}\nQQ：${record.qq}`;
          await toClipboard(copyContent);
          message.success('复制成功！');
        } catch (e) {
          message.error('复制失败！您的浏览器不支持复制功能！');
        }
      };

      function handleCheckLicense(url?: string) {
        if (url) {
          window.open(url, '_blank');
        }
      }

      return {
        registerTable,
        checkedKeys,
        onSelectChange,
        handleCheck,
        handleEdit,
        register1,
        register2,
        register3,
        register4,
        openModal,
        openModalN,
        openModalA,
        openModalO,
        handleSuccess,
        handleAdvantage,
        handleNormal,
        hasPermission,
        permissionListSetting,
        handleOrder,
        handleDropQQ,
        handleCopy,
        handleCheckLicense,
      };
    },
  });
</script>

<style lang="less" scoped>
  .pic {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  .canClick {
    color: @primary-color;
    cursor: pointer;
  }
  .line {
    margin: 0 5px;
  }
  .company-info {
    text-align: left;
  }
  .shop {
    color: @primary-color;
    cursor: pointer;
  }
  .inventory {
    display: flex;
    flex-direction: column;
    span {
      margin: 6px 0;
    }
  }
  .date {
    text-align: left;
  }
  .content > div {
    display: flex;
    align-items: center;
    .contact-detail-content-key {
      color: #aaa;
    }
  }
  .qq-img {
    cursor: pointer;
  }
  .pro-no {
    color: @primary-color;
    cursor: pointer;
  }
  .check-contact {
    cursor: pointer;
    margin-right: 8px;
    color: @primary-color;
  }
  .check-license {
    cursor: pointer;
    color: @primary-color;
  }
  .title {
    cursor: pointer;
    color: @primary-color;
    text-align: center;
  }
  .user-name {
    text-align: left;
  }
</style>
