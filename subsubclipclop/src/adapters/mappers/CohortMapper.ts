export function CohortMapper(rawData: any) {
    return {
      id: rawData.id,
      name: rawData.name,
    };
  }