import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import ReusableForm from "./ReusableForm";
import apiClient from "../api/apiClient";
import { toast } from "react-hot-toast";

const taskValidationSchema = Yup.object().shape({
  title: Yup.string().trim().required("Title is required"),
  description: Yup.string().trim().nullable(),
  priority: Yup.string().oneOf(["LOW", "MEDIUM", "HIGH"]).required("Priority is required"),
  status: Yup.string().oneOf(["PENDING", "IN_PROGRESS", "COMPLETED"]).required("Status is required"),
  dueDate: Yup.string()
    .required("Due date is required")
    .test("not-earlier-than-today", "Due date cannot be earlier than today", (value) => {
      if (!value) return true;
      const selectedDate = new Date(value);
      selectedDate.setHours(0, 0, 0, 0);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return selectedDate >= today;
    }),
});

export default function TaskDialog({ open, onClose, task, onSubmitSuccess }) {
  const isEdit = Boolean(task);

  // Prefill format dates for standard HTML5 date inputs
  const formatInitialDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toISOString().split("T")[0];
  };

  const initialValues = {
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "LOW",
    status: task?.status || "PENDING",
    dueDate: task ? formatInitialDate(task.dueDate) : "",
  };

  const fields = [
    {
      name: "title",
      label: "Task Title",
      type: "text",
      placeholder: "Enter task title...",
      required: true,
      grid: { xs: 12 },
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter task details...",
      rows: 3,
      grid: { xs: 12 },
    },
    {
      name: "priority",
      label: "Priority",
      type: "select",
      required: true,
      options: [
        { value: "LOW", label: "Low" },
        { value: "MEDIUM", label: "Medium" },
        { value: "HIGH", label: "High" },
      ],
      grid: { xs: 12, sm: 6 },
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      required: true,
      options: [
        { value: "PENDING", label: "Pending" },
        { value: "IN_PROGRESS", label: "In Progress" },
        { value: "COMPLETED", label: "Completed" },
      ],
      grid: { xs: 12, sm: 6 },
    },
    {
      name: "dueDate",
      label: "Due Date",
      type: "date",
      required: true,
      grid: { xs: 12 },
    },
  ];

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      let response;
      if (isEdit) {
        response = await apiClient.put(`/tasks/${task.id}`, values);
        toast.success(response.message || "Task updated successfully.");
      } else {
        response = await apiClient.post("/tasks", values);
        toast.success(response.message || "Task created successfully.");
      }
      onSubmitSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please check your inputs.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2, fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {isEdit ? "Edit Task" : "Create Task"}
        <IconButton aria-label="close" onClick={onClose} sx={{ color: (theme) => theme.palette.grey[500] }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ p: 3 }}>
        <ReusableForm
          initialValues={initialValues}
          validationSchema={taskValidationSchema}
          onSubmit={handleSubmit}
          fields={fields}
          submitText={isEdit ? "Save Changes" : "Create Task"}
          onCancel={onClose}
          withPaper={false}
        />
      </DialogContent>
    </Dialog>
  );
}
