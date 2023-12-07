/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-11-27 10:19:53
 * @LastEditors: shangxia
 * @LastEditTime: 2023-12-04 17:23:19
 */
import { defineStore } from 'pinia';
import { store } from '/@/store';

import { getStockPicVideoPageList, batchReviewStockPicVideo } from '/@/api/sys/stock';

interface UploadState {}

export const useStockStore = defineStore({
  id: 'app-stock',
  state: (): UploadState => ({}),
  getters: {},
  actions: {
    // 型号视频图片库列表
    async getStockPicVideoPageList(params: any): Promise<any> {
      try {
        return await getStockPicVideoPageList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // 审核型号视频图片库
    async batchReviewStockPicVideo(params: any): Promise<any> {
      try {
        return await batchReviewStockPicVideo(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});

export function useUploadStoreWithOut() {
  return useStockStore(store);
}
