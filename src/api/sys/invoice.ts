import { defHttp } from '/@/utils/http/axios';
import { apiResult } from './model/apiModel';
import { ContentTypeEnum } from '/@/enums/httpEnum';

enum Api {
  GetInvoicePageList = '/api/Invoice/GetInvoicePageList',
  SaveInvoiceDetail = '/api/Invoice/SaveInvoiceDetail',
  ExportInvoiceList = '/api/Invoice/ExportInvoiceList',
  UploadInvoiceFile = '/api/Invoice/UploadInvoiceFile',
}

// 发票分页列表
export const getInvoicePageList = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.GetInvoicePageList, params });
};
// 保存发票详情
export const saveInvoiceDetail = (params: any) => {
  return defHttp.post<apiResult>({ url: Api.SaveInvoiceDetail, params });
};

// 导出发票信息
export const exportInvoiceList = (params: any) => {
  return defHttp.post<apiResult>(
    { url: Api.ExportInvoiceList, params, responseType: 'blob' },
    { isTransformResponse: false },
  );
};

// 批量上传发票文件
export function uploadInvoiceFile(params: any) {
  return defHttp.post<any>({
    url: Api.UploadInvoiceFile,
    params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA,
    },
  });
}
