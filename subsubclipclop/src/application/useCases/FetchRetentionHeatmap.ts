import { cohortRepository } from "@/adapters/gateways/CohortGateway";

export async function FetchRetentionHeatmap() {
  return await cohortRepository.fetchRetentionMatrix();
}