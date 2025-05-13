import { create } from 'zustand';
import { ChartData } from '@/core/model/ChartData';
import { GetChartDataUseCase } from '@/application/useCases/ChartUsecase';
import { CSVChartDataRepository } from '@/infrastructure/repositories/CSVChartDataRepository';

interface ChartState {
  chartData: ChartData | null;
  isLoading: boolean;
  error: Error | null;
  loadChartData: (csvFile: File) => Promise<void>;
}

const repository = new CSVChartDataRepository();
const getChartDataUseCase = new GetChartDataUseCase(repository);

export const useChartStore = create<ChartState>((set) => ({
  chartData: null,
  isLoading: false,
  error: null,
  loadChartData: async (csvFile: File) => {
    set({ isLoading: true, error: null });
    try {
      const csvText = await readFile(csvFile);
      const data = await getChartDataUseCase.execute(csvText);
      set({ chartData: data });
    } catch (err) {
      set({ error: err instanceof Error ? err : new Error('알 수 없는 오류') });
    } finally {
      set({ isLoading: false });
    }
  },
}));

async function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsText(file);
  });
}
