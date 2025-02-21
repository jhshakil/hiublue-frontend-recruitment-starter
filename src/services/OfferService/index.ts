import axiosInstance from "@/lib/axiosInstance";
import { FieldValues } from "react-hook-form";

export const createOffer = async (offerData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/offers", offerData);

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
