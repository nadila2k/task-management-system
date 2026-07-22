import { Box, TextField, MenuItem, Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function TaskFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  priority,
  onPriorityChange,
  onAddTaskClick,
}) {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 2.5 },
        backgroundColor: "background.paper",
        borderRadius: 2,
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        border: "1px solid",
        borderColor: "divider",
        mb: 3,
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          flexGrow={1}
          sx={{ maxWidth: { sm: "80%" } }}
        >
          {/* Search field */}
          <TextField
            label="Search Tasks"
            variant="outlined"
            size="small"
            fullWidth
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title..."
            sx={{ minWidth: { xs: "100%", sm: 200 } }}
          />

          {/* Status filter */}
          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            size="small"
            fullWidth
            sx={{ minWidth: { xs: "100%", sm: 150 } }}
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
            <MenuItem value="COMPLETED">Completed</MenuItem>
          </TextField>

          {/* Priority filter */}
          <TextField
            select
            label="Priority"
            value={priority}
            onChange={(e) => onPriorityChange(e.target.value)}
            size="small"
            fullWidth
            sx={{ minWidth: { xs: "100%", sm: 150 } }}
          >
            <MenuItem value="">All Priorities</MenuItem>
            <MenuItem value="LOW">Low</MenuItem>
            <MenuItem value="MEDIUM">Medium</MenuItem>
            <MenuItem value="HIGH">High</MenuItem>
          </TextField>
        </Stack>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddTaskClick}
          sx={{
            py: 1.2,
            px: 2.5,
            textTransform: "none",
            fontWeight: 600,
            borderRadius: 2,
            alignSelf: { xs: "stretch", sm: "auto" },
          }}
        >
          Add Task
        </Button>
      </Stack>
    </Box>
  );
}
