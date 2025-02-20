import { TSummary } from "@/types/dashboard.types";
import { Box, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";

type Props = {
  summaries: TSummary | null;
};

const formatNumber = (num: number) => {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (num >= 1e3) return (num / 1e3).toFixed(1) + "k";
  return num.toString();
};

const calculatePercentageChange = (current: number, previous: number) => {
  if (previous === 0) return 100;
  return (((current - previous) / previous) * 100).toFixed(1);
};

const TotalCount = ({ summaries }: Props) => {
  if (!summaries) return;
  const metrics = [
    {
      title: "Total active users",
      currentValue: summaries.current.active_users,
      previousValue: summaries.previous.active_users,
    },
    {
      title: "Total appearances",
      currentValue: summaries.current.appearance,
      previousValue: summaries.previous.appearance,
    },
    {
      title: "Total clicks",
      currentValue: summaries.current.clicks,
      previousValue: summaries.previous.clicks,
    },
  ];

  return (
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
      {metrics.map(({ title, currentValue, previousValue }, index) => {
        const percentageChange = calculatePercentageChange(
          currentValue,
          previousValue
        );
        const isIncrease = currentValue >= previousValue;
        const iconSrc = isIncrease
          ? "/images/icons/up-value-icon.png"
          : "/images/icons/down-value-icon.png";
        const color = isIncrease ? "success.main" : "error.main";

        return (
          <Card key={index} sx={{ flex: 1, minWidth: 275 }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {title}
              </Typography>
              <Typography variant="h4">{formatNumber(currentValue)}</Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color,
                  gap: "4px",
                }}
              >
                <Image width={24} height={24} src={iconSrc} alt="trend icon" />
                <Typography variant="body2">
                  {percentageChange}% {isIncrease ? "increase" : "decrease"}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};

export default TotalCount;
