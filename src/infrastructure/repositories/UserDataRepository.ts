// /infrastructure/repositories/UserDataRepository.ts
import { fetchUserDataSearchResultApi } from "@/infrastructure/api/UserDataApi";

// MARK: - 유저 데이터 검색 결과
export class UserDataRepository {
  async fetchUserDataSearchResult(clusterType: string, fields: string[]): Promise<Record<string, string>[]> {
    const rawData = await fetchUserDataSearchResultApi(clusterType, fields);
    return rawData.tableData; // ✅ tableData: Record<string, string>[]
  }
}