"use client";

import { useRouter } from "next/navigation"; // next/navigation からインポート

const BackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // 前のページに戻る
  };

  return (
    <button onClick={handleGoBack}
    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
    >戻る</button>
  );
};

export default BackButton;
