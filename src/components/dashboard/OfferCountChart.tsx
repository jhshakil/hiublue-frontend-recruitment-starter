import { palette } from "@/theme/palette";
import { TOffer } from "@/types/dashboard.types";
import { Paper, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Props = {
  offerData: TOffer | null;
};

const formatOfferData = (offerData: TOffer | null) => {
  if (!offerData) return [];

  return [
    { name: "Sun", value: offerData.sunday },
    { name: "Mon", value: offerData.monday },
    { name: "Tue", value: offerData.tuesday },
    { name: "Wed", value: offerData.wednesday },
    { name: "Thu", value: offerData.thursday },
    { name: "Fri", value: offerData.friday },
    { name: "Sat", value: offerData.saturday },
  ];
};

const OfferCountChart = ({ offerData }: Props) => {
  if (!offerData) return;
  const offersSentData = formatOfferData(offerData);

  return (
    <Paper
      sx={{
        flex: 1,
        p: 2,
        minWidth: 400,
        borderRadius: "12px",
        boxShadow:
          "0px 12px 24px -4px rgba(145, 158, 171, 0.12),0px 0px 2px 0px rgba(145, 158, 171, 0.2)",
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        Offers Sent
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={offersSentData}>
          <XAxis
            dataKey="name"
            tick={{ fill: palette.text?.disabled, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: palette.text?.disabled, fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Line
            type="basis"
            dataKey="value"
            stroke={palette.text?.primary}
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default OfferCountChart;
