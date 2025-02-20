"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user_data_hiublue");
    const parsedData = userData ? JSON.parse(userData) : null;

    if (!parsedData?.token) {
      router.push("/login"); // Redirect to login if no token found
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
