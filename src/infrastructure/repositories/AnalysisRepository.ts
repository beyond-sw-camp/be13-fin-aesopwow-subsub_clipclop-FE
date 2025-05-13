// /src/infrastructure/repositories/AnalysisRepository.ts
import { fetchAnalysisFile } from "@/infrastructure/api/AnalysisApi.ts";
import { ErrorResponse } from "@/error/ErrorResponse";
import { AnalysisFileRequestModel } from "@/core/model/AnalysisModel";

export class AnalysisRepository {
  async fetchAnalysisFile(params: AnalysisFileRequestModel): Promise<Blob> {
    try {
      const file = await fetchAnalysisFile(params);
      
      return file;
    } catch (error) {
      throw new ErrorResponse(error);
    }
  }
}