import { defineStore } from 'pinia';
import { store } from '/@/store';

import {
  getRolePagedList,
  addRole,
  updateRole,
  deleteRole,
  addRoleMenu,
  getRoleMenuTree,
  updateRoleMenu,
  getRoleList,
} from '/@/api/sys/role';

export const useRoleStore = defineStore({
  id: 'app-role',
  state: () => ({}),
  getters: {},
  actions: {
    async getRolePagedList(params: any): Promise<any> {
      try {
        return await getRolePagedList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addRole(params: any): Promise<any> {
      try {
        return await addRole(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deleteRole(params: any): Promise<any> {
      try {
        return await deleteRole(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateRole(params: any): Promise<any> {
      try {
        return await updateRole(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addRoleMenu(params: any): Promise<any> {
      try {
        return await addRoleMenu(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getRoleMenuTree(params: any): Promise<any> {
      try {
        return await getRoleMenuTree(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateRoleMenu(params: any): Promise<any> {
      try {
        return await updateRoleMenu(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getRoleList(): Promise<any> {
      try {
        return await getRoleList();
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});

export function useRoleStoreWithOut() {
  return useRoleStore(store);
}
