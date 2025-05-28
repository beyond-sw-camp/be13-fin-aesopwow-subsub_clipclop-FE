// src/App.tsx
import { Route, Routes } from 'react-router-dom';
import './chart/ChartRegister';
import LoginPage from './presentation/pages/LoginPage';
import SignupPage from './presentation/pages/SignUpPage';
import AnalyticsCohortSingleClusterSelectPage from './presentation/pages/AnalyticsCohortSingleClusterSelectPage';
import AnalyticsCohortSingleCohortResultPage from './presentation/pages/AnalyticsCohortSingleCohortResultPage';
import AnalyticsCohortSingleUserDataPage from './presentation/pages/AnalyticsCohortSingleUserDataPage';

import AnalyticsCohortDoubleClusterSelectPage from './presentation/pages/AnalyticsCohortDoubleClusterSelectPage';
import AnalyticsCohortDoubleCohortResultPage from './presentation/pages/AnalyticsCohortDoubleCohortResultPage';
import AnalyticsCohortDoubleUserDataPage from './presentation/pages/AnalyticsCohortDoubleUserDataPage';
import DashBoardPage from './presentation/pages/DashBoardPage';
// import AnalyticsCohortPage from './presentation/pages/AnalyticsCohortPage';
import { useEffect } from "react";
import { useAuthStore } from "@/application/stores/AuthStore"; 
import ProtectedRoute from './presentation/components/organisms/LoginProtectedRoute';

import ForgotPasswordPage from './presentation/pages/ForgotPasswordPage';
import WatchTimePage from "@/presentation/pages/WatchTimePage";
import SubscriptionPage from "@/presentation/pages/SubscriptionPage";
import GenrePage from "@/presentation/pages/GenrePage";
import LastLoginPage from "@/presentation/pages/LastLoginPage";


function App() {
const initializeToken = useAuthStore((state) => state.initializeToken);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    initializeToken();
  }, []);

  if (!isInitialized) {
    // 토큰 초기화 중이면 렌더링하지 않음
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {/* <Route path="/analytics/cohorts" element={<AnalyticsCohortPage />} /> */}
      {/* <Route path="/analytics/singlecohorts" element={<AnalyticsCohortPage />} /> */}
      <Route path="/signin" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      {/* 향후 다른 페이지 추가 시 아래에 계속 확장 가능 */}
      <Route path="/dash-board" element={<DashBoardPage />} />
      <Route path="/analytics/single/clusterselect" element={<AnalyticsCohortSingleClusterSelectPage />} />
      <Route
        path="/analytics/single/clusterselect"
        element={
          <ProtectedRoute>
            <AnalyticsCohortSingleClusterSelectPage />
          </ProtectedRoute>
        }
      />
      <Route path="/analytics/single/cohortresult" element={<AnalyticsCohortSingleCohortResultPage />} />
      <Route path="/analytics/single/user-data" element={<AnalyticsCohortSingleUserDataPage />} />
      <Route path="/forgot/password" element={<ForgotPasswordPage />} />

      <Route
        path="/analytics/double/clusterselect"
        element={
          <ProtectedRoute>
            <AnalyticsCohortDoubleClusterSelectPage />
          </ProtectedRoute>
        }
      />
      <Route path="/analytics/double/cohortresult" element={<AnalyticsCohortDoubleCohortResultPage />} />
      <Route path="/analytics/double/user-data" element={<AnalyticsCohortDoubleUserDataPage />} />

      <Route path="/" element={<LoginPage />} />

      <Route path="/segments/watchtime" element={<WatchTimePage />} />
      <Route path="/segments/subscription" element={<SubscriptionPage />} />
      <Route path="/segments/genre" element={<GenrePage />} />
      <Route path="/segments/lastlogin" element={<LastLoginPage />} />

    </Routes>
  );
}

export default App;
