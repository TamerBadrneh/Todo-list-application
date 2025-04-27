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
              color: "black",
              borderColor: "gray",
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
              color: "white",
              backgroundColor: "red",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
