/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-16 16:08:47
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-24 16:15:54
 */
import { defHttp } from '/@/utils/http/axios';
import { apiResult } from './model/apiModel';

enum Api {
  GetMemberTypeList = '/api/Common/GetMemberTypeList',
  GetPlatformTypeList = '/api/Common/GetPlatformTypeList',
  GetLoginModeList = '/api/Common/GetLoginModeList',
  GetMemberUserTypeList = '/api/Common/GetMemberUserTypeList',
  GetCompanyTypeList = '/api/Common/GetCompanyTypeList',
  GetIndustryTypeList = '/api/Common/GetIndustryTypeList',
  GetServicerUserList = '/api/Common/GetServicerUserList',
  GetBuyOrderSearchTypeList = '/api/BuyOrder/GetBuyOrderSearchTypeList',

  // lyh
  GetUserPictureTypeList = '/api/Common/GetUserPictureTypeList',
  GetMainProductList = '/api/Common/GetMainProductList',
  GetProvinceList = '/api/Common/GetProvinceList',
  GetCityList = '/api/Common/GetCityList',
  GetInvoiceCompanyList = '/api/Common/GetInvoiceCompanyList',
}

// 获取会员类型列表
export const getMemberTypeList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetMemberTypeList, params });
};
// 获取操作平台类型
export const getPlatformTypeList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetPlatformTypeList, params });
};
// 获取登录方式
export const getLoginModeList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetLoginModeList, params });
};
// 获取会员类型
export const getMemberUserTypeList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetMemberUserTypeList, params });
};
// 获取公司类型
export const getCompanyTypeList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetCompanyTypeList, params });
};
// 公司行业类型
export const getIndustryTypeList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetIndustryTypeList, params });
};

// 业务员列表
export const getServicerUserList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetServicerUserList, params });
};

// 询盘搜索字段
export const getBuyOrderSearchTypeList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetBuyOrderSearchTypeList, params });
};

// 图片类型
export const getUserPictureTypeList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetUserPictureTypeList, params });
};
// 主营领域
export const getMainProductList = () => {
  return defHttp.get<apiResult>({ url: Api.GetMainProductList });
};

// 省
export const getProvinceList = () => {
  return defHttp.get<apiResult>({ url: Api.GetProvinceList });
};

// 市
export const getCityList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetCityList, params });
};

// 获取发票单位
export const getInvoiceCompanyList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetInvoiceCompanyList, params });
};
