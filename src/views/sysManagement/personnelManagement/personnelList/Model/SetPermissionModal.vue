<template>
  <BasicModal v-bind="$attrs" @register="register" title="权限设置" @ok="handleSubmit">
    <Row>
      <Col :span="6">
        <div class="name">
          {{ item.data.realName }}
        </div>
      </Col>
      <Col :span="17">
        <div>
          <BasicTree
            ref="asyncExpandTreeRef"
            :treeData="menuList"
            :checkable="true"
            :checkedKeys="checkedKeys"
            @check="handleCheck"
            :replaceFields="{
              children: 'children',
              title: 'title',
              key: 'id',
            }"
          />
        </div>
      </Col>
    </Row>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, onMounted, ref, onUnmounted } from 'vue';
  import { Row, Col } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useUserStore } from '/@/store/modules/user';
  // import { BasicForm, useForm } from '/@/components/Form';
  // import { permissionForm } from './data';
  import { BasicTree, TreeActionType, TreeItem } from '/@/components/Tree/index';

  export default defineComponent({
    name: 'SetPermissionModal',
    components: { BasicModal, BasicTree, Row, Col },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const userStore = useUserStore();
      const asyncExpandTreeRef = ref<Nullable<TreeActionType>>(null);
      const menuList = ref<TreeItem[]>([]);
      const checkedKeys = ref<number[]>([]);
      async function fetch() {
        const result = await userStore.getUserMenuTree({
          userId: item.data.id,
        });
        menuList.value = result.menuTreeNodes || [];
        const menuIds = result.userMenus
          ? result.userMenus.map((item) => {
              return item.menuId;
            })
          : [];
        checkedKeys.value = [...menuIds] || [];
      }

      const item = reactive<any>({
        data: {},
      });
      const [register, { closeModal, setModalProps }] = useModalInner((data) => {
        item.data = data.record;
        fetch();
      });

      const parIds = ref<number[]>([]);
      function handleCheck(checkKeys, e) {
        parIds.value = e.halfCheckedKeys;
        checkedKeys.value = [...checkKeys];
      }
      async function handleSubmit() {
        // , ...parIds.value
        const data = {
          userId: item.data.id,
          menuIds: [...checkedKeys.value],
        };
        const result = await userStore.updateUserMenu(data);
        if (result) {
          checkedKeys.value = [];
          closeModal();
          emit('success');
        }
      }
      return {
        register,
        // register1,
        closeModal,
        handleSubmit,
        item,
        asyncExpandTreeRef,
        menuList,
        checkedKeys,
        handleCheck,
      };
    },
  });
</script>

<style lang="less" scoped>
  .name {
    padding-right: 8px;
    text-align: center;
    border-right: 1px solid #ddd;
  }
  .note {
    padding-left: 8px;
  }
</style>
