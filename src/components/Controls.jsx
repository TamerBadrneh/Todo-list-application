import { IconButton, Stack } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AddTaskIcon from "@mui/icons-material/AddTask";

export default function Controls({ onAddTaskIconClick, onExportAsJSONClick }) {
  return (
    <Stack
      direction={"row"}
      sx={{
        marginBlock: "30px",
      }}
      gap={"10px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {/* Add Task */}
      <IconButton
        aria-label="Add Task"
        style={{
          color: "green",
        }}
        onClick={onAddTaskIconClick}
        title="Add new task"
      >
        <AddTaskIcon
          style={{
            width: "30px",
            height: "30px",
          }}
        />
      </IconButton>

      {/* Save as JSON */}
      <IconButton
        aria-label="download as json"
        style={{
          color: "blue",
        }}
        onClick={onExportAsJSONClick}
        title="export as json"
      >
        <DownloadIcon
          style={{
            width: "30px",
            height: "30px",
          }}
        />
      </IconButton>
    </Stack>
  );
}
