import {
  Box,
  Toolbar,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useColorMode } from "../theme/ThemeContext";

export default function SidebarMenu({ onItemClick }) {
  const location = useLocation();
  const { mode } = useColorMode();
  const user = useSelector((state) => state.auth.user);

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/task-dashboard" },
    { text: "Tasks", icon: <AssignmentIcon />, path: "/task-dashboard/tasks" },
    { text: "Stats", icon: <BarChartIcon />, path: "/task-dashboard/task-stats" },
  ];

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.05em",
            color: "primary.main",
          }}
        >
          TaskFlow
        </Typography>
      </Toolbar>
      <Divider />

        {/* nav list */}
      <List sx={{ flexGrow: 1, px: 2, py: 2 }}>
        {menuItems.map((item) => {
          const isActive =
            item.path === "/task-dashboard"
              ? location.pathname === "/task-dashboard"
              : location.pathname.startsWith(item.path);

          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={onItemClick}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive
                    ? mode === "light"
                      ? "rgba(25, 118, 210, 0.08)"
                      : "rgba(59, 130, 246, 0.16)"
                    : "transparent",
                  color: isActive ? "primary.main" : "text.primary",
                  "&:hover": {
                    backgroundColor: isActive
                      ? mode === "light"
                        ? "rgba(25, 118, 210, 0.12)"
                        : "rgba(59, 130, 246, 0.24)"
                      : mode === "light"
                      ? "rgba(0, 0, 0, 0.04)"
                      : "rgba(255, 255, 255, 0.04)",
                  },
                  "& .MuiListItemIcon-root": {
                    color: isActive ? "primary.main" : "text.secondary",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ fontWeight: isActive ? 600 : 500 }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />
      {/* Sidebar  User Info */}
      {user && (
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {user.name ? user.name[0].toUpperCase() : "U"}
          </Avatar>
          <Box sx={{ overflow: "hidden" }}>
            <Typography variant="subtitle2" noWrap fontWeight={600}>
              {user.name || "User"}
            </Typography>
            <Typography variant="caption" noWrap color="text.secondary" display="block">
              {user.email || "user@company.com"}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}
