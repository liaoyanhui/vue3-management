/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-11-09 18:06:07
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-10 09:06:23
 */
import { defHttp } from '/@/utils/http/axios';
import { apiResult } from './model/apiModel';

enum Api {
  AddMenuItem = '/api/Menu/AddMenuItem',
  GetMenuItemList = '/api/Menu/GetMenuItemList',
  DeleteMenuItem = '/api/Menu/DeleteMenuItem',
  UpdateMenuItem = '/api/Menu/UpdateMenuItem',
  UpdateMenuItemSequence = '/api/Menu/UpdateMenuItemSequence',
  GetMenuItemTree = '/api/Menu/GetMenuItemTree',
  MoveMenuItem = '/api/Menu/MoveMenuItem',
  DisableMenuItem = '/api/Menu/DisableMenuItem',
}

/**
 * @description: Get user menu based on id
 */

export const addMenuItem = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.AddMenuItem, params });
};

export function getMenuItemList(params: any) {
  return defHttp.get<apiResult>({ url: Api.GetMenuItemList, params });
}

export function deleteMenuItem(params: any) {
  return defHttp.post<apiResult>({ url: Api.DeleteMenuItem, params });
}

export function updateMenuItem(params: any) {
  return defHttp.post<apiResult>({ url: Api.UpdateMenuItem, params });
}

// 更新菜单排序
export function updateMenuItemSequence(params: any) {
  return defHttp.post<apiResult>({ url: Api.UpdateMenuItemSequence, params });
}

// 获取树形结构菜单
export function getMenuItemTree() {
  return defHttp.get<apiResult>({ url: Api.GetMenuItemTree });
}

// 移动菜单
export function moveMenuItem(params: any) {
  return defHttp.post<apiResult>({ url: Api.MoveMenuItem, params });
}

// 禁用菜单
export function disableMenuItem(params: any) {
  return defHttp.post<apiResult>({ url: Api.DisableMenuItem, params });
}
