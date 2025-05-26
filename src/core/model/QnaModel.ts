// 📁 model/QnaModel.ts
export interface QnaPost {
  qnaPostNo: number;
  userNo: number;
  title: string;
  content: string;
  createdAt: string;
}

export interface QnaComment {
  commentNo: number;
  qnaPostNo: number;
  adminNo: number;
  content: string;
  createdAt: string;
}
