<template>
  <BasicModal v-bind="$attrs" @register="register" title="权限设置" @ok="handleSubmit">
    <Row>
      <Col :span="6">
        <div class="name">
          {{ item.data.name }}
        </div>
      </Col>
      <Col :span="17">
        <div class="group">
          <div class="note">{{ item.data.note }}</div>
        </div>
      </Col>
      <Col :span="17" :offset="6">
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
  import { defineComponent, reactive, onMounted, ref } from 'vue';
  import { Row, Col } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useRoleStore } from '/@/store/modules/role';
  // import { BasicForm, useForm } from '/@/components/Form';
  // import { permissionForm } from './data';
  import { BasicTree, TreeActionType, TreeItem } from '/@/components/Tree/index';

  export default defineComponent({
    name: 'ChangePermissionModal',
    components: { BasicModal, BasicTree, Row, Col },
    emits: ['success', 'register'],
    setup(props, { emit }) {
      const roleStore = useRoleStore();
      const asyncExpandTreeRef = ref<Nullable<TreeActionType>>(null);
      const menuList = ref<TreeItem[]>([]);
      const checkedKeys = ref<number[]>([]);
      async function fetch() {
        const result = await roleStore.getRoleMenuTree({
          RoleId: item.data.id,
        });
        menuList.value = result.menuTreeNodes || [];
        const menuIds = result.roleMenus
          ? result.roleMenus.map((item) => {
              return item.menuId;
            })
          : [];
        checkedKeys.value = [...menuIds] || [];
      }

      // onMounted(() => {
      //   fetch();
      // });

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
        // console.log(asyncExpandTreeRef.value?.getSelectedKeys(), 'asyncExpandTreeRef')
        // console.log(asyncExpandTreeRef.value?.onCheck, 'getSelectedKeys')
        const data = {
          roleId: item.data.id,
          menuIds: [...checkedKeys.value],
        };
        const result = await roleStore.updateRoleMenu(data);
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
