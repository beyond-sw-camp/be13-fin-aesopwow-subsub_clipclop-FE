// src/App.tsx
import { Route, Routes } from 'react-router-dom';
import LoginPage from './presentation/pages/LoginPage';
import AnalyticsCohortSingleClusterSelectPage from './presentation/pages/AnalyticsCohortSingleClusterSelectPage';
import AnalyticsCohortSingleCohortResultPage from './presentation/pages/AnalyticsCohortSingleCohortResultPage';
import AnalyticsCohortSingleUserDataPage from './presentation/pages/AnalyticsCohortSingleUserDataPage';

function App() {
  return (
    <Routes>
      <Route path="/analytics/single/clusterselect" element={<AnalyticsCohortSingleClusterSelectPage />} />
      <Route path="/analytics/single/cohortresult" element={<AnalyticsCohortSingleCohortResultPage />} />
      <Route path="/analytics/single/user-data" element={<AnalyticsCohortSingleUserDataPage />} />

      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
