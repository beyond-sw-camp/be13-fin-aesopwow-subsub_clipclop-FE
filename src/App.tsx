// src/App.tsx
import { Route, Routes } from 'react-router-dom';
import LoginPage from './presentation/pages/LoginPage';
import AnalyticsCohortSingleClusterSelectPage from './presentation/pages/AnalyticsCohortSingleClusterSelectPage';
import AnalyticsCohortSingleCohortResultPage from './presentation/pages/AnalyticsCohortSingleCohortResultPage';
import AnalyticsCohortSingleUserDataPage from './presentation/pages/AnalyticsCohortSingleUserDataPage';

import AnalyticsCohortDoubleClusterSelectPage from './presentation/pages/AnalyticsCohortDoubleClusterSelectPage';
import AnalyticsCohortDoubleCohortResultPage from './presentation/pages/AnalyticsCohortDoubleCohortResultPage';
import AnalyticsCohortDoubleUserDataPage from './presentation/pages/AnalyticsCohortDoubleUserDataPage';

function App() {
  return (
    <Routes>
      <Route path="/analytics/single/clusterselect" element={<AnalyticsCohortSingleClusterSelectPage />} />
      <Route path="/analytics/single/cohortresult" element={<AnalyticsCohortSingleCohortResultPage />} />
      <Route path="/analytics/single/user-data" element={<AnalyticsCohortSingleUserDataPage />} />

      <Route path="/analytics/double/clusterselect" element={<AnalyticsCohortDoubleClusterSelectPage />} />
      <Route path="/analytics/double/cohortresult" element={<AnalyticsCohortDoubleCohortResultPage />} />
      <Route path="/analytics/double/user-data" element={<AnalyticsCohortDoubleUserDataPage />} />

      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
