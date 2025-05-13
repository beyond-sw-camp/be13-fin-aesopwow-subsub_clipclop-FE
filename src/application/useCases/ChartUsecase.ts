import { ChartData } from '@/core/model/ChartData';
import { ChartDataRepository } from '@/infrastructure/repositories/ChartRepository';

export class GetChartDataUseCase {
  constructor(private repository: ChartDataRepository) {}

  execute(csvData: string): Promise<ChartData> {
    return this.repository.getChartData(csvData);
  }
}
