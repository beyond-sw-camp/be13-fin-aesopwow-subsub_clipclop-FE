// /src/application/useCases/AnalysisUsecase.ts
import { AnalysisRepository } from "@/infrastructure/repositories/AnalysisRepository";
import { ErrorResponse } from "@/error/ErrorResponse";
import { AnalysisFileRequestModel } from "@/core/model/AnalysisModel";

const repository = new AnalysisRepository();

export async function fetchAnalysisFile(params: AnalysisFileRequestModel): Promise<Blob> {
  try {
    const file = await repository.fetchAnalysisFile(params);
    
    return file;
  } catch (error) {
    throw new ErrorResponse(error);
  }
}