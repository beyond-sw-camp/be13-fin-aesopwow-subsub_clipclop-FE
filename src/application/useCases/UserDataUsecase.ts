// /application/useCases/UserDataUsecase.ts
import { UserDataRepository } from "@/infrastructure/repositories/UserDataRepository";

const repository = new UserDataRepository();

// MARK: - 유저 데이터 검색 결과
export async function fetchUserDataSearchResult(clusterType: string, fields: string[]) {
  return await repository.fetchUserDataSearchResult(clusterType, fields);
}
