import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary px-4">
      <div className="shadow-lg rounded-xl flex flex-col items-center justify-center w-[700px] h-[400px] bg-white">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-2">페이지를 찾을 수 없습니다.</p>
        <p className="text-gray-500 mb-6">요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.</p>
        <Link
          to="/"
          className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary transition"
          >
          홈으로 돌아가기
        </Link>
        </div>
    </div>
  );
};

export default ErrorPage;
