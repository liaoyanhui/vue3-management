import { defineStore } from 'pinia';
import { store } from '/@/store';

import {
  addMenuItem,
  getMenuItemList,
  deleteMenuItem,
  updateMenuItem,
  updateMenuItemSequence,
  getMenuItemTree,
  moveMenuItem,
} from '/@/api/sys/menu';

export const useMenuStore = defineStore({
  id: 'app-menu',
  state: () => ({}),
  getters: {},
  actions: {
    async addMenuItem(params: any): Promise<any> {
      try {
        return await addMenuItem(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getMenuItemList(params: any): Promise<any> {
      try {
        return await getMenuItemList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deleteMenuItem(params: any): Promise<any> {
      try {
        return await deleteMenuItem(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateMenuItem(params: any): Promise<any> {
      try {
        return await updateMenuItem(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateMenuItemSequence(params: any): Promise<any> {
      try {
        return await updateMenuItemSequence(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async moveMenuItem(params: any): Promise<any> {
      try {
        return await moveMenuItem(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getMenuItemTree(): Promise<any> {
      try {
        const result = await getMenuItemTree();
        return [result];
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});

export function useMenuStoreWithOut() {
  return useMenuStore(store);
}
