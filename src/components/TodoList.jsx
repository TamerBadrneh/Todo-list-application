import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import LinearProgressWithLabel from "./LinearProgressBar";
import fileDownload from "js-file-download";

import TableRowInstance from "./TableRowInstance";
import {
  Button,
  IconButton,
  Snackbar,
  Stack,
  TableSortLabel,
  Typography,
} from "@mui/material";
import AddOrUpdateDialog from "./AddOrUpdateDialog";
import Controls from "./Controls";

export default function TodoList() {
  // States
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: "",
  });

  // Handlers:
  // CREATE
  function handleAddingNewTodo(todo) {
    let newTodo = {
      ...todo,
      id: Date.now(),
      isCompleted: false,
    };

    let newTodoList = [...todos, newTodo];

    setTodos(newTodoList);
    localStorage.setItem("todos", JSON.stringify(newTodoList));
    setOpenSnackbar({
      open: true,
      message: `You have added ${todo.name} successfully...`,
    });
  }

  // UPDATE
  function handleUpdatingTodo(id, todoData) {
    let newTodoList = todos.map((todo) => {
      if (todo.id === id) {
        setOpenSnackbar({
          open: true,
          message: `${todo.name} has successfully updated...`,
        });
        return { ...todo, ...todoData };
      }
      return todo;
    });

    setTodos(newTodoList);

    localStorage.setItem("todos", JSON.stringify(newTodoList));
  }

  // UPDATE
  function toggleTodoCompletion(id) {
    let newTodoList = todos.map((todo) => {
      if (id === todo.id) {
        if (!todo.isCompleted)
          setOpenSnackbar({
            open: true,
            message: `TODO: ${todo.name}, is completed...`,
          });

        return { ...todo, isCompleted: !todo.isCompleted };
      }

      return todo;
    });

    setTodos(newTodoList);

    localStorage.setItem("todos", JSON.stringify(newTodoList));
  }

  // DELETE
  function deleteTodo(id) {
    let todoName = "";
    let newTodoList = todos.filter((todo) => {
      if (id === todo.id) {
        todoName = todo.name;
        return false;
      }
      return true;
    });
    setTodos(newTodoList);
    setOpenSnackbar({
      open: true,
      message: `TODO: ${todoName}, has successfully deleted...`,
    });
    localStorage.setItem("todos", JSON.stringify(newTodoList));
  }

  // Dialog Utils:
  function closeAddTaskDialog() {
    setOpenAddTaskDialog(false);
  }

  // Exporting Utils:
  function exportAsJSON() {
    const jsonString = JSON.stringify(todos, null, 2);
    fileDownload(jsonString, "tasks.json");
  }

  // Sorting:
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const headCells = [
    {
      id: "id",
      numeric: true,
      label: "Task Number",
    },
    {
      id: "name",
      numeric: false,
      label: "Task Name",
    },
    {
      id: "description",
      numeric: false,
      label: "Task Description",
    },
    {
      id: "isCompleted",
      numeric: false,
      label: "Completed",
    },
  ];

  function createSortHandler(property) {
    return () => {
      const isAscending = orderBy === property && order === "asc";
      setOrder(isAscending ? "desc" : "asc");
      setOrderBy(property);

      let sortedTodos = [...todos].sort((a, b) => {
        const aValue = ["name", "description"].includes(property)
          ? a[property].toUpperCase()
          : a[property];
        const bValue = ["name", "description"].includes(property)
          ? b[property].toUpperCase()
          : b[property];

        if (aValue < bValue) return isAscending ? 1 : -1;
        if (aValue > bValue) return isAscending ? -1 : 1;
        return 0;
      });

      setTodos(sortedTodos);
    };
  }

  // READ || Render
  return (
    <>
      {todos.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="todo list table">
              {/* == Table Headers == */}
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align="center"
                      sortDirection={orderBy === headCell.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : "asc"}
                        onClick={createSortHandler(headCell.id)}
                      >
                        {headCell.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              {/* == Table Headers == */}

              <TableBody>
                {/* == Table Rows == */}
                {todos.map((todo) => (
                  <TableRowInstance
                    key={todo.id}
                    todo={todo}
                    onToggleCompletionClick={toggleTodoCompletion}
                    onTodoDeletion={deleteTodo}
                    onTodoUpdating={handleUpdatingTodo}
                  />
                ))}
                {/* == Table Rows == */}
              </TableBody>
            </Table>
          </TableContainer>
          <section style={{ marginBlock: "15px" }}>
            <LinearProgressWithLabel
              value={todos.filter((todo) => todo.isCompleted).length}
              todos={todos.length}
            />
          </section>
        </>
      ) : (
        <Typography
          sx={{
            marginTop: "50px",
          }}
          variant="subtitle1"
          component={"h2"}
          gutterBottom
          fontWeight={"bold"}
          textAlign={"center"}
        >
          No Tasks Available
        </Typography>
      )}

      {/* Controls */}
      <Controls
        onAddTaskIconClick={() => setOpenAddTaskDialog(true)}
        onExportAsJSONClick={exportAsJSON}
      />

      {/* == Add Task Dialog == */}
      <AddOrUpdateDialog
        openDialog={openAddTaskDialog}
        handleSubmission={handleAddingNewTodo}
        closeDialog={closeAddTaskDialog}
      />

      {/* == Snackbar == */}
      <Snackbar
        open={openSnackbar.open}
        onClose={() => {
          setOpenSnackbar({
            open: false,
            message: "",
          });
        }}
        autoHideDuration={2000}
        message={openSnackbar.message}
      />
    </>
  );
}
