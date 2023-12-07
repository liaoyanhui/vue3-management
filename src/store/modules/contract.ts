import { defineStore } from 'pinia';
import { store } from '/@/store';

import {
  getContractTemplatePagedList,
  getContractPagedList,
  addContractTemplate,
  updateContractTemplate,
  deleteContractTemplateById,
  deleteContractTemplateByIds,
  getContractAttributePagedList,
  addContractAttribute,
  deleteContractAttributeById,
  deleteContractAttributeByIds,
  updateContractAttribute,
  getContractTemplateList,
  applyContract,
  deleteContractByIds,
  deleteContractById,
  checkContract,
  updateContractUser,
  updateContract,
  getContractFileById,
  getContractTemplateById,
  getContractAttributeList,
  getInitPerformanceInfo,
  getPerformanceOptionByType,
  addPerformanceInfo,
} from '/@/api/sys/contract';

export const useContractStore = defineStore({
  id: 'app-contract',
  state: () => ({}),
  getters: {},
  actions: {
    async getContractTemplatePagedList(params: any): Promise<any> {
      try {
        return await getContractTemplatePagedList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getContractPagedList(params: any): Promise<any> {
      try {
        return await getContractPagedList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addContractTemplate(params: any): Promise<any> {
      try {
        return await addContractTemplate(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateContractTemplate(params: any): Promise<any> {
      try {
        return await updateContractTemplate(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deleteContractTemplateById(params: any): Promise<any> {
      try {
        return await deleteContractTemplateById(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deleteContractTemplateByIds(params: any): Promise<any> {
      try {
        return await deleteContractTemplateByIds(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getContractAttributePagedList(params: any): Promise<any> {
      try {
        return await getContractAttributePagedList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addContractAttribute(params: any): Promise<any> {
      try {
        return await addContractAttribute(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deleteContractAttributeById(params: any): Promise<any> {
      try {
        return await deleteContractAttributeById(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deleteContractAttributeByIds(params: any): Promise<any> {
      try {
        return await deleteContractAttributeByIds(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateContractAttribute(params: any): Promise<any> {
      try {
        return await updateContractAttribute(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getContractTemplateList(): Promise<any> {
      try {
        return await getContractTemplateList();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async applyContract(params: any): Promise<any> {
      try {
        return await applyContract(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deleteContractById(params: any): Promise<any> {
      try {
        return await deleteContractById(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deleteContractByIds(params: any): Promise<any> {
      try {
        return await deleteContractByIds(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async checkContract(params: any): Promise<any> {
      try {
        return await checkContract(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateContractUser(params: any): Promise<any> {
      try {
        return await updateContractUser(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateContract(params: any): Promise<any> {
      try {
        return await updateContract(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getContractFileById(params: any): Promise<any> {
      try {
        return await getContractFileById(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getContractTemplateById(params: any): Promise<any> {
      try {
        return await getContractTemplateById(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getContractAttributeList(params: any): Promise<any> {
      try {
        return await getContractAttributeList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getInitPerformanceInfo(params: any): Promise<any> {
      try {
        return await getInitPerformanceInfo(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async addPerformanceInfo(params: any): Promise<any> {
      try {
        return await addPerformanceInfo(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getPerformanceOptionByType(params: any): Promise<any> {
      try {
        const res: any = await getPerformanceOptionByType(params);
        if (res) {
          const newArr = res.map((item: any) => {
            return {
              label: item.value,
              value: item.id,
            };
          });
          return newArr;
        }
        return [];
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});

export function useContractStoreWithOut() {
  return useContractStore(store);
}
