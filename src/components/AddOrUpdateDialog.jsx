import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function AddOrUpdateDialog({
  todo,
  openDialog,
  closeDialog,
  handleSubmission,
}) {
  // State:
  const [todoData, setTodoData] = useState({
    name: todo?.name ?? "",
    description: todo?.description ?? "",
  });
  const [showAddOrUpdateSnackbar, setShowAddOrUpdateSnackbar] = useState(false);

  // handlers
  function handleTaskNameChange(event) {
    setTodoData({ ...todoData, name: event.target.value });
  }

  function handleTaskDescriptionChange(event) {
    setTodoData({ ...todoData, description: event.target.value });
  }

  function handleShowAddOrUpdateSnackbarClose() {
    setShowAddOrUpdateSnackbar(false);
  }

  // utility:
  function reset() {
    setTodoData({
      name: "",
      description: "",
    });
    closeDialog();
  }

  return (
    <>
      {/* Add Task Dialog */}
      <Dialog
        open={openDialog}
        onClose={closeDialog}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              if (todo === undefined) handleSubmission(todoData);
              else handleSubmission(todo.id, todoData);
              setShowAddOrUpdateSnackbar(true);
              reset();
            },
          },
        }}
      >
        <DialogTitle>
          {todo !== undefined ? "Update Task" : "Add New Task"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Task Name"
            type="text"
            fullWidth
            variant="standard"
            value={todoData.name}
            onChange={handleTaskNameChange}
          />
          <TextField
            multiline
            required
            margin="dense"
            label="Task Description"
            type="text"
            fullWidth
            variant="standard"
            value={todoData.description}
            onChange={handleTaskDescriptionChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              color: "#000",
              borderColor: "#DBDBDB",
            }}
            onClick={reset}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={todoData.name === "" || todoData.description === ""}
            sx={{
              textTransform: "none",
              color: "white",
              backgroundColor: "#328E6E",
            }}
            type="submit"
          >
            {todo === undefined ? "Add" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Add Task Dialog */}

      {/* == Add or Update Task Snackbar == */}
      <Snackbar
        open={showAddOrUpdateSnackbar}
        autoHideDuration={1500}
        onClose={handleShowAddOrUpdateSnackbarClose}
        message={
          todo === undefined
            ? "Task Added Successfully"
            : "Task Updated Successfully"
        }
      />
      {/* == Add or Update Task Snackbar == */}
    </>
  );
}
