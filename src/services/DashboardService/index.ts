import axiosInstance from "@/lib/axiosInstance";

export const getDashboardSummary = async (filter: string) => {
  try {
    const { data } = await axiosInstance.get("/dashboard/summary", {
      params: { filter },
    });

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getDashboardStats = async (filter: string) => {
  try {
    const { data } = await axiosInstance.get("/dashboard/stat", {
      params: { filter },
    });

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
