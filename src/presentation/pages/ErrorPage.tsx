import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary px-4">
      <div className="shadow-lg rounded-xl flex flex-col items-center justify-center w-[700px] h-[400px] bg-white">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">준비 중입니다.</h1> <br />
        <p className="text-xl text-gray-600 mb-2">곧 더 멋진 모습으로 찾아뵙겠습니다.</p>
  <br /><br />
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
