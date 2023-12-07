import { defHttp } from '/@/utils/http/axios';
import { apiResult } from './model/apiModel';

enum Api {
  GetEditingMemberPagedList = '/api/Member/GetAuditUserModifyPageList',
  CheckEditedMemberById = '/api/Member/AuditUserModify',
  GetReviewUserPicturePagedList = '/api/Member/GetReviewUserPicturePagedList',
  CheckUserPictureById = '/api/Member/AuditUserPicture',
  DeleteUserPictureByIds = '/api/Member/DeleteUserPicture',
  GetReviewedMemberPagedList = '/api/Member/GetUserInfoPageList',
  GetMemberDetailById = '/api/Member/GetUserInfoDetailById',
  GetUserAllServiceList = '/api/Member/GetUserAllServiceList',
  SaveUserService = '/api/Member/SaveUserService',
  SaveUserInfoEdit = '/api/Member/SaveUserInfoEdit',

  // 没有用到的api
  GetMemberPagedList = '/api/Member/GetMemberPagedList',
  GetStockUploadPagedList = '/api/Stock/GetStockUploadPagedList',
  CheckUserPictureByIds = '/api/Member/CheckUserPictureByIds',
  DeleteStockUploadById = '/api/Stock/DeleteStockUploadById',
  DeleteStockUploadByIds = '/api/Stock/DeleteStockUploadByIds',
  GetUserPictureTypeList = '/api/Member/GetUserPictureTypeList',
  GetPendingMemberPagedList = '/api/Member/GetPendingMemberPagedList',
  CheckMemberById = '/api/Member/CheckMemberById',
  CheckMemberByIds = '/api/Member/CheckMemberByIds',
  DeleteMemberById = '/api/Member/DeleteMemberById',
  DeleteMemberByIds = '/api/Member/DeleteMemberByIds',
  ReUploadStockById = '/api/Stock/ReUploadStockById',
  CancelUploadStockById = '/api/Stock/CancelUploadStockById',
  GetMemberById = '/api/Member/GetMemberById',
  GetMemberLoginHistoryPagedList = '/api/Member/GetMemberLoginHistoryPagedList',
  CheckEditedMemberByIds = '/api/Member/CheckEditedMemberByIds',
  GetMemberCompanyById = '/api/Member/GetMemberCompanyById',
  UpdateMemberCompany = '/api/Member/UpdateMemberCompany',
  CloseMemberShop = '/api/Member/CloseMemberShop',
  OpenMemberShop = '/api/Member/OpenMemberShop',
  UpdateMember = '/api/Member/UpdateMember',
  GetMemberApplyPagedList = '/api/Member/GetMemberApplyPagedList',
  CheckMemberApplyById = '/api/Member/CheckMemberApplyById',
  CheckMemberApplyByIds = '/api/Member/CheckMemberApplyByIds',
  UpdateMemberStock = '/api/Member/UpdateMemberStock',
  MemberDownGrade = '/api/Member/MemberDownGrade',
  GetMemberGradeList = '/api/Member/GetMemberGradeList',
  UpdateMemberGrade = '/api/Member/UpdateMemberGrade',
  UpdateMemberServiceAdmin = '/api/Member/UpdateMemberServiceAdmin',
  GetUserPictureCheckMessageList = '/api/Member/GetUserPictureCheckMessageList',
  GetNormalStockPagedList = '/api/Member/GetNormalStockPagedList',
  GetAdvantageStockPagedList = '/api/Member/GetAdvantageStockPagedList',
  GetOrderStockPagedList = '/api/Stock/GetOrderStockPagedList',
  ExportNormalStockData = '/api/Member/ExportNormalStockData',
  ExportAdvantageStockData = '/api/Member/ExportAdvantageStockData',
  ExportOrderStockData = '/api/Member/ExportOrderStockData',
  RevokeCheckMember = '/api/Member/RevokeCheckMember',
}

// 分页获取编辑待审核列表
export const getEditingMemberPagedList = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.GetEditingMemberPagedList, params });
};

// 批量删除会员资质
export const deleteUserPictureByIds = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.DeleteUserPictureByIds, params });
};

// 分页获取会员列表
export const getReviewedMemberPagedList = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.GetReviewedMemberPagedList, params });
};
// 分页获取待审核列表
export const getMemberPagedList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetMemberPagedList, params });
};

