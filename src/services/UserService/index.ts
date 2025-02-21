import axiosInstance from "@/lib/axiosInstance";

export const getAllUserData = async ({
  search,
  page,
}: {
  search: string;
  page: number;
}) => {
  try {
    const { data } = await axiosInstance.get("/users", {
      params: { search, page },
    });

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
