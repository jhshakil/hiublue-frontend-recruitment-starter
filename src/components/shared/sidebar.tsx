"use client";

import { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useTheme } from "@mui/material/styles";

const drawerWidth = 240;

export default function Sidebar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen((prev) => !prev);

  return (
    <>
      {isMobile && (
        <IconButton
          onClick={toggleDrawer}
          sx={{
            position: "fixed",
            top: 16,
            left: 16,
            zIndex: 1300,
            background: "white",
            boxShadow: 1,
          }}
        >
          <Icon icon="mdi:menu" width={24} height={24} />
        </IconButton>
      )}

      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: 1400,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          },
        }}
      >
        {isMobile && (
          <IconButton
            onClick={toggleDrawer}
            sx={{ alignSelf: "flex-end", p: 2 }}
          >
            <Icon icon="mdi:close" width={24} height={24} />
          </IconButton>
        )}

        <Box sx={{ p: 2 }}>
          <Image width={48} height={48} src="/images/logo.png" alt="logo" />
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
                src="/images/icons/onbording-offer-icon.png"
                alt="onboarding icon"
              />
              <ListItemText primary="Onboarding" sx={{ fontSize: "14px" }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
