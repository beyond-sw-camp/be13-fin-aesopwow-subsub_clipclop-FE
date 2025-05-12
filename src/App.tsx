// src/App.tsx
import { Route, Routes } from 'react-router-dom';
import LoginPage from './presentation/pages/LoginPage';
<<<<<<< HEAD
import SignupPage from './presentation/pages/SignUpPage';
=======
import AnalyticsCohortSingleClusterSelectPage from './presentation/pages/AnalyticsCohortSingleClusterSelectPage';
import AnalyticsCohortSingleCohortResultPage from './presentation/pages/AnalyticsCohortSingleCohortResultPage';
import AnalyticsCohortSingleUserDataPage from './presentation/pages/AnalyticsCohortSingleUserDataPage';

import AnalyticsCohortDoubleClusterSelectPage from './presentation/pages/AnalyticsCohortDoubleClusterSelectPage';
import AnalyticsCohortDoubleCohortResultPage from './presentation/pages/AnalyticsCohortDoubleCohortResultPage';
import AnalyticsCohortDoubleUserDataPage from './presentation/pages/AnalyticsCohortDoubleUserDataPage';
>>>>>>> 023eb38831a727f58d169c8a49d518164e3dd44f

function App() {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/analytics/cohorts" element={<AnalyticsCohortPage />} />
      <Route path="/analytics/singlecohorts" element={<AnalyticsCohortSinglePage />} />
      <Route path="/analytics/segment" element={<SegmentCohortPage />} /> {/* 추가! */}
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/mypage" element={<SignupPage />} />
      {/* 향후 다른 페이지 추가 시 아래에 계속 확장 가능 */}
=======
      <Route path="/analytics/single/clusterselect" element={<AnalyticsCohortSingleClusterSelectPage />} />
      <Route path="/analytics/single/cohortresult" element={<AnalyticsCohortSingleCohortResultPage />} />
      <Route path="/analytics/single/user-data" element={<AnalyticsCohortSingleUserDataPage />} />

      <Route path="/analytics/double/clusterselect" element={<AnalyticsCohortDoubleClusterSelectPage />} />
      <Route path="/analytics/double/cohortresult" element={<AnalyticsCohortDoubleCohortResultPage />} />
      <Route path="/analytics/double/user-data" element={<AnalyticsCohortDoubleUserDataPage />} />

      <Route path="/" element={<LoginPage />} />
>>>>>>> 023eb38831a727f58d169c8a49d518164e3dd44f
    </Routes>
  );
}

export default App;
