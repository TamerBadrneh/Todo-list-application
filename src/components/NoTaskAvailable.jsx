import { Box, Stack, Typography } from "@mui/material";

export default function NoTaskAvailable() {
  return (
    <Stack
      sx={{
        height: "50dvh",
        gap: { xs: "10px", md: "20px" },
      }}
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
    >
     
      <Typography
        fontFamily={"Poppins"}
        variant="subtitle1"
        component={"p"}
        sx={{
          fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
          fontWeight: "500",
        }}
      >
        You're all set! Rest up or plan your next move.
      </Typography>
    </Stack>
  );
}
