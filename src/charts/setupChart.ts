// src/charts/setupChart.ts
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);
