import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

// TODO: is Cleaned => True

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
  

  // handlers
  function handleTaskNameChange(event) {
    setTodoData({ ...todoData, name: event.target.value });
  }

  function handleTaskDescriptionChange(event) {
    setTodoData({ ...todoData, description: event.target.value });
  }

  // utility:
  function reset() {
    setTodoData({
      name: "",
      description: "",
    });
    closeDialog();
  }

  // Fields => All Fields Specs here located...
  let fields = [
    {
      id: 1,
      autoFocused: true,
      isRequired: true,
      marginType: "dense",
      label: "Task Name",
      type: "text",
      isMultiLined: false,
      variant: "standard",
      value: todoData.name,
      onChangeHandler: handleTaskNameChange,
      fullWidth: true,
    },
    {
      id: 2,
      autoFocused: false,
      isRequired: true,
      marginType: "dense",
      label: "Task Description",
      type: "text",
      isMultiLined: true,
      variant: "standard",
      value: todoData.description,
      onChangeHandler: handleTaskDescriptionChange,
      fullWidth: true,
    },
  ];

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={closeDialog}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              if (todo === undefined)
                handleSubmission(todoData); // Adding Process
              else handleSubmission(todo.id, todoData); // Updating Process
              reset();
            },
          },
        }}
      >
        {/* Tilte */}
        <DialogTitle>
          {todo === undefined ? "Add New Task" : "Update Task"}
        </DialogTitle>

        {/* Content */}
        <DialogContent>
          {fields.map((textField) => {
            return (
              <TextField
                key={textField.id}
                autoFocus={textField.autoFocused}
                required={textField.isRequired}
                margin={textField.marginType}
                label={textField.label}
                type={textField.type}
                multiline={textField.isMultiLined}
                variant={textField.variant}
                value={textField.value}
                onChange={textField.onChangeHandler}
                fullWidth={textField.fullWidth}
              ></TextField>
            );
          })}
        </DialogContent>

        {/* Actions */}
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
            disabled={
              todoData.name.trim() === "" || todoData.description.trim() === ""
            }
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
    </>
  );
}
