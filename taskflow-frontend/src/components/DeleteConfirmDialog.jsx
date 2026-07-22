import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

export default function DeleteConfirmDialog({ open, onClose, onConfirm, title = "Delete Task" }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ fontWeight: 700 }}>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to permanently delete this task? This action cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
        <Button onClick={onClose} variant="outlined" color="inherit" sx={{ borderRadius: 2 }}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="contained" color="error" sx={{ borderRadius: 2 }}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
