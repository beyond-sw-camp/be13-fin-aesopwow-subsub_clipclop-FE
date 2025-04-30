// src/App.tsx
import { Route, Routes } from 'react-router-dom';
import AnalyticsCohortPage from '@/presentation/pages/AnalyticsCohortPage';
import SegmentCohortPage from '@/presentation/pages/SegmentCohortPage'; // 추가!

function App() {
  return (
    <Routes>
      <Route path="/analytics/cohorts" element={<AnalyticsCohortPage />} />
      <Route path="/analytics/segment" element={<SegmentCohortPage />} /> {/* 추가! */}
      {/* 향후 다른 페이지 추가 시 아래에 계속 확장 가능 */}
    </Routes>
  );
}

export default App;
