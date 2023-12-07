/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-09-20 16:54:28
 * @LastEditors: shangxia
 * @LastEditTime: 2023-12-05 11:19:18
 */
import { defHttp } from '/@/utils/http/axios';

enum Api {
  GetStockPicVideoPageList = '/api/Stock/GetStockPicVideoPageList',
  BatchReviewStockPicVideo = '/api/Stock/BatchReviewStockPicVideo',
}

// 现货库存视频图片库
export const getStockPicVideoPageList = (params: any) => {
  return defHttp.post<any>({ url: Api.GetStockPicVideoPageList, params });
};

// 审核库存图片视频库
export const batchReviewStockPicVideo = (params: any) => {
  return defHttp.post<any>({ url: Api.BatchReviewStockPicVideo, params });
};
