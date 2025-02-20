"use client";

import { Box, Typography, Select, MenuItem } from "@mui/material";

import { useState } from "react";
import TotalCount from "@/components/dashboard/TotalCount";
import WebsiteVisitorChart from "@/components/dashboard/WebsiteVisitorChart";
import OfferCountChart from "@/components/dashboard/OfferCountChart";
import ShowOfferList from "@/components/dashboard/ShowOfferList";

export default function DashboardView() {
  const [timeFilter, setTimeFilter] = useState("This Month");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          size="small"
        >
          <MenuItem value="This Month">This Month</MenuItem>
          <MenuItem value="Last Month">Last Month</MenuItem>
          <MenuItem value="This Year">This Year</MenuItem>
        </Select>
      </Box>
      {/* total count  */}
      <TotalCount />
      {/* chart  */}
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mt: 3 }}>
        <WebsiteVisitorChart />
        <OfferCountChart />
      </Box>
      {/* Offer list  */}
      <ShowOfferList />
    </>
  );
}
