import { Box, LinearProgress, Typography } from "@mui/material";

export default function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          variant="determinate"
          value={(props.value / props.todos) * 100}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {`${Math.round((props.value / props.todos) * 100)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
