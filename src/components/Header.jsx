import { Typography } from "@mui/material";

export default function Header() {
  return (
    <header
      style={{
        height: "25dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontWeight: "600",
          fontSize: { xs: "3rem", md: "5rem" },
        }}
        variant="h2"
        component={"h1"}
        fontFamily={"Poppins"}
      >
        Noted
      </Typography>
      <Typography
        fontFamily={"Poppins"}
        variant="subtitle1"
        component={"p"}
        sx={{
          fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
        }}
      >
        Capture ideas, Track tasks, Master your day.
      </Typography>
    </header>
  );
}
