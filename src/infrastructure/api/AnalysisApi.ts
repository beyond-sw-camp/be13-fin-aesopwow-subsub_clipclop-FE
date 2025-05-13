// /src/infrastructure/api/AnalysisApi.ts
import axiosInstance from "@/infrastructure/api/Axios.ts";
import { ErrorResponse } from "@/error/ErrorResponse";
import { AnalysisFileRequestModel } from "@/core/model/AnalysisModel";

export async function fetchAnalysisFile(params: AnalysisFileRequestModel): Promise<Blob> {
  try {
    const res = await axiosInstance.get(`/analysis`, {
      params,
      responseType: 'blob'
    });
    
    return res.data;
  } catch (error) {
    throw new ErrorResponse(error);
  }
}