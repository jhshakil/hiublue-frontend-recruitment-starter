import { Paper, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const WebsiteVisitorChart = () => {
  const websiteVisitsData = [
    { name: "Sun", desktop: 30, mobile: 20 },
    { name: "Mon", desktop: 40, mobile: 30 },
    { name: "Tue", desktop: 35, mobile: 25 },
    { name: "Wed", desktop: 50, mobile: 35 },
    { name: "Thu", desktop: 40, mobile: 30 },
    { name: "Fri", desktop: 45, mobile: 35 },
    { name: "Sat", desktop: 60, mobile: 40 },
  ];

  return (
    <Paper sx={{ flex: 1, p: 2, minWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Website visits
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={websiteVisitsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="desktop" fill="#2196f3" name="Desktop" />
          <Bar dataKey="mobile" fill="#ffc107" name="Mobile" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default WebsiteVisitorChart;
