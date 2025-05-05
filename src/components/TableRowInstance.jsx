import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteDialog from "./DeleteDialog";
import { useState } from "react";
import AddOrUpdateDialog from "./AddOrUpdateDialog";
import { Collapse, Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";

export default function TableRowInstance({
  todo,
  onToggleCompletionClick,
  onTodoDeletion,
  onTodoUpdating,
}) {
  // State:
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [openCollapse, setOpenCollapse] = useState(false);
  const [anchor, setAnchor] = useState(null);

  // handlers:
  function handleDeleteConfirmation(confirmDeletion) {
    if (confirmDeletion) onTodoDeletion(todo.id);
    setOpenDeleteDialog(false);
  }

  return (
    <>
      <TableRow>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenCollapse(!openCollapse)}
          >
            {openCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{`${todo.id}`.substring(2)}</TableCell>
        <TableCell align="center">{todo.name}</TableCell>

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
                color: todo.isCompleted ? "#328E6E" : "#DBDBDB",
              }}
            />
          </IconButton>
        </TableCell>

        <TableCell align="center">
          <IconButton
            onClick={(event) => setAnchor(event.currentTarget)}
            variant="text"
            sx={{ color: "#3D90D7" }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={() => setAnchor(null)}
          >
            <MenuItem onClick={() => setOpenUpdateDialog(true)}>
              <EditIcon
                sx={{
                  width: "25px",
                  height: "25px",
                  color: "#3D90D7",
                  marginRight: "5px",
                }}
              />
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenDeleteDialog(true);
              }}
            >
              <DeleteIcon
                sx={{
                  width: "25px",
                  height: "25px",
                  color: "#F7374F",
                  marginRight: "5px",
                }}
              />
              Delete
            </MenuItem>
          </Menu>
        </TableCell>

        <DeleteDialog
          taskName={todo.name}
          isOpened={openDeleteDialog}
          handleDeleteConfirmation={handleDeleteConfirmation}
        />

        <AddOrUpdateDialog
          todo={todo}
          openDialog={openUpdateDialog}
          closeDialog={() => setOpenUpdateDialog(false)}
          handleSubmission={onTodoUpdating}
        />
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openCollapse} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                variant="body2"
                component={"p"}
                fontFamily={"poppins"}
              >
                Task Details: {todo.description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
