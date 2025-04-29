// /adapters/gateways/CohortGateway.ts
import { CohortRepository } from "@/ports/repositories/CohortRepository.ts";
import { CohortRepositoryImpl } from "@/infrastructure/repositories/CohortRepositoryImpl.ts";

// CohortRepositoryImpl 인스턴스를 인터페이스 타입으로 변환
export const cohortGateway: CohortRepository = new CohortRepositoryImpl();
