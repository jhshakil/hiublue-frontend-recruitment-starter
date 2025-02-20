import { Box, Card, CardContent, Typography } from "@mui/material";
import Image from "next/image";

const TotalCount = () => {
  return (
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
      <Card sx={{ flex: 1, minWidth: 275 }}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Total active users
          </Typography>
          <Typography variant="h4">8.2k</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "success.main",
              gap: "4px",
            }}
          >
            <Image
              width={24}
              height={24}
              src={"/images/icons/up-value-icon.png"}
              alt="up icon"
            />
            <Typography variant="body2">8.2% previous month</Typography>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ flex: 1, minWidth: 275 }}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Total stocks
          </Typography>
          <Typography variant="h4">8.2k</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "success.main",
              gap: "4px",
            }}
          >
            <Image
              width={24}
              height={24}
              src={"/images/icons/up-value-icon.png"}
              alt="up icon"
            />
            <Typography variant="body2">8.2% previous month</Typography>
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ flex: 1, minWidth: 275 }}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Total appearances
          </Typography>
          <Typography variant="h4">8.2k</Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              color: "error.main",
              gap: "4px",
            }}
          >
            <Image
              width={24}
              height={24}
              src={"/images/icons/down-value-icon.png"}
              alt="up icon"
            />
            <Typography variant="body2">8.2% previous month</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TotalCount;
