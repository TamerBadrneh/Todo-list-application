import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  IconButton,
  Menu,
  MenuItem,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Collapse, Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";

// TODO: is Cleaned => True

export default function TableRowInstance({
  todo,
  onToggleCompletionClick,
  onOpenUpdateDialog,
  onOpenDeleteDialog,
}) {
  // State:
  const [openCollapse, setOpenCollapse] = useState(false);
  const [anchor, setAnchor] = useState(null);

  // menuItems:
  let menuItems = [
    // Update
    {
      id: 1,
      onClickHandler: () => onOpenUpdateDialog(),
      children: (
        <>
          <EditIcon
            sx={{
              width: "25px",
              height: "25px",
              color: "#3D90D7",
              marginRight: "5px",
            }}
          />
          Edit
        </>
      ),
    },
    // Delete
    {
      id: 2,
      onClickHandler: () => onOpenDeleteDialog(),
      children: (
        <>
          <DeleteIcon
            sx={{
              width: "25px",
              height: "25px",
              color: "#F7374F",
              marginRight: "5px",
            }}
          />
          Delete
        </>
      ),
    },
  ];

  // cells:
  let cells = [
    // Collapse Icon
    {
      id: 1,
      align: "center",
      children: (
        <>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenCollapse(!openCollapse)}
          >
            {openCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </>
      ),
    },
    // Todo Id
    {
      id: 2,
      align: "center",
      children: <>{`${todo.id}`.substring(2)}</>,
    },
    // Name
    {
      id: 3,
      align: "center",
      children: <>{todo.name}</>,
    },
    // Completed
    {
      id: 4,
      align: "center",
      children: (
        <>
          <Tooltip title={todo.isCompleted ? "Completed" : "Incompleted"}>
            <IconButton onClick={() => onToggleCompletionClick(todo.id)}>
              <CheckCircleOutlineIcon
                sx={{
                  width: "25px",
                  height: "25px",
                  color: todo.isCompleted ? "#328E6E" : "#DBDBDB",
                }}
              />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
    // Menu
    {
      id: 5,
      align: "center",
      children: (
        <>
          <Tooltip title="Actions">
            <IconButton
              onClick={(event) => setAnchor(event.currentTarget)}
              variant="text"
              sx={{ color: "#3D90D7" }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>

          {/* Menu */}
          <Menu
            anchorEl={anchor}
            open={Boolean(anchor)}
            onClose={() => setAnchor(null)}
          >
            {menuItems.map((item) => {
              return (
                <MenuItem key={item.id} onClick={item.onClickHandler}>
                  {item.children}
                </MenuItem>
              );
            })}
          </Menu>
        </>
      ),
    },
  ];

  return (
    <>
      <TableRow>
        {cells.map((cell) => {
          return (
            <TableCell key={cell.id} align={cell.align}>
              {cell.children}
            </TableCell>
          );
        })}
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
