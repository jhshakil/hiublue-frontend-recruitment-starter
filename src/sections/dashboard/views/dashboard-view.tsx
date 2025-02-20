"use client";

import { Box, Typography, Select, MenuItem } from "@mui/material";

import { useEffect, useState } from "react";
import TotalCount from "@/components/dashboard/TotalCount";
import WebsiteVisitorChart from "@/components/dashboard/WebsiteVisitorChart";
import OfferCountChart from "@/components/dashboard/OfferCountChart";
import ShowOfferList from "@/components/dashboard/ShowOfferList";
import {
  getDashboardStats,
  getDashboardSummary,
} from "@/services/DashboardService";
import { TStats, TSummary } from "@/types/dashboard.types";

export default function DashboardView() {
  const [timeFilter, setTimeFilter] = useState("this-week");
  const [summaries, setSummaries] = useState<TSummary | null>(null);
  const [stats, setStats] = useState<TStats | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const summariesData = await getDashboardSummary(timeFilter);
        setSummaries(summariesData);
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
      }
    };

    const fetchStats = async () => {
      try {
        const statsData = await getDashboardStats(timeFilter);
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
      }
    };

    fetchSummary();
    fetchStats();
  }, [timeFilter]);

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
          <MenuItem value="this-week">This Week</MenuItem>
          <MenuItem value="prev-week">Prev Month</MenuItem>
        </Select>
      </Box>
      {/* total count  */}
      <TotalCount summaries={summaries} />
      {/* chart  */}
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mt: 3 }}>
        <WebsiteVisitorChart visitorData={stats?.website_visits || null} />
        <OfferCountChart />
      </Box>
      {/* Offer list  */}
      <ShowOfferList />
    </>
  );
}
