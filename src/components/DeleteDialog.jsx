import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from "@mui/material";

export default function DeleteDialog({
  isOpened,
  handleDeleteConfirmation,
  taskName,
}) {
  return (
    <>
      <Dialog
        open={isOpened}
        onClose={() => handleDeleteConfirmation(false)}
        aria-labelledby="deletion dialog"
        aria-describedby="this dialog for todo deletion..."
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you wish to delete the task: "{taskName}"?
            <br />
            This action cannot be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleDeleteConfirmation(false)}
            variant="outlined"
            sx={{
              textTransform: "none",
              color: "#000",
              borderColor: "#DBDBDB",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDeleteConfirmation(true);
            }}
            variant="contained"
            sx={{
              textTransform: "none",
              color: "white",
              backgroundColor: "#F7374F",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
