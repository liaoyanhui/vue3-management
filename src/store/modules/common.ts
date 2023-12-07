/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-11-17 09:42:49
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-24 16:16:58
 */
import { defineStore } from 'pinia';
import { store } from '/@/store';

import {
  getMemberTypeList,
  getProvinceList,
  getMainProductList,
  getCityList,
} from '/@/api/sys/common';

export const useCommonStore = defineStore({
  id: 'app-common',
  state: () => ({}),
  getters: {},
  actions: {
    async getMemberTypeList(params: any): Promise<any> {
      try {
        return await getMemberTypeList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /**
     * @description: 获取主营应用领域列表
     */
    async getMainProductList(): Promise<any> {
      try {
        const result: any = (await getMainProductList()) || [];
        const arr = result.map((item) => {
          return {
            label: item.enumText,
            value: item.enumValue.toString(),
          };
        });
        return [...arr];
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getProvinceList(): Promise<any> {
      try {
        const result: any = await getProvinceList();
        const newArr = result.map((item) => {
          item.value = item.id;
          item.label = item.name;
          return item;
        });
        return newArr || [];
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getCityList(params: any): Promise<any> {
      try {
        const result: any = await getCityList(params);
        const newArr = result.map((item) => {
          item.value = item.id;
          item.label = item.name;
          return item;
        });
        return newArr || [];
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});

export function useCommonStoreWithOut() {
  return useCommonStore(store);
}
