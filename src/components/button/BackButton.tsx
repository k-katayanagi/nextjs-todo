"use client";

import { useRouter } from "next/navigation"; // next/navigation からインポート

const BackButton = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // 前のページに戻る
  };

  return (
    <button onClick={handleGoBack}>戻る</button>
  );
};

export default BackButton;
