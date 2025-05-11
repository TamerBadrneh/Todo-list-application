import { Button, Stack } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AddTaskIcon from "@mui/icons-material/AddTask";

// TODO: is Cleaned => True

export default function Controls({
  onAddTaskIconClick,
  onExportAsExcelClick,
  noOfTodos,
}) {
  // Components Content => Icons and Text of Each Button located here...
  let btns = [
    {
      id: 1,
      children: (
        <>
          <AddTaskIcon
            style={{
              width: "20px",
              height: "20px",
              marginRight: "5px",
            }}
          />
          {" Add New Task"}
        </>
      ),
      onBtnClick: onAddTaskIconClick,
      ariaLabel: "Add New Task Btn",
      hasDisabledCondition: false,
      disableCondition: null,
      btnStyle: {
        color: "white",
        backgroundColor: "#328E6E",
        textTransform: "none",
      },
    },
    {
      id: 2,
      children: (
        <>
          <DownloadIcon
            style={{
              width: "20px",
              height: "20px",
              marginRight: "5px",
            }}
          />
          {" Export Excel"}
        </>
      ),
      hasDisabledCondition: true,
      onBtnClick: onExportAsExcelClick,
      ariaLabel: "Export As Excel Btn",
      disableCondition: noOfTodos === 0,
      btnStyle: {
        color: "white",
        backgroundColor: noOfTodos === 0 ? "#D9D9D9" : "#3D90D7",
        textTransform: "none",
      },
    },
  ];

  return (
    <Stack
      direction={"row"}
      marginBottom={"50px"}
      gap={"10px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {/* Btns */}
      {btns.map((button) => {
        return (
          <Button
            key={button.id}
            onClick={button.onBtnClick}
            aria-label={button.ariaLabel}
            disabled={
              button.hasDisabledCondition ? button.disableCondition : false
            }
            sx={button.btnStyle}
          >
            {button.children}
          </Button>
        );
      })}
    </Stack>
  );
}
