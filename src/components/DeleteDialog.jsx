import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

// TODO: is Cleaned => True

export default function DeleteDialog({
  isOpened,
  handleDeleteConfirmation,
  taskName,
}) {
  // btns => All handler and data needed located here...
  let btns = [
    {
      id: 1,
      variant: "outlined",
      btnStyle: {
        textTransform: "none",
        color: "#000",
        borderColor: "#DBDBDB",
      },
      onClickHandler: () => handleDeleteConfirmation(false),
      content: "Cancel",
    },
    {
      id: 2,
      variant: "contained",
      btnStyle: {
        textTransform: "none",
        color: "white",
        backgroundColor: "#F7374F",
      },
      onClickHandler: () => handleDeleteConfirmation(true),
      content: "Delete",
    },
  ];

  return (
    <>
      <Dialog
        open={isOpened}
        onClose={() => handleDeleteConfirmation(false)}
        aria-labelledby="deletion dialog"
        aria-describedby="this dialog for todo deletion..."
      >
        {/* Title */}
        <DialogTitle>Confirm Deletion</DialogTitle>

        {/* Message */}
        <DialogContent>
          <DialogContentText>
            Are you sure you wish to delete the task: "{taskName}"?
            <br />
            This action cannot be undone!
          </DialogContentText>
        </DialogContent>

        {/* Actions */}
        <DialogActions>
          {btns.map((button) => {
            return (
              <Button
                key={button.id}
                variant={button.variant}
                sx={button.btnStyle}
                onClick={button.onClickHandler}
              >
                {button.content}
              </Button>
            );
          })}
        </DialogActions>
      </Dialog>
    </>
  );
}
