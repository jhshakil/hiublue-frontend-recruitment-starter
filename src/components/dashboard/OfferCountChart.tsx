import { Paper, Typography } from "@mui/material";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const OfferCountChart = () => {
  const offersSentData = [
    { name: "Sun", value: 30 },
    { name: "Mon", value: 35 },
    { name: "Tue", value: 40 },
    { name: "Wed", value: 45 },
    { name: "Thu", value: 50 },
    { name: "Fri", value: 45 },
    { name: "Sat", value: 40 },
  ];

  return (
    <Paper sx={{ flex: 1, p: 2, minWidth: 400 }}>
      <Typography variant="h6" gutterBottom>
        Offers sent
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={offersSentData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#2196f3" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default OfferCountChart;
