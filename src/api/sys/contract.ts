import { defHttp } from '/@/utils/http/axios';
import { apiResult } from './model/apiModel';

enum Api {
  GetContractTemplatePagedList = '/api/Contract/GetContractTemplatePagedList',
  GetContractPagedList = '/api/Contract/GetContractPagedList',
  ApplyContract = '/api/Contract/ApplyContract',
  CheckContract = '/api/Contract/CheckContract',
  DeleteContractById = '/api/Contract/DeleteContractById',
  DeleteContractByIds = '/api/Contract/DeleteContractByIds',
  AddContractTemplate = '/api/Contract/AddContractTemplate',
  UpdateContractTemplate = '/api/Contract/UpdateContractTemplate',
  DeleteContractTemplateById = '/api/Contract/DeleteContractTemplateById',
  DeleteContractTemplateByIds = '/api/Contract/DeleteContractTemplateByIds',
  GetContractSealTypeList = '/api/Contract/GetContractSealTypeList',
  GetContractAttributePagedList = '/api/Contract/GetContractAttributePagedList',
  GetContractAttributeList = '/api/Contract/GetContractAttributeList',
  GetContractAttributeTypeList = '/api/Contract/GetContractAttributeTypeList',
  AddContractAttribute = '/api/Contract/AddContractAttribute',
  DeleteContractAttributeById = '/api/Contract/DeleteContractAttributeById',
  DeleteContractAttributeByIds = '/api/Contract/DeleteContractAttributeByIds',
  UpdateContractAttribute = '/api/Contract/UpdateContractAttribute',
  GetContractTemplateList = '/api/Contract/GetContractTemplateList',
  GetContractAdminUserList = '/api/Contract/GetContractAdminUserList',
  UpdateContractUser = '/api/Contract/UpdateContractUser',
  UpdateContract = '/api/Contract/UpdateContract',
  GetContractFileById = '/api/Contract/GetContractFileById',
  GetContractTemplateById = '/api/Contract/GetContractTemplateById',
  GetInitPerformanceInfo = '/api/Contract/GetInitPerformanceInfo',
  GetPerformanceOptionByType = '/api/Contract/GetPerformanceOptionByType',
  AddPerformanceInfo = '/api/Contract/AddPerformanceInfo',
}

// 分页获取模板列表
export const getContractTemplatePagedList = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.GetContractTemplatePagedList, params });
};

// 分页获取申请合同列表
export const getContractPagedList = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.GetContractPagedList, params });
};

// 申请合同
export const applyContract = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.ApplyContract, params });
};

// 审核合同
export const checkContract = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.CheckContract, params });
};

// 删除合同
export const deleteContractById = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.DeleteContractById, params });
};

// 批量删除合同
export const deleteContractByIds = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.DeleteContractByIds, params });
};

// 添加合同模板
export const addContractTemplate = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.AddContractTemplate, params });
};

// 更新合同模板
export const updateContractTemplate = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.UpdateContractTemplate, params });
};

// 删除合同模板
export const deleteContractTemplateById = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.DeleteContractTemplateById, params });
};

// 批量删除合同模板
export const deleteContractTemplateByIds = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.DeleteContractTemplateByIds, params });
};

// 合同盖章种类
export const getContractSealTypeList = () => {
  return defHttp.get<apiResult>({ url: Api.GetContractSealTypeList });
};

// 合同属性列表
export const getContractAttributePagedList = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.GetContractAttributePagedList, params });
};

// 合同属性类型列表
export const getContractAttributeTypeList = () => {
  return defHttp.get<apiResult>({ url: Api.GetContractAttributeTypeList });
};

// 合同属性类型列表
export const addContractAttribute = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.AddContractAttribute, params });
};

// 删除属性
export const deleteContractAttributeById = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.DeleteContractAttributeById, params });
};

// 批量删除属性
export const deleteContractAttributeByIds = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.DeleteContractAttributeByIds, params });
};

// 批量删除属性
export const updateContractAttribute = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.UpdateContractAttribute, params });
};

// 获取模板合同列表
export const getContractTemplateList = (): any => {
  return defHttp.get<apiResult>({ url: Api.GetContractTemplateList });
};

// 获取模板合同列表
export const getContractAdminUserList = () => {
  return defHttp.get<apiResult>({ url: Api.GetContractAdminUserList });
};

// 获取模板合同列表
export const updateContractUser = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.UpdateContractUser, params });
};

// 更新合同
export const updateContract = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.UpdateContract, params });
};
// 获取pdf
export const getContractFileById = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetContractFileById, params });
};
// 获取指定合同模板信息
export const getContractTemplateById = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetContractTemplateById, params });
};
// 获取指定模板合同属性列表
export const getContractAttributeList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetContractAttributeList, params });
};

// 录入业绩前获取信息
export const getInitPerformanceInfo = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetInitPerformanceInfo, params });
};

// 业务类型列表
export const getPerformanceOptionByType = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetPerformanceOptionByType, params });
};

// 录入业绩
export const addPerformanceInfo = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.AddPerformanceInfo, params });
};
