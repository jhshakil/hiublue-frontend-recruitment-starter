"use client";

import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Paper,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  FormLabel,
  FormGroup,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { z } from "zod";
import { TUserData } from "@/types/user.types";
import { getAllUserData } from "@/services/UserService";
import { createOffer } from "@/services/OfferService";

type TOfferForm = {
  plan_type: "pay_as_you_go" | "monthly" | "yearly";
  additions: ("refundable" | "on_demand" | "negotiable")[];
  user_id: number; // Change user_id to number
  expired: string;
  price: string;
};

const offerSchema = z.object({
  plan_type: z.enum(["pay_as_you_go", "monthly", "yearly"]),
  additions: z
    .array(z.enum(["refundable", "on_demand", "negotiable"]))
    .default([]),
  user_id: z
    .number()
    .min(1, "Please select a user")
    .refine((val) => !isNaN(val), {
      message: "Invalid user ID",
    }),
  expired: z.string().min(1, "Please select an expiry date"),
  price: z
    .string()
    .min(1, "Price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Please enter a valid price")
    .transform((val) => Number.parseFloat(val).toFixed(2)),
});

export default function OnboardingView() {
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<TUserData[]>([]);
  const [usersLoading, setUsersLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [hasMore, setHasMore] = useState<boolean>(true);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const debounce = (callback: () => void, delay = 500): void => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(callback, delay);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TOfferForm>({
    resolver: zodResolver(offerSchema),
    defaultValues: {
      plan_type: "monthly",
      additions: [],
      user_id: 0,
      expired: "",
      price: "",
    },
  });

  const fetchUsers = async (query = "", currentPage = 1): Promise<void> => {
    if (!hasMore && currentPage !== 1) return;

    setUsersLoading(true);
    try {
      const response = await getAllUserData({
        search: query,
        page: currentPage,
      });
      if (response?.data) {
        setUsers((prev) =>
          currentPage === 1 ? response.data : [...prev, ...response.data]
        );
        setHasMore(response.data.length > 0);
      }
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setUsersLoading(false);
    }
  };

  useEffect(() => {
    debounce(() => fetchUsers(searchQuery, 1));
  }, [searchQuery]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSubmit = async (data: TOfferForm): Promise<void> => {
    try {
      setLoading(true);
      await createOffer(data);

      reset();
    } catch (err) {
      console.error("Something went wrong", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
        maxWidth: 600,
        mx: "auto",
        boxShadow:
          "0px 12px 24px -4px rgba(145, 158, 171, 0.12),0px 0px 2px 0px rgba(145, 158, 171, 0.2)",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Create Offer
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Plan Type */}
        <Box sx={{ mb: 3 }}>
          <FormLabel>Plan Type</FormLabel>
          <Controller
            name="plan_type"
            control={control}
            render={({ field }) => (
              <RadioGroup {...field} row>
                {["pay_as_you_go", "monthly", "yearly"].map((type) => (
                  <FormControlLabel
                    key={type}
                    value={type}
                    control={<Radio />}
                    label={type.charAt(0).toUpperCase() + type.slice(1)}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </Box>

        {/* Additions */}
        <Box sx={{ mb: 3 }}>
          <FormLabel>Additional Features</FormLabel>
          <Controller
            name="additions"
            control={control}
            render={({ field }) => (
              <FormGroup row>
                {["refundable", "on_demand", "negotiable"].map((key) => {
                  const option = key as
                    | "refundable"
                    | "on_demand"
                    | "negotiable";

                  return (
                    <FormControlLabel
                      key={option}
                      control={
                        <Checkbox
                          checked={field.value.includes(option)}
                          onChange={() =>
                            field.onChange(
                              field.value.includes(option)
                                ? field.value.filter((item) => item !== option)
                                : [...field.value, option]
                            )
                          }
                        />
                      }
                      label={option.charAt(0).toUpperCase() + option.slice(1)}
                    />
                  );
                })}
              </FormGroup>
            )}
          />
        </Box>

        {/* User Selection */}
        <Box sx={{ mb: 3 }}>
          <FormLabel>User</FormLabel>
          <Controller
            name="user_id"
            control={control}
            render={({ field }) => (
              <Autocomplete
                options={users}
                getOptionLabel={(option) => option.name}
                onInputChange={(_, newValue) => setSearchQuery(newValue)}
                onChange={(_, selectedUser) =>
                  field.onChange(selectedUser ? selectedUser.id : 0)
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search user"
                    error={!!errors.user_id}
                    helperText={errors.user_id?.message}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: usersLoading ? (
                        <CircularProgress size={20} />
                      ) : null,
                    }}
                  />
                )}
              />
            )}
          />
        </Box>

        {/* Expiration Date */}
        <Box sx={{ mb: 3 }}>
          <FormLabel>Expiration Date</FormLabel>
          <Controller
            name="expired"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                fullWidth
                error={!!errors.expired}
                helperText={errors.expired?.message}
              />
            )}
          />
        </Box>

        {/* Price */}
        <Box sx={{ mb: 3 }}>
          <FormLabel>Price</FormLabel>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                type="number"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                }}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />
        </Box>

        {/* Submit Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Sending..." : "Send Offer"}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
