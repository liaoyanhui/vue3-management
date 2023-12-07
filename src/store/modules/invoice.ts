/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-12-01 16:52:43
 * @LastEditors: shangxia
 * @LastEditTime: 2023-12-05 15:05:23
 */
import { defineStore } from 'pinia';
import { store } from '/@/store';

import {
  getInvoicePageList,
  saveInvoiceDetail,
  exportInvoiceList,
  uploadInvoiceFile,
} from '/@/api/sys/invoice';

export const useInvoiceStore = defineStore({
  id: 'app-invoice',
  state: () => ({}),
  getters: {},
  actions: {
    async getInvoicePageList(params: any): Promise<any> {
      try {
        return await getInvoicePageList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async saveInvoiceDetail(params: any): Promise<any> {
      try {
        return await saveInvoiceDetail(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async exportInvoiceList(params: any): Promise<any> {
      try {
        return await exportInvoiceList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async uploadInvoiceFile(params: any): Promise<any> {
      try {
        return await uploadInvoiceFile(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});

export function useInvoiceStoreWithOut() {
  return useInvoiceStore(store);
}
