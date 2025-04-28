// /adapters/gateways/SegmentSearchGateway.ts

import { SegmentSearchRepository } from "@/ports/repositories/SegmentSearchRepository";
import { SegmentSearchRepositoryImpl } from "@/infrastructure/repositories/SegmentSearchRepositoryImpl";

export const segmentSearchGateway: SegmentSearchRepository = new SegmentSearchRepositoryImpl();
