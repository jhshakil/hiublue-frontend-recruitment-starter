import axiosInstance from "@/lib/axiosInstance";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/login", userData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
