export function mapRemainHeatmap(raw: any) {
    return {
      title: raw.title ?? "히트맵 분석 없음",
      content: raw.content ?? "",
      heatmapImageBase64: raw.heatmapImageBase64 ?? "",
    };
  }
  