import Sidebar from "@/components/shared/sidebar";
import { Box, Container } from "@mui/material";
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
        sx={{ flexGrow: 1, p: 3, backgroundColor: "background.default" }}
      >
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </Box>
  );
}
