// src/App.tsx
import { Route, Routes } from 'react-router-dom';
import SegmentCohortPage from '@/presentation/pages/SegmentCohortPage.tsx';
import LoginPage from './presentation/pages/LoginPage';
<<<<<<< HEAD
import MyPage from './presentation/pages/MyPage'; 
=======
import AnalyticsCohortSingleClusterSelectPage from './presentation/pages/AnalyticsCohortSingleClusterSelectPage';
import AnalyticsCohortSingleCohortResultPage from './presentation/pages/AnalyticsCohortSingleCohortResultPage';
>>>>>>> 93fdda68fb6917970eb0ad73d8dd7ef0125fe98c

function App() {
  return (
    <Routes>
      <Route path="/analytics/segment" element={<SegmentCohortPage />} />
      
      <Route path="/analytics/single/clusterselect" element={<AnalyticsCohortSingleClusterSelectPage />} />
      <Route path="/analytics/single/cohortresult" element={<AnalyticsCohortSingleCohortResultPage />} />
      {/* <Route path="/analytics/single/userdata" element={<AnalyticsCohortSingleUserDataPage />} /> */}

      <Route path="/" element={<LoginPage />} />
<<<<<<< HEAD
      <Route path="/profile" element={<MyPage />} />
      {/* 향후 다른 페이지 추가 시 아래에 계속 확장 가능 */}
=======
>>>>>>> 93fdda68fb6917970eb0ad73d8dd7ef0125fe98c
    </Routes>
  );
}

export default App;
