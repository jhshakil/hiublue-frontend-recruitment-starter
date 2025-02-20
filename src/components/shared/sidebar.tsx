"use client";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const drawerWidth = 240;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Image width={48} height={48} src={"/images/logo.png"} alt="logo" />
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/"
            sx={{ gap: "12px", alignItems: "center" }}
          >
            <Image
              width={24}
              height={24}
              src="/images/icons/dashboard-icon.png"
              alt="dashboard icon"
            />
            <ListItemText primary="Dashboard" sx={{ fontSize: "14px" }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            href="/onboarding"
            sx={{ gap: "12px", alignItems: "center" }}
          >
            <Image
              width={24}
              height={24}
              src="/images/icons/onbording-icon.png"
              alt="onbording icon"
            />
            <ListItemText primary="Onboarding" sx={{ fontSize: "14px" }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
