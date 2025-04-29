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
      <Box
        sx={{
          width: { xs: "35px", md: "65px" },
          height: { xs: "35px", md: "65px" },
        }}
      >
        <img
          style={{
            maxWidth: "100%",
            height: "100%",
          }}
          src="/src/assets/icons/no-task.png"
          alt="No task available..."
        />
      </Box>
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
