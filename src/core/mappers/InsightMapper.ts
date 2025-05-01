export function mapInsight(raw: any) {
    return {
      title: raw.title ?? "인사이트 없음",
      content: raw.content ?? "설명이 없습니다.",
    };
  }
  