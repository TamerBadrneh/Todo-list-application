import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import TableRowInstance from "./TableRowInstance";
import { Snackbar } from "@mui/material";
import AddOrUpdateDialog from "./AddOrUpdateDialog";
import Controls from "./Controls";
import NoTaskAvailable from "./NoTaskAvailable";
import exportFromJSON from "export-from-json";
import PieChartSummary from "./PieChartSummary";
import TableHeader from "./TableHeader";
import TablePaginationFooter from "./TablePaginationFooter";

export default function TodoList() {
  // States:
  // 1. All Data
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  // 2. Dialogs and Snackbars
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: "",
  });

  // 3. Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // 4. Sorting
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

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
  const paginatedTodos = todos.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
      {/* Controls */}
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
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="todo list table">
              <TableHeader
                order={order}
                orderBy={orderBy}
                onSort={createSortHandler}
              />

              <TableBody>
                {paginatedTodos.map((todo) => (
                  <TableRowInstance
                    key={todo.id}
                    todo={todo}
                    onToggleCompletionClick={toggleTodoCompletion}
                    onTodoDeletion={deleteTodo}
                    onTodoUpdating={handleUpdatingTodo}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePaginationFooter
            todos={todos}
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
