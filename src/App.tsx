// src/App.tsx
import { Route, Routes } from 'react-router-dom';
import SegmentCohortPage from '@/presentation/pages/SegmentCohortPage.tsx';
import LoginPage from './presentation/pages/LoginPage';
import AnalyticsCohortSingleClusterSelectPage from './presentation/pages/AnalyticsCohortSingleClusterSelectPage';
import AnalyticsCohortSingleCohortResultPage from './presentation/pages/AnalyticsCohortSingleCohortResultPage';

function App() {
  return (
    <Routes>
      <Route path="/analytics/segment" element={<SegmentCohortPage />} />
      
      <Route path="/analytics/single/clusterselect" element={<AnalyticsCohortSingleClusterSelectPage />} />
      <Route path="/analytics/single/cohortresult" element={<AnalyticsCohortSingleCohortResultPage />} />
      {/* <Route path="/analytics/single/userdata" element={<AnalyticsCohortSingleUserDataPage />} /> */}

      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
