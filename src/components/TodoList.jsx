import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import TableRowInstance from "./TableRowInstance";
import { Snackbar, TableSortLabel } from "@mui/material";
import AddOrUpdateDialog from "./AddOrUpdateDialog";
import Controls from "./Controls";
import NoTaskAvailable from "./NoTaskAvailable";
import exportFromJSON from "export-from-json";
import PieChartSummary from "./PieChartSummary";

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
            message: `Task: ${todo.name}, is completed...`,
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
      message: `Task: ${todoName}, has successfully deleted...`,
    });
    localStorage.setItem("todos", JSON.stringify(newTodoList));
  }

  // Dialog Utils:
  function closeAddTaskDialog() {
    setOpenAddTaskDialog(false);
  }

  // Exporting Utils:
  function exportAsExcel() {
    exportFromJSON({ data: todos, fileName: "Tasks", exportType: "xls" });
  }

  // Pagination:
  // Step 1: Added states for changing the current page and the rows per page "if user selects"
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Slice data based on the current page selected and the rows per page
  // if we have 7 todos and we have selected the 2nd page
  // and each page must contain only 5 then...
  // 1 * 5 => starts from index 5
  // 1 * 5 + 5 => end in 11 (not included as index) "not exist so we end up in the last 2 elements instead"
  const paginatedTodos = todos.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function customLabelDisplayedRows({ from, to, count }) {
    return `${from} - ${to} out of ${count}`;
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
      {/* Controls */}
      <Controls
        noOfTodos={todos.length}
        onAddTaskIconClick={() => setOpenAddTaskDialog(true)}
        onExportAsExcelClick={exportAsExcel}
      />

      {todos.length > 0 ? (
        <>
          <PieChartSummary
            completed={todos.filter((t) => t.isCompleted).length}
            inCompleted={todos.filter((t) => !t.isCompleted).length}
          />
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 550 }} aria-label="todo list table">
              {/* == Table Headers == */}
              <TableHead>
                <TableRow>
                  <TableCell align="center">Details</TableCell>
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
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              {/* == Table Headers == */}

              <TableBody>
                {/* == Table Rows == */}
                {paginatedTodos.map((todo) => (
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
          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={todos.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={customLabelDisplayedRows}
          />
        </>
      ) : (
        <NoTaskAvailable />
      )}

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
