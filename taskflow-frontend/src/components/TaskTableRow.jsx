import { TableRow, TableCell, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TaskTableRow({ task, onEditClick, onDeleteClick }) {
  // Helper to format priority color palette
  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "HIGH":
        return { color: "#991b1b", backgroundColor: "#ffe4e6" };
      case "MEDIUM":
        return { color: "#854d0e", backgroundColor: "#fef9c3" };
      case "LOW":
      default:
        return { color: "#166534", backgroundColor: "#f0fdf4" };
    }
  };

  // Helper to format status color palette
  const getStatusStyle = (status) => {
    switch (status) {
      case "COMPLETED":
        return { color: "#15803d", backgroundColor: "#dcfce7" };
      case "IN_PROGRESS":
        return { color: "#1d4ed8", backgroundColor: "#dbeafe" };
      case "PENDING":
      default:
        return { color: "#b45309", backgroundColor: "#fef3c7" };
    }
  };

  // Format status text
  const formatStatusText = (status) => {
    if (!status) return "";
    return status.replace("_", " ");
  };

  return (
    <TableRow
      hover
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        transition: "background-color 0.2s ease",
      }}
    >
      {/* Title */}
      <TableCell component="th" scope="row" sx={{ py: 2 }}>
        <Typography variant="subtitle2" fontWeight={600} color="text.primary">
          {task.title}
        </Typography>
      </TableCell>

      {/* Description */}
      <TableCell sx={{ py: 2, maxWidth: 250, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: { xs: "none", md: "table-cell" } }}>
        <Typography variant="body2" color="text.secondary" noWrap>
          {task.description || "-"}
        </Typography>
      </TableCell>

      {/* Priority */}
      <TableCell sx={{ py: 2, display: { xs: "none", sm: "table-cell" } }}>
        <Chip
          label={task.priority}
          size="small"
          sx={{
            fontWeight: 700,
            fontSize: "0.75rem",
            ...getPriorityStyle(task.priority),
            borderRadius: "6px",
          }}
        />
      </TableCell>

      {/* Status */}
      <TableCell sx={{ py: 2 }}>
        <Chip
          label={formatStatusText(task.status)}
          size="small"
          sx={{
            fontWeight: 700,
            fontSize: "0.75rem",
            ...getStatusStyle(task.status),
            borderRadius: "6px",
          }}
        />
      </TableCell>

      {/* Due Date */}
      <TableCell sx={{ py: 2, display: { xs: "none", sm: "table-cell" } }}>
        <Typography variant="body2" color="text.primary" fontWeight={500}>
          {task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : "-"}
        </Typography>
      </TableCell>

      {/* Actions */}
      <TableCell align="right" sx={{ py: 1 }}>
        <Tooltip title="Edit Task">
          <IconButton onClick={() => onEditClick(task)} size="small" color="primary" sx={{ mr: 1 }}>
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Task">
          <IconButton onClick={() => onDeleteClick(task.id)} size="small" color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
