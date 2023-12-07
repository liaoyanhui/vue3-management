/*
 * @Descripttion:
 * @version:
 * @Author: shang xia
 * @Date: 2022-12-23 12:07:20
 * @LastEditors: shangxia
 * @LastEditTime: 2023-12-05 15:53:04
 */
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { fileType } from '/@/utils';

import { imageUpload, videoUpload, fileUpload } from '/@/api/sys/upload';

interface UploadState {
  // countryList: CountryItem[];
}

export const useUploadStore = defineStore({
  id: 'app-upload',
  state: (): UploadState => ({}),
  getters: {},
  actions: {
    async fileUpload(params: any): Promise<any> {
      try {
        return await fileUpload(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async imageUpload(params: any): Promise<any> {
      try {
        return await imageUpload(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async videoUpload(params: any): Promise<any> {
      try {
        return await videoUpload(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    // 上传通用 根据上传类型不同 调用不同的上传接口
    async globalUpload(params: any): Promise<any> {
      try {
        const { type, data } = params;
        const name = fileType(type);
        if (name == 'image') {
          return await imageUpload(data);
        } else if (name == 'video') {
          return await videoUpload(data);
        } else {
          return await fileUpload(data);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});

// Need to be used outside the setup
export function useUploadStoreWithOut() {
  return useUploadStore(store);
}
