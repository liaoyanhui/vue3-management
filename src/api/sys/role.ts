import { defHttp } from '/@/utils/http/axios';
import { apiResult } from './model/apiModel';

enum Api {
  GetRolePagedList = '/api/Role/GetRolePagedList',
  GetRoleList = '/api/Role/GetRoleList',
  AddRole = '/api/Role/AddRole',
  UpdateRole = '/api/Role/UpdateRole',
  DeleteRole = '/api/Role/DeleteRole',
  AddRoleMenu = '/api/Role/AddRoleMenu',
  GetRoleMenuTree = '/api/Role/GetRoleMenuTree',
  UpdateRoleMenu = '/api/Role/UpdateRoleMenu',
}

// 获取角色列表分页
export const getRolePagedList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetRolePagedList, params });
};

// 获取角色列表不分页
export const getRoleList = () => {
  return defHttp.get<apiResult>({ url: Api.GetRoleList });
};

// 添加角色
export const addRole = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.AddRole, params });
};

// 更新角色
export const updateRole = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.UpdateRole, params });
};

// 删除角色
export const deleteRole = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.DeleteRole, params });
};

// 添加权限
export const addRoleMenu = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.AddRoleMenu, params });
};

// 更新权限
export const updateRoleMenu = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.UpdateRoleMenu, params });
};

// 获取权限树
export const getRoleMenuTree = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetRoleMenuTree, params });
};
