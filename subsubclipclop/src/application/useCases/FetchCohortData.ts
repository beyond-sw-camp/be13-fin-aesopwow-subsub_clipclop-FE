import { cohortRepository } from "@/adapters/gateways/CohortGateway";

export async function FetchCohortData() {
  return await cohortRepository.fetchCohorts();
}