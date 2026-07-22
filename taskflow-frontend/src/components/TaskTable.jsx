import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TableSortLabel,
  Typography,
} from "@mui/material";
import TaskTableRow from "./TaskTableRow";

export default function TaskTable({
  tasks,
  onEditClick,
  onDeleteClick,
  onRowClick,
  sortBy,
  sortOrder,
  onSortChange,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortRequest = (property) => {
    const isAsc = sortBy === property && sortOrder === "ASC";
    const nextOrder = isAsc ? "DESC" : "ASC";
    onSortChange(property, nextOrder);
  };

  // Slice tasks for client-side pagination
  const paginatedTasks = tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (tasks.length === 0) {
    return (
      <Paper
        sx={{
          p: 6,
          textAlign: "center",
          backgroundColor: "background.paper",
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <Typography variant="h6" color="text.secondary" fontWeight={500}>
          No tasks found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Create a task or adjust your search filter to get started.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        backgroundColor: "background.paper",
      }}
    >
      <TableContainer sx={{ overflowX: "auto" }}>
        <Table sx={{ minWidth: { xs: "100%", md: 650 } }} aria-label="task management table">
          <TableHead sx={{ backgroundColor: (theme) => theme.palette.mode === "light" ? "#f8fafc" : "#1e293b" }}>
            <TableRow>
              {/* Title Sortable */}
              <TableCell>
                <TableSortLabel
                  active={sortBy === "title"}
                  direction={sortBy === "title" ? sortOrder.toLowerCase() : "asc"}
                  onClick={() => handleSortRequest("title")}
                  sx={{ fontWeight: 700, fontSize: "0.875rem" }}
                >
                  Title
                </TableSortLabel>
              </TableCell>

              {/* Description */}
              <TableCell sx={{ fontWeight: 700, fontSize: "0.875rem", display: { xs: "none", md: "table-cell" } }}>
                Description
              </TableCell>

              {/* Priority */}
              <TableCell sx={{ fontWeight: 700, fontSize: "0.875rem", display: { xs: "none", sm: "table-cell" } }}>
                Priority
              </TableCell>

              {/* Status */}
              <TableCell sx={{ fontWeight: 700, fontSize: "0.875rem" }}>
                Status
              </TableCell>

              {/* Due Date Sortable */}
              <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                <TableSortLabel
                  active={sortBy === "dueDate"}
                  direction={sortBy === "dueDate" ? sortOrder.toLowerCase() : "asc"}
                  onClick={() => handleSortRequest("dueDate")}
                  sx={{ fontWeight: 700, fontSize: "0.875rem" }}
                >
                  Due Date
                </TableSortLabel>
              </TableCell>

              {/* Actions */}
              <TableCell align="right" sx={{ fontWeight: 700, fontSize: "0.875rem", pr: 3 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTasks.map((task) => (
              <TaskTableRow
                key={task.id}
                task={task}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
                onRowClick={onRowClick}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ borderTop: "1px solid", borderColor: "divider" }}
      />
    </Paper>
  );
}
