import { fetchSegmentFileList, requestSegmentAnalysisSubscription, requestSegmentFile, requestSegmentAnalysisGenre, requestSegmentAnalysisWatchTime, requestSegmentAnalysisLastLogin } from "../../infrastructure/api/Segment";
import type { SegmentFileListResponse } from "../../core/model/SegmentFileListResponse";


export class SegmentFileListViewModel {
  async getFileList(infoDbNo: number, targetColumn: string): Promise<SegmentFileListResponse> {
    return await fetchSegmentFileList(infoDbNo, targetColumn);
  }

  async requestLatestSubscriptionAnalysisGet(params: {
    info_db_no : number;
    user_info: string;
    user_sub_info: string;
  }) {
    return requestSegmentAnalysisSubscription(params);
  }

  async requestLatestWatchTimeAnalysisGet(params: {
    info_db_no : number;
    user_info: string;
    user_sub_info: string;
  }) {
    return requestSegmentAnalysisWatchTime(params);
  }
  async requestLatestLastLoginAnalysisGet(params: {
    info_db_no : number;
    user_info: string;
    user_sub_info: string;
  }) {
    return requestSegmentAnalysisLastLogin(params);
  }
  async requestLatestGenreAnalysisGet(params: {
    info_db_no : number;
    user_info: string;
    user_sub_info: string;
  }) {
    return requestSegmentAnalysisGenre(params);
  }
  
  // 파일 다운로드 (CSV 등)
  async downloadFile(s3Key: string) {
    // s3Key 예시: "2/segment/subscription/2_segment_subscription_20250608003406.csv"
    return requestSegmentFile({ s3Key });
  }
}
