import { Container } from "@mui/material";
import TodoList from "./components/TodoList";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Container maxWidth="md">
        {/* == Heading == */}
        <Header />
        {/* == Heading == */}

        {/* == Todo List == */}
        <TodoList />
        {/* == Todo List == */}
      </Container>
    </>
  );
}
