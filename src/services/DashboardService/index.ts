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

export const getAllOfferList = async ({
  search,
  type,
  status,
  page,
  per_page,
}: {
  search: string;
  type: string;
  status: string;
  page: string;
  per_page: string;
}) => {
  try {
    const { data } = await axiosInstance.get("/offers", {
      params: { search, type, status, page, per_page },
    });

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
