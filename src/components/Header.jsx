import { Typography } from "@mui/material";
import { Children } from "react";

// TODO: is Cleaned => True

export default function Header() {
  let headerTexts = [
    {
      id: 1,
      style: {
        fontWeight: "600",
        fontSize: { xs: "3rem", md: "5rem" },
      },
      variant: "h2",
      component: "h1",
      fontFamily: "Poppins",
      children: "Noted",
    },
    {
      id: 2,
      style: {
        fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
      },
      variant: "subtitle1",
      component: "p",
      fontFamily: "Poppins",
      children: "Capture ideas, Track tasks, Master your day.",
    },
  ];

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
      {headerTexts.map((headerText) => {
        return (
          <Typography
            key={headerText.id}
            sx={headerText.style}
            variant={headerText.variant}
            component={headerText.component}
            fontFamily={headerText.fontFamily}
          >
            {headerText.children}
          </Typography>
        );
      })}
    </header>
  );
}
