export function mapBehaviorPattern(raw: any) {
    return {
      title: raw.title ?? "제목 없음",
      content: raw.content ?? "내용 없음",
    };
  }
  