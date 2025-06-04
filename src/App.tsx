// src/App.tsx
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuthStore } from "@/application/stores/AuthStore";
import ProtectedRoute from "./presentation/components/organisms/LoginProtectedRoute";

// 페이지 컴포넌트 import
import LoginPage from "./presentation/pages/LoginPage";
import SignupPage from "./presentation/pages/SignUpPage";
import DashBoardPage from "./presentation/pages/DashBoardPage";
import MyPage from "./presentation/pages/MyPage";
import MembershipPage from "./presentation/pages/MembershipPage";
import AboutUsPage from "./presentation/pages/AboutUsPage";

import AnalyticsCohortSingleClusterSelectPage from "./presentation/pages/AnalyticsCohortSingleClusterSelectPage";
import AnalyticsCohortSingleCohortResultPage from "./presentation/pages/AnalyticsCohortSingleCohortResultPage";
import AnalyticsCohortSingleUserDataPage from "./presentation/pages/AnalyticsCohortSingleUserDataPage";
import AnalyticsCohortDoubleClusterSelectPage from "./presentation/pages/AnalyticsCohortDoubleClusterSelectPage";
import AnalyticsCohortDoubleCohortResultPage from "./presentation/pages/AnalyticsCohortDoubleCohortResultPage";
import AnalyticsCohortDoubleUserDataPage from "./presentation/pages/AnalyticsCohortDoubleUserDataPage";

import QnaListPage from "./presentation/pages/QnaListPage";
import QnaWritePage from "./presentation/pages/QnaWritePage";
import QnaDetailPage from "./presentation/pages/QnaDetailPage";
import QnaEditPage from "./presentation/pages/QnaEditPage";

import ForgotPasswordPage from "./presentation/pages/ForgotPasswordPage";
import WatchTimePage from "@/presentation/pages/WatchTimePage";
import SubscriptionPage from "@/presentation/pages/SubscriptionPage";
import GenrePage from "@/presentation/pages/GenrePage";
import LastLoginPage from "@/presentation/pages/LastLoginPage";

function App() {
    const initializeToken = useAuthStore((state) => state.initializeToken);
    const isInitialized = useAuthStore((state) => state.isInitialized);

    useEffect(() => {
        initializeToken();
    }, [initializeToken]);

    if (!isInitialized) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ToastContainer />
            <Routes>
                {/* 인증/비인증 라우트 구분 */}
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot/password" element={<ForgotPasswordPage />} />

                {/* 대시보드, 마이페이지, 멤버십 */}
                <Route path="/dash-board" element={<DashBoardPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/membership" element={<MembershipPage />} />
                <Route path="/aboutus" element={<AboutUsPage />} />

                {/* Analytics Single */}
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

                {/* Analytics Double */}
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

                {/* QnA */}
                <Route path="/qna" element={<QnaListPage />} />
                <Route path="/qna/write" element={<QnaWritePage />} />
                <Route path="/qna/:id" element={<QnaDetailPage />} />
                <Route path="/qna/edit/:id" element={<QnaEditPage />} />

                {/* Segments */}
                <Route path="/segments/watchtime" element={<WatchTimePage />} />
                <Route path="/segments/subscription" element={<SubscriptionPage />} />
                <Route path="/segments/genre" element={<GenrePage />} />
                <Route path="/segments/lastlogin" element={<LastLoginPage />} />
            </Routes>
        </>
    );
}

export default App;