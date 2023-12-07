/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-14 17:29:10
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-24 17:00:49
 */
import { defineStore } from 'pinia';
import { store } from '/@/store';

import {
  getMemberPagedList,
  getStockUploadPagedList,
  getReviewUserPicturePagedList,
  checkUserPictureById,
  checkUserPictureByIds,
  deleteUserPictureByIds,
  deleteStockUploadById,
  deleteStockUploadByIds,
  getPendingMemberPagedList,
  checkMemberById,
  checkMemberByIds,
  deleteMemberById,
  deleteMemberByIds,
  getReviewedMemberPagedList,
  reUploadStockById,
  cancelUploadStockById,
  getMemberById,
  getMemberDetailById,
  getMemberLoginHistoryPagedList,
  getEditingMemberPagedList,
  checkEditedMemberById,
  checkEditedMemberByIds,
  getMemberCompanyById,
  updateMemberCompany,
  closeMemberShop,
  openMemberShop,
  updateMember,
  getMemberApplyPagedList,
  checkMemberApplyById,
  checkMemberApplyByIds,
  updateMemberStock,
  memberDownGrade,
  updateMemberGrade,
  updateMemberServiceAdmin,
  getUserPictureCheckMessageList,
  getNormalStockPagedList,
  getAdvantageStockPagedList,
  getOrderStockPagedList,
  exportNormalStockData,
  exportAdvantageStockData,
  exportOrderStockData,
  revokeCheckMember,
  getUserAllServiceList,
  saveUserService,
  saveUserInfoEdit,
} from '/@/api/sys/member';

export const useMemberStore = defineStore({
  id: 'app-member',
  state: () => ({}),
  getters: {},
  actions: {
    async getMemberPagedList(params: any): Promise<any> {
      try {
        return await getMemberPagedList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getStockUploadPagedList(params: any): Promise<any> {
      try {
        return await getStockUploadPagedList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getReviewUserPicturePagedList(params: any): Promise<any> {
      try {
        return await getReviewUserPicturePagedList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async checkUserPictureById(params: any): Promise<any> {
      try {
        return await checkUserPictureById(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async checkUserPictureByIds(params: any): Promise<any> {
      try {
        return await checkUserPictureByIds(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deleteUserPictureByIds(params: any): Promise<any> {
      try {
        return await deleteUserPictureByIds(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deleteStockUploadById(params: any): Promise<any> {
      try {
        return await deleteStockUploadById(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deleteStockUploadByIds(params: any): Promise<any> {
      try {
        return await deleteStockUploadByIds(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getPendingMemberPagedList(params: any): Promise<any> {
      try {
        return await getPendingMemberPagedList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async checkMemberById(params: any): Promise<any> {
      try {
        return await checkMemberById(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async checkMemberByIds(params: any): Promise<any> {
      try {
        return await checkMemberByIds(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deleteMemberById(params: any): Promise<any> {
      try {
        return await deleteMemberById(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deleteMemberByIds(params: any): Promise<any> {
      try {
        return await deleteMemberByIds(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getReviewedMemberPagedList(params: any): Promise<any> {
      try {
        return await getReviewedMemberPagedList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async reUploadStockById(params: any): Promise<any> {
      try {
        return await reUploadStockById(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async cancelUploadStockById(params: any): Promise<any> {
      try {
        return await cancelUploadStockById(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getMemberById(params: any): Promise<any> {
      try {
        return await getMemberById(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getMemberDetailById(params: any): Promise<any> {
      try {
        return await getMemberDetailById(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getMemberLoginHistoryPagedList(params: any): Promise<any> {
      try {
        return await getMemberLoginHistoryPagedList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getEditingMemberPagedList(params: any): Promise<any> {
      try {
        return await getEditingMemberPagedList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async checkEditedMemberById(params: any): Promise<any> {
      try {
        return await checkEditedMemberById(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async checkEditedMemberByIds(params: any): Promise<any> {
      try {
        return await checkEditedMemberByIds(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getMemberCompanyById(params: any): Promise<any> {
      try {
        return await getMemberCompanyById(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateMemberCompany(params: any): Promise<any> {
      try {
        return await updateMemberCompany(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async closeMemberShop(params: any): Promise<any> {
      try {
        return await closeMemberShop(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async openMemberShop(params: any): Promise<any> {
      try {
        return await openMemberShop(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateMember(params: any): Promise<any> {
      try {
        return await updateMember(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getMemberApplyPagedList(params: any): Promise<any> {
      try {
        return await getMemberApplyPagedList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async checkMemberApplyById(params: any): Promise<any> {
      try {
        return await checkMemberApplyById(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async checkMemberApplyByIds(params: any): Promise<any> {
      try {
        return await checkMemberApplyByIds(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateMemberStock(params: any): Promise<any> {
      try {
        return await updateMemberStock(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async memberDownGrade(params: any): Promise<any> {
      try {
        return await memberDownGrade(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateMemberGrade(params: any): Promise<any> {
      try {
        return await updateMemberGrade(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateMemberServiceAdmin(params: any): Promise<any> {
      try {
        return await updateMemberServiceAdmin(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getUserPictureCheckMessageList(params: any): Promise<any> {
      try {
        return await getUserPictureCheckMessageList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getNormalStockPagedList(params: any): Promise<any> {
      try {
        return await getNormalStockPagedList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getAdvantageStockPagedList(params: any): Promise<any> {
      try {
        return await getAdvantageStockPagedList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getOrderStockPagedList(params: any): Promise<any> {
      try {
        return await getOrderStockPagedList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async exportNormalStockData(params: any): Promise<any> {
      try {
        return await exportNormalStockData(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async exportAdvantageStockData(params: any): Promise<any> {
      try {
        return await exportAdvantageStockData(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async exportOrderStockData(params: any): Promise<any> {
      try {
        return await exportOrderStockData(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async revokeCheckMember(params: any): Promise<any> {
      try {
        return await revokeCheckMember(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getUserAllServiceList(params: any): Promise<any> {
      try {
        return await getUserAllServiceList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async saveUserService(params: any): Promise<any> {
      try {
        return await saveUserService(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async saveUserInfoEdit(params: any): Promise<any> {
      try {
        return await saveUserInfoEdit(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});

export function useMemberStoreWithOut() {
  return useMemberStore(store);
}
