import { Paper, Typography, Box, LinearProgress, Divider } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function StatusDistributionPanel({ total, pending, inProgress, completed, overdue }) {
  const getPercentage = (value) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        minHeight: 380,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5, color: "text.primary" }}>
        Status Distribution
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Breakdown of tasks by active lifecycle state.
      </Typography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5, flexGrow: 1, justifyContent: "center" }}>
        {/* Completed Bar */}
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" fontWeight={700} color="text.primary">
              Completed
            </Typography>
            <Typography variant="body2" fontWeight={700} color="success.main">
              {completed} tasks ({getPercentage(completed)}%)
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={getPercentage(completed)}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: (theme) => alpha(theme.palette.success.main, 0.08),
              "& .MuiLinearProgress-bar": {
                backgroundColor: "success.main",
                borderRadius: 5,
              },
            }}
          />
        </Box>

        {/* In Progress Bar */}
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" fontWeight={700} color="text.primary">
              In Progress
            </Typography>
            <Typography variant="body2" fontWeight={700} color="info.main">
              {inProgress} tasks ({getPercentage(inProgress)}%)
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={getPercentage(inProgress)}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: (theme) => alpha(theme.palette.info.main, 0.08),
              "& .MuiLinearProgress-bar": {
                backgroundColor: "info.main",
                borderRadius: 5,
              },
            }}
          />
        </Box>

        {/* Pending Bar */}
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" fontWeight={700} color="text.primary">
              Pending
            </Typography>
            <Typography variant="body2" fontWeight={700} color="warning.main">
              {pending} tasks ({getPercentage(pending)}%)
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={getPercentage(pending)}
            sx={{
              height: 10,
              borderRadius: 5,
              backgroundColor: (theme) => alpha(theme.palette.warning.main, 0.08),
              "& .MuiLinearProgress-bar": {
                backgroundColor: "warning.main",
                borderRadius: 5,
              },
            }}
          />
        </Box>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-around", pt: 1 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" fontWeight={800} color="text.primary">
            {total}
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            Total Volume
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h5" fontWeight={800} color="error.main">
            {overdue}
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={600}>
            Overdue Items
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}
