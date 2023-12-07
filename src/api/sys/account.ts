/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-03 14:29:22
 * @LastEditors: shangxia
 * @LastEditTime: 2023-04-19 16:27:53
 */
import { defHttp } from '/@/utils/http/axios';
import { apiResult } from './model/apiModel';
import type { UserInfo } from '/#/store';
import { ContentTypeEnum } from '/@/enums/httpEnum';
import { LoginParams } from './model/accountModel';

enum Api {
  GetPermCode = '/getPermCode',
  GetUserInfo = '/api/Account/GetUserInfo',
  GetUserMenuTree = '/api/Account/GetUserMenuTree',
  Login = '/api/Account/Login',
  Logout = '/api/Account/Logout',
  CaptchaImage = '/api/Account/GetCaptchaImage',
  UpdateUserInfo = '/api/Account/UpdateUserInfo',
  WeikuLogin = '/api/Account/WeikuLogin',
}

/**
 * @description: Get user menu based on id
 */
export function login(params: LoginParams) {
  return defHttp.post<any>({
    url: Api.Login,
    params,
  });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function captchaImage() {
  return defHttp.get<apiResult>({
    url: Api.CaptchaImage,
    // headers: {
    //   'Content-Type': ContentTypeEnum.FORM_URLENCODED,
    // },
  });
}

export function getUserInfo() {
  return defHttp.get<UserInfo>({ url: Api.GetUserInfo });
}

export function updateUserInfo(params: any) {
  return defHttp.post<apiResult>({ url: Api.UpdateUserInfo, params });
}

export function getUserMenuTree() {
  return defHttp.get<any>({ url: Api.GetUserMenuTree });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function weikuLogin(params: any) {
  return defHttp.post<apiResult>({ url: Api.WeikuLogin, params });
}
