// /src/infrastructure/api/CohortApi.ts
import axiosInstance from "@/infrastructure/api/Axios.ts";
import { getUser } from "@/application/stores/UserStore.ts";
import { CustomError } from "@/error/CustomError";
import { ErrorResponse } from "@/error/ErrorResponse";
import { ErrorCode } from "@/error/ErrorCode";

// MARK: - Single 시각화
export async function fetchSingleVisualizationApi(clusterType: string) {
  if (!clusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);

  try {
    const { companyNo } = getUser();
    const res = await axiosInstance.post("/analysis/cohort/single/visualization", { companyNo, clusterType });
    return res.data;
  } catch (error) {
    throw new ErrorResponse(error);
  }
}

// MARK: - Single 인사이트
export async function fetchSingleInsightApi(clusterType: string) {
  if (!clusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);

  try {
    const { companyNo } = getUser();
    const res = await axiosInstance.post("/analysis/cohort/single/insight", { companyNo, clusterType });
    return res.data;
  } catch (error) {
    throw new ErrorResponse(error);
  }
}

// MARK: - Single 히트맵
export async function fetchSingleRemainHeatmapApi(clusterType: string) {
  if (!clusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);

  try {
    const { companyNo } = getUser();
    const res = await axiosInstance.post("/analysis/cohort/single/remain-heatmap", { companyNo, clusterType });
    return res.data;
  } catch (error) {
    throw new ErrorResponse(error);
  }
}

// MARK: - Single 유저 데이터
export async function fetchSingleUserDataSearchResultApi(clusterType: string, fields: string[]) {
  if (!clusterType || !fields.length) throw new CustomError(ErrorCode.INVALID_PARAMS);

  try {
    const { companyNo } = getUser();
    const res = await axiosInstance.post("/analysis/cohort/single/user-data", { companyNo, clusterType, fields });
    return res.data;
  } catch (error) {
    throw new ErrorResponse(error);
  }
}

// MARK: - Double 시각화
export async function fetchDoubleVisualizationApi(firstClusterType: string, secondClusterType: string) {
  if (!firstClusterType || !secondClusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);

  try {
    const { companyNo } = getUser();
    const res = await axiosInstance.post("/analysis/cohort/double/visualization", { companyNo, firstClusterType, secondClusterType });
    return res.data;
  } catch (error) {
    throw new ErrorResponse(error);
  }
}

// MARK: - Double 인사이트
export async function fetchDoubleInsightApi(firstClusterType: string, secondClusterType: string) {
  if (!firstClusterType || !secondClusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);

  try {
    const { companyNo } = getUser();
    const res = await axiosInstance.post("/analysis/cohort/double/insight", { companyNo, firstClusterType, secondClusterType });
    return res.data;
  } catch (error) {
    throw new ErrorResponse(error);
  }
}

// MARK: - Double 히트맵
export async function fetchDoubleRemainHeatmapApi(firstClusterType: string, secondClusterType: string) {
  if (!firstClusterType || !secondClusterType) throw new CustomError(ErrorCode.INVALID_PARAMS);

  try {
    const { companyNo } = getUser();
    const res = await axiosInstance.post("/analysis/cohort/double/remain-heatmap", { companyNo, firstClusterType, secondClusterType });
    return res.data;
  } catch (error) {
    throw new ErrorResponse(error);
  }
}

// MARK: - Double 유저 데이터
export async function fetchDoubleUserDataSearchResultApi(firstClusterType: string, secondClusterType: string, fields: string[]) {
  if (!firstClusterType || !secondClusterType || !fields.length) throw new CustomError(ErrorCode.INVALID_PARAMS);

  try {
    const { companyNo } = getUser();
    const res = await axiosInstance.post("/analysis/cohort/double/user-data", { companyNo, firstClusterType, secondClusterType, fields });
    return res.data;
  } catch (error) {
    throw new ErrorResponse(error);
  }
}