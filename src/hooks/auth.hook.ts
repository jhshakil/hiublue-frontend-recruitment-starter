import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/AuthService";
import { FieldValues } from "react-hook-form";

export const useUserLogin = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER_Login"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: (data) => {
      if (typeof window !== "undefined" && data?.token) {
        localStorage.setItem("user_data_hiublue", JSON.stringify(data));
      }
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
};
