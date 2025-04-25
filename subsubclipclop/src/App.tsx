// src/App.tsx
import { Route, Routes } from 'react-router-dom';
import AnalyticsCohortPage from '@/presentation/pages/AnalyticsCohortPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AnalyticsCohortPage />} />
      {/* 향후 다른 페이지 추가 시 아래에 계속 확장 가능 */}
    </Routes>
  );
}

export default App;
