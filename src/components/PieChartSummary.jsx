import { Stack } from "@mui/material";
import Chart from "react-apexcharts";

// TODO: is Cleaned => True

export default function PieChartSummary({
  completed,
  inCompleted,
  onTodosFilterChange,
}) {
  const CHART_OPTIONS = {
    //  The data we will represent is the series...
    series: [
      Math.round((completed / (completed + inCompleted)) * 100),
      Math.round((inCompleted / (completed + inCompleted)) * 100),
    ],

    // Configurations...
    options: {
      chart: {
        type: "pie",
        events: {
          dataPointSelection: (event, chartContext, config) =>
            onTodosFilterChange(
              config.dataPointIndex === 0 ? "completed" : "incompleted"
            ),
        },
      },
      labels: ["Completed", "In-Completed"],
      legend: {
        position: "bottom",
        inverseOrder: true,
      },
      colors: ["#328E6E", "#F7374F"],
    },
  };
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      sx={{
        marginBlock: "20px",
      }}
    >
      <Chart
        options={CHART_OPTIONS.options}
        series={CHART_OPTIONS.series}
        type="pie"
        width="350"
      />
    </Stack>
  );
}
