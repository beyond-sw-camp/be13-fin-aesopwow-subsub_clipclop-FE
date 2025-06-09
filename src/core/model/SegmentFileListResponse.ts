export interface SegmentFileInfo {
  fileName: string;
  url: string;
  createdAt: string;
}

export interface SegmentFileListResponse {
  files: SegmentFileInfo[];
}