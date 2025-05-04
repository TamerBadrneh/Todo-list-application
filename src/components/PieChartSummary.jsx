import { Stack } from "@mui/material";
import Chart from "react-apexcharts";

export default function PieChartSummary({ completed, inCompleted }) {
  let totalTodos = completed + inCompleted;
  const CHART_OPTIONS = {
    series: [
      Math.round((completed / totalTodos) * 100),
      Math.round((inCompleted / totalTodos) * 100),
    ],
    options: {
      chart: {
        type: "pie",
        selection: {
          enabled: false,
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
