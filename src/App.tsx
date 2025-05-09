// src/App.tsx
import { Route, Routes } from 'react-router-dom';
import AnalyticsCohortPage from '@/presentation/pages/AnalyticsCohortPage.tsx';
import AnalyticsCohortSinglePage from './presentation/pages/AnalyticsCohortSinglePage';
import SegmentCohortPage from '@/presentation/pages/SegmentCohortPage.tsx'; // 추가!
import LoginPage from './presentation/pages/LoginPage';
import MyPage from './presentation/pages/MyPage'; 

function App() {
  return (
    <Routes>
      <Route path="/analytics/cohorts" element={<AnalyticsCohortPage />} />
      <Route path="/analytics/singlecohorts" element={<AnalyticsCohortSinglePage />} />
      <Route path="/analytics/segment" element={<SegmentCohortPage />} /> {/* 추가! */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/profile" element={<MyPage />} />
      {/* 향후 다른 페이지 추가 시 아래에 계속 확장 가능 */}
    </Routes>
  );
}

export default App;
