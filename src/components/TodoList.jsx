import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import TableRowInstance from "./TableRowInstance";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Stack,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddOrUpdateDialog from "./AddOrUpdateDialog";
import Controls from "./Controls";
import NoTaskAvailable from "./NoTaskAvailable";
import exportFromJSON from "export-from-json";
import PieChartSummary from "./PieChartSummary";
import TableHeader from "./TableHeader";
import TablePaginationFooter from "./TablePaginationFooter";
import DeleteDialog from "./DeleteDialog";
import FilterListIcon from "@mui/icons-material/FilterList";

// TODO: is Clean => True

export default function TodoList() {
  // States:
  // 1. All Data
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  // The child "Table Row instance" will send the desired todo for them...
  const [editedTodo, setEditedTodo] = useState(null);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [searchedTodo, setSearchedTodo] = useState("");
  const [todosFilter, setTodosFilter] = useState("all");

  // 2. Dialogs and Snackbars
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: "",
  });
  const [openUpdateTaskDialog, setOpenUpdateTaskDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // 3. Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // 4. Sorting
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  // filtered data:
  function getTodosFiltered() {
    let filteredResults = [];
    if (todosFilter === "all") filteredResults = todos;
    else if (todosFilter === "completed")
      filteredResults = todos.filter((t) => t.isCompleted);
    else filteredResults = todos.filter((t) => !t.isCompleted);

    if (searchedTodo.trim() !== "") {
      filteredResults = filteredResults.filter((t) =>
        t.name.toLowerCase().includes(searchedTodo.toLowerCase())
      );
    }

    return filteredResults;
  }

  // CRUD:
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

  function toggleTodoCompletion(id) {
    let newTodoList = todos.map((todo) => {
      if (id === todo.id) {
        if (!todo.isCompleted)
          setOpenSnackbar({
            open: true,
            message: `Task: ${todo.name}, is completed...`,
          });

        return { ...todo, isCompleted: !todo.isCompleted };
      }

      return todo;
    });

    setTodos(newTodoList);

    localStorage.setItem("todos", JSON.stringify(newTodoList));
  }

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
      message: `Task: ${todoName}, has successfully deleted...`,
    });
    localStorage.setItem("todos", JSON.stringify(newTodoList));
  }

  // Pagination:
  function getPaginatedTodos() {
    return getTodosFiltered().slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }

  // Sorting:
  function createSortHandler(property) {
    return () => {
      const isAscending = orderBy === property && order === "asc";
      setOrder(isAscending ? "desc" : "asc");
      setOrderBy(property);

      let sortedTodos = [...todos].sort((firstValue, secondValue) => {
        const aValue = ["name", "description"].includes(property)
          ? firstValue[property].toUpperCase()
          : firstValue[property];
        const bValue = ["name", "description"].includes(property)
          ? secondValue[property].toUpperCase()
          : secondValue[property];

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
      <Controls
        noOfTodos={todos.length}
        onAddTaskIconClick={() => setOpenAddTaskDialog(true)}
        onExportAsExcelClick={() =>
          exportFromJSON({ data: todos, fileName: "Tasks", exportType: "xls" })
        }
      />

      {todos.length > 0 ? (
        <>
          <PieChartSummary
            completed={todos.filter((t) => t.isCompleted).length}
            inCompleted={todos.filter((t) => !t.isCompleted).length}
            onTodosFilterChange={(value) => setTodosFilter(value)}
          />

          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            gap={"20px"}
            sx={{
              marginBlock: "15px",
            }}
          >
            {/* We can extract this in another table for the sake of simplicity ! */}
            <TextField
              label="Enter Task Name or Id to Search"
              type="search"
              variant="standard"
              value={searchedTodo}
              onChange={(event) => {
                setSearchedTodo(event.target.value);
                // filteredTodos = todos.filter(
                //   (t) =>
                //     t.id.toString().includes(searchedTodo.trim()) ||
                //     t.name
                //       .toString()
                //       .toLowerCase()
                //       .includes(searchedTodo.trim().toLowerCase())
                // );
                setPage(0);
              }}
              sx={{
                width: "80%",
              }}
            />

            <Tooltip title="Select Task Filter">
              <FormControl
                sx={{
                  width: "25%",
                }}
                variant="standard"
              >
                <InputLabel id="demo-simple-select-label">
                  Filter Tasks
                </InputLabel>
                <Select
                  value={todosFilter}
                  label="Filter Tasks"
                  onChange={(event) => setTodosFilter(event.target.value)}
                >
                  <MenuItem value={"all"}>All</MenuItem>
                  <MenuItem value={"completed"}>Completed</MenuItem>
                  <MenuItem value={"incompleted"}>Incompleted</MenuItem>
                </Select>
              </FormControl>
            </Tooltip>
          </Stack>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="todo list table">
              <TableHeader
                order={order}
                orderBy={orderBy}
                onSort={createSortHandler}
              />

              <TableBody>
                {getPaginatedTodos().length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <Typography textAlign={"center"} fontWeight={"500"}>
                        No Task Available
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  getPaginatedTodos().map((todo) => (
                    <TableRowInstance
                      key={todo.id}
                      todo={todo}
                      onOpenUpdateDialog={() => {
                        setEditedTodo(() => todo);
                        setOpenUpdateTaskDialog(true);
                      }}
                      onToggleCompletionClick={toggleTodoCompletion}
                      onOpenDeleteDialog={() => {
                        setTodoToDelete(todo);
                        setOpenDeleteDialog(true);
                      }}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePaginationFooter
            todos={getTodosFiltered()}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </>
      ) : (
        <NoTaskAvailable />
      )}

      <AddOrUpdateDialog
        openDialog={openAddTaskDialog}
        handleSubmission={handleAddingNewTodo}
        closeDialog={() => setOpenAddTaskDialog(false)}
      />

      <AddOrUpdateDialog
        openDialog={openUpdateTaskDialog}
        handleSubmission={handleUpdatingTodo}
        todo={editedTodo}
        closeDialog={() => {
          setOpenUpdateTaskDialog(false);
          setEditedTodo(null);
        }}
      />

      <DeleteDialog
        taskName={todoToDelete?.name}
        isOpened={openDeleteDialog}
        handleDeleteConfirmation={(confirmDeletion) => {
          if (confirmDeletion && todoToDelete) deleteTodo(todoToDelete.id);
          setOpenDeleteDialog(false);
          setTodoToDelete(null);
        }}
      />

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
