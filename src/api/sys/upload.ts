/*
 * @Description:
 * @Version: 2.0
 * @Author: shangxia
 * @Date: 2023-02-02 14:47:53
 * @LastEditors: shangxia
 * @LastEditTime: 2023-11-17 15:42:56
 */
import { UploadApiResult } from './model/uploadModel';
import { defHttp } from '/@/utils/http/axios';
import { UploadFileParams } from '/#/axios';
import { useGlobSetting } from '/@/hooks/setting';
import { ContentTypeEnum } from '/@/enums/httpEnum';

const { uploadUrl = '' } = useGlobSetting();

enum Api {
  ImageUpload = '/api/Upload/ImageUpload',
  VideoUpload = '/api/Upload/VideoUpload',
  FileUpload = '/api/Upload/FileUpload',
}
/**
 * @description: Upload interface
 */
export function uploadApi(
  params: UploadFileParams,
  onUploadProgress: (progressEvent: ProgressEvent) => void,
) {
  return defHttp.uploadFile<UploadApiResult>(
    {
      url: uploadUrl,
      onUploadProgress,
    },
    params,
  );
}

// 文件上传
export function fileUpload(params: any) {
  return defHttp.post<UploadApiResult>({
    url: Api.FileUpload,
    params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA,
    },
  });
}

// 图片上传
export function imageUpload(params: any) {
  return defHttp.post<UploadApiResult>({
    url: Api.ImageUpload,
    params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA,
    },
  });
}

// 视频上传
export function videoUpload(params: any) {
  return defHttp.post<UploadApiResult>({
    url: Api.VideoUpload,
    params,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA,
    },
  });
}
