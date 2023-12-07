/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-11-09 18:06:07
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-20 15:07:29
 */
import { defHttp } from '/@/utils/http/axios';
import { apiResult } from './model/apiModel';
import { LoginParams, LoginResultModel, GetUserInfoModel } from './model/userModel';

enum Api {
  AddUser = '/api/SysUser/AddUser',
  GetUserInfo = '/api/SysUser/GetUserInfo',
  GetUserMenuTree = '/api/SysUser/GetUserMenuTree',
  GetUserPagedList = '/api/SysUser/GetUserPagedList',
  UpdateUser = '/api/SysUser/UpdateUser',
  DeleteUser = '/api/SysUser/DeleteUser',
  GetUserById = '/api/SysUser/GetUserById',
  UpdateUserMenu = '/api/SysUser/UpdateUserMenu',
  UpdateUserJobStatus = '/api/SysUser/UpdateUserJobStatus',
}

/**
 * @description:
 */
export function addUser(params: any) {
  return defHttp.post<apiResult>({ url: Api.AddUser, params });
}

export function getUserPagedList(params: any) {
  return defHttp.post<apiResult>({ url: Api.GetUserPagedList, params });
}

export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>({ url: Api.GetUserInfo }, { errorMessageMode: 'none' });
}

export function getUserMenuTree(params: any) {
  return defHttp.get<GetUserInfoModel>(
    { url: Api.GetUserMenuTree, params },
    { errorMessageMode: 'none' },
  );
}

export function updateUser(params: any) {
  return defHttp.post<apiResult>({ url: Api.UpdateUser, params });
}

export function deleteUser(params: any) {
  return defHttp.post<apiResult>({ url: Api.DeleteUser, params });
}
export function getUserById(params: any) {
  return defHttp.get<apiResult>({ url: Api.GetUserById, params });
}
export function updateUserMenu(params: any) {
  return defHttp.post<apiResult>({ url: Api.UpdateUserMenu, params });
}
export function updateUserJobStatus(params: any) {
  return defHttp.post<apiResult>({ url: Api.UpdateUserJobStatus, params });
}
