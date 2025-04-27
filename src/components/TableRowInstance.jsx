import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { IconButton, Snackbar, TableCell, TableRow } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "./DeleteDialog";
import { useState } from "react";
import AddOrUpdateDialog from "./AddOrUpdateDialog";

export default function TableRowInstance({
  todo,
  onToggleCompletionClick,
  onTodoDeletion,
  onTodoUpdating,
}) {
  // State:
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  // handlers:
  function closeDeleteDialog() {
    setOpenDeleteDialog(false);
  }

  function closeUpdateDialog() {
    setOpenUpdateDialog(false);
  }

  function handleDeleteConfirmation(confirmDeletion) {
    if (confirmDeletion) onTodoDeletion(todo.id);
    closeDeleteDialog();
  }

  return (
    <>
      <TableRow>
        {/* == Table Columns == */}
        <TableCell align="center">{todo.id}</TableCell>
        <TableCell align="center">{todo.name}</TableCell>
        <TableCell align="center">{todo.description}</TableCell>
        <TableCell align="center">
          <IconButton
            onClick={() => {
              onToggleCompletionClick(todo.id);
            }}
          >
            <CheckCircleOutlineIcon
              sx={{
                width: "25px",
                height: "25px",
                color: todo.isCompleted ? "green" : "gray",
              }}
            />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton onClick={() => setOpenUpdateDialog(true)}>
            <EditIcon
              sx={{
                width: "25px",
                height: "25px",
                color: "blue",
              }}
            />
          </IconButton>
        </TableCell>
        <TableCell align="center">
          <IconButton
            onClick={() => {
              setOpenDeleteDialog(true);
            }}
          >
            <DeleteIcon
              sx={{
                width: "25px",
                height: "25px",
                color: "red",
              }}
            />
          </IconButton>
        </TableCell>
        {/* == Table Columns == */}

        {/* == Delete Task Dialog == */}
        <DeleteDialog
          taskName={todo.name}
          isOpened={openDeleteDialog}
          handleDeleteConfirmation={handleDeleteConfirmation}
        />
        {/* == Delete Task Dialog == */}

        {/* == Update Task Dialog == */}
        <AddOrUpdateDialog
          todo={todo}
          openDialog={openUpdateDialog}
          closeDialog={closeUpdateDialog}
          handleSubmission={onTodoUpdating}
        />
        {/* == Update Task Dialog == */}
      </TableRow>
    </>
  );
}
