import { Avatar, Box } from "@mui/material";

const HeaderSection = () => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "white",
        px: 6,
        py: 3,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        boxShadow:
          "0px 12px 24px -4px rgba(145, 158, 171, 0.12),0px 0px 2px 0px rgba(145, 158, 171, 0.2)",
      }}
    >
      <Avatar
        src="/images/avatar.png"
        alt="Profile"
        sx={{
          width: 40,
          height: 40,
        }}
      />
    </Box>
  );
};

export default HeaderSection;
