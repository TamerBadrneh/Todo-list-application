import { Button, Stack } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AddTaskIcon from "@mui/icons-material/AddTask";

export default function Controls({
  onAddTaskIconClick,
  onExportAsJSONClick,
  noOfTodos,
}) {
  return (
    <Stack
      direction={"row"}
      marginBottom={"50px"}
      gap={"10px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {/* Add Task */}
      <Button
        variant="contained"
        aria-label="Add Task"
        onClick={onAddTaskIconClick}
        title="Add new task"
        sx={{
          backgroundColor: "#328E6E",
          textTransform: "none",
        }}
      >
        <AddTaskIcon
          style={{
            width: "20px",
            height: "20px",
            marginRight: "5px",
          }}
        />
        {" Add New Task"}
      </Button>

      {/* Save as Excel */}
      <Button
        disabled={noOfTodos === 0}
        variant="contained"
        aria-label="download as excel"
        style={{
          backgroundColor: "#3D90D7",
          textTransform: "none",
        }}
        onClick={onExportAsJSONClick}
        title="export as json"
      >
        <DownloadIcon
          style={{
            width: "20px",
            height: "20px",
            marginRight: "5px",
          }}
        />
        {" Export Excel"}
      </Button>
    </Stack>
  );
}
