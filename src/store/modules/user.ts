import { defineStore } from 'pinia';
import { store } from '/@/store';
import type { UserInfo } from '/#/store';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';
import { RoleEnum } from '/@/enums/roleEnum';

import {
  addUser,
  getUserPagedList,
  updateUser,
  deleteUser,
  getUserById,
  getUserMenuTree,
  updateUserMenu,
  updateUserJobStatus,
} from '/@/api/sys/user';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: RoleEnum[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    // Whether the login expired
    sessionTimeout: false,
    // Last fetch time
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
  },
  actions: {
    async addUser(params: any): Promise<any> {
      try {
        return await addUser(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getUserPagedList(params: any): Promise<any> {
      try {
        return await getUserPagedList(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateUser(params: any): Promise<any> {
      try {
        return await updateUser(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async deleteUser(params: any): Promise<any> {
      try {
        return await deleteUser(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getUserMenuTree(params: any): Promise<any> {
      try {
        return await getUserMenuTree(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateUserMenu(params: any): Promise<any> {
      try {
        return await updateUserMenu(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async getUserById(params: any): Promise<any> {
      try {
        return await getUserById(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    async updateUserJobStatus(params: any): Promise<any> {
      try {
        return await updateUserJobStatus(params);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});

export function useUserStoreWithOut() {
  return useUserStore(store);
}
