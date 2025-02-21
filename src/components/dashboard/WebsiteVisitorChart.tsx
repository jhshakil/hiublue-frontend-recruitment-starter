import { palette, primary, warning } from "@/theme/palette";
import { TWebsiteVisitor } from "@/types/dashboard.types";
import { Paper, Typography } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Props = {
  visitorData: TWebsiteVisitor | null;
};

const formatVisitorData = (visitorData: TWebsiteVisitor | null) => {
  if (!visitorData) return [];

  return [
    {
      name: "Sun",
      desktop: visitorData.sunday.desktop,
      mobile: visitorData.sunday.mobile,
    },
    {
      name: "Mon",
      desktop: visitorData.monday.desktop,
      mobile: visitorData.monday.mobile,
    },
    {
      name: "Tue",
      desktop: visitorData.tuesday.desktop,
      mobile: visitorData.tuesday.mobile,
    },
    {
      name: "Wed",
      desktop: visitorData.wednesday.desktop,
      mobile: visitorData.wednesday.mobile,
    },
    {
      name: "Thu",
      desktop: visitorData.thursday.desktop,
      mobile: visitorData.thursday.mobile,
    },
    {
      name: "Fri",
      desktop: visitorData.friday.desktop,
      mobile: visitorData.friday.mobile,
    },
    {
      name: "Sat",
      desktop: visitorData.saturday.desktop,
      mobile: visitorData.saturday.mobile,
    },
  ];
};

const WebsiteVisitorChart = ({ visitorData }: Props) => {
  if (!visitorData) return;
  const websiteVisitsData = formatVisitorData(visitorData);

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
      <Typography variant="h6" gutterBottom>
        Website Visits
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={websiteVisitsData} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
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
          <Tooltip cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            wrapperStyle={{ paddingBottom: 10 }}
          />
          <Bar
            dataKey="desktop"
            fill={primary.dark}
            name="Desktop"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="mobile"
            fill={warning.main}
            name="Mobile"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default WebsiteVisitorChart;
