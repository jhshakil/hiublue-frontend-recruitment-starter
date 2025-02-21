import HeaderSection from "@/components/shared/header-section";
import Sidebar from "@/components/shared/sidebar";
import { Box } from "@mui/material";
import type React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box
        component="main"
        sx={{ flexGrow: 1, backgroundColor: "background.default" }}
      >
        <HeaderSection />
        <Box sx={{ px: 6, py: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
}
