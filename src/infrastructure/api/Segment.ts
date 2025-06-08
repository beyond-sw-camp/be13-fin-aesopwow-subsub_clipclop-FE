import axiosInstance from "@/infrastructure/api/Axios";
import type { SegmentFileListResponse } from "../../core/model/SegmentFileListResponse";

// 파일 리스트 조회
export async function fetchSegmentFileList(
  infoDbNo: number,
  targetColumn: string
): Promise<SegmentFileListResponse> {
  const response = await axiosInstance.get<SegmentFileListResponse>("/segment/list", {
    params: {
      infoDbNo,
      targetColumn,
    },
  });
  return response.data;
}

export async function requestSegmentAnalysisSubscription(params: {
  user_info: string;
  user_sub_info: string;
}) {
  return axiosInstance.get("/segment/subscription", { params });
}


export async function requestSegmentAnalysisWatchTime(params: {
  user_info: string;
  user_sub_info: string;
}) {
  return axiosInstance.get("/segment/watch-time", { params });
}

export async function requestSegmentAnalysisGenre(params: {
  user_info: string;
  user_sub_info: string;
}) {
  return axiosInstance.get("/segment/genre", { params });
}

export async function requestSegmentAnalysisLastLogin(params: {
  user_info: string;
  user_sub_info: string;
}) {
  return axiosInstance.get("/segment/last-login", { params });
}

export async function requestSegmentFile(params: {
  s3Key: string;
}) {
  return axiosInstance.get("/segment/list/file", {
    params,
    responseType: "blob", // 파일 다운로드용
  });
}

