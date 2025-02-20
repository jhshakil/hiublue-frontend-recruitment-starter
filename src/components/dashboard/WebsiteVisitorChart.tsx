import { primary, warning } from "@/theme/palette";
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
  const websiteVisitsData = formatVisitorData(visitorData);

  return (
    <Paper
      sx={{
        flex: 1,
        p: 2,
        minWidth: 400,
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
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
            tick={{ fill: "#7D7D7D", fontSize: 12 }}
            tickLine={false}
          />
          <YAxis tick={{ fill: "#7D7D7D", fontSize: 12 }} tickLine={false} />
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
