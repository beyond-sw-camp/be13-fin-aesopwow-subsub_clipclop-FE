// /adapters/gateways/CohortGateway.ts

import { CohortRepository } from "@/ports/repositories/CohortRepository";
import { CohortRepositoryImpl } from "@/infrastructure/repositories/CohortRepositoryImpl";

// 구현체를 인터페이스 타입으로 변환한 객체를 외부에 제공
export const cohortRepository: CohortRepository = new CohortRepositoryImpl();
