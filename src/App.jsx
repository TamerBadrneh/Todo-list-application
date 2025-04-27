import { Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <>
      <Container maxWidth="md">
        {/* == Heading == */}
        <Typography
          sx={{
            marginTop: "50px",
          }}
          variant="h2"
          component={"h1"}
          gutterBottom
          fontWeight="bold"
          fontStyle={"italic"}
          textAlign={"center"}
        >
          My Tasks
        </Typography>
        {/* == Heading == */}

        {/* == Todo List == */}
        <TodoList />
        {/* == Todo List == */}
      </Container>
    </>
  );
}
