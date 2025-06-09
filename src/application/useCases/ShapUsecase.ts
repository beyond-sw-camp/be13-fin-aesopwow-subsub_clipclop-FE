// // 📁 /src/application/useCases/ShapUsecase.ts
// import { ShapRepository } from "@/infrastructure/repositories/ShapRepository";
// import { ShapResult } from "@/infrastructure/repositories/ShapRepository";

// const repository = new ShapRepository();

// /**
//  * 📌 전체 유저 대상 SHAP 분석 요청
//  */
// export async function fetchEntireShapAnalysis(): Promise<ShapResult> {
//   return await repository.fetchEntireShapParsed();
// }

// /**
//  * 📌 필터 기반 SHAP 분석 요청
//  * @param keyword 키워드 문자열 (comma-separated)
//  * @param filters 필터 객체
//  */
// export async function fetchFilteredShapAnalysis(
//   keyword: string,
//   filters: Record<string, any>
// ): Promise<ShapResult> {
//   return await repository.fetchFilteredShapParsed(keyword, filters);
// }