// 获取库存列表
export const getStockUploadPagedList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetStockUploadPagedList, params });
};

// 获取会员资质列表
export const getReviewUserPicturePagedList = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.GetReviewUserPicturePagedList, params });
};

// 审核会员资质
export const checkUserPictureById = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.CheckUserPictureById, params });
};
// 重新上传
export const reUploadStockById = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.ReUploadStockById, params });
};
// 取消上传
export const cancelUploadStockById = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.CancelUploadStockById, params });
};

// 批量审核会员资质
export const checkUserPictureByIds = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.CheckUserPictureByIds, params });
};

// 删除库存上传
export const deleteStockUploadById = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.DeleteStockUploadById, params });
};

// 批量删除库存上传
export const deleteStockUploadByIds = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.DeleteStockUploadByIds, params });
};

// 搜索类型列表
export const getUserPictureTypeList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetUserPictureTypeList, params });
};

// 待审核会员列表
export const getPendingMemberPagedList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetPendingMemberPagedList, params });
};

// 审核会员
export const checkMemberById = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.CheckMemberById, params });
};
// 批量审核会员
export const checkMemberByIds = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.CheckMemberByIds, params });
};

// 删除会员
export const deleteMemberById = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.DeleteMemberById, params });
};

// 批量删除会员
export const deleteMemberByIds = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.DeleteMemberByIds, params });
};

// 获取会员详情
export const getMemberById = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetMemberById, params });
};

// 获取会员详情新接口
export const getMemberDetailById = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetMemberDetailById, params });
};
// 会员登录记录
export const getMemberLoginHistoryPagedList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetMemberLoginHistoryPagedList, params });
};

// 审核编辑列表
export const checkEditedMemberById = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.CheckEditedMemberById, params });
};
// 批量审核编辑列表
export const checkEditedMemberByIds = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.CheckEditedMemberByIds, params });
};
// 获取会员公司详情
export const getMemberCompanyById = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetMemberCompanyById, params });
};
// 获取会员公司详情
export const updateMemberCompany = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.UpdateMemberCompany, params });
};
// 删除商铺
export const closeMemberShop = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.CloseMemberShop, params });
};
// 开通商铺
export const openMemberShop = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.OpenMemberShop, params });
};
// 更新会员
export const updateMember = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.UpdateMember, params });
};

// 分页获取会员申请列表
export const getMemberApplyPagedList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetMemberApplyPagedList, params });
};

// 审核会员申请
export const checkMemberApplyById = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.CheckMemberApplyById, params });
};

// 批量审核会员申请
export const checkMemberApplyByIds = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.CheckMemberApplyByIds, params });
};

// 更新库存
export const updateMemberStock = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.UpdateMemberStock, params });
};

// 更新库存
export const memberDownGrade = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.MemberDownGrade, params });
};

// 会员等级列表名称
export const getMemberGradeList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetMemberGradeList, params });
};

// 更新会员等级
export const updateMemberGrade = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.UpdateMemberGrade, params });
};
// 设置业务专员
export const updateMemberServiceAdmin = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.UpdateMemberServiceAdmin, params });
};
// 资质不通过消息列表
export const getUserPictureCheckMessageList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetUserPictureCheckMessageList, params });
};
// 分页获取普通库存列表
export const getNormalStockPagedList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetNormalStockPagedList, params });
};

// 分页获取现货库存列表
export const getAdvantageStockPagedList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetAdvantageStockPagedList, params });
};
// 分页获取订货库存列表
export const getOrderStockPagedList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetOrderStockPagedList, params });
};

// 获取普通库存列表 供导出
export const exportNormalStockData = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.ExportNormalStockData, params });
};
// 获取现货库存列表 供导出
export const exportAdvantageStockData = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.ExportAdvantageStockData, params });
};
// 获取订货库存列表 供导出
export const exportOrderStockData = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.ExportOrderStockData, params });
};
// 撤销会员
export const revokeCheckMember = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.RevokeCheckMember, params });
};

// 获取会员服务列表
export const getUserAllServiceList = (params: any) => {
  return defHttp.get<apiResult>({ url: Api.GetUserAllServiceList, params });
};

// 新增或者编辑
export const saveUserService = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.SaveUserService, params });
};
// 保存修改会员信息 或者 公司
export const saveUserInfoEdit = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.SaveUserInfoEdit, params });
};
