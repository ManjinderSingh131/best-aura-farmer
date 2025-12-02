import "./App.css";
import { Routes } from "react-router-dom";
import { routes } from "./routes/routes";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Routes>{routes}</Routes>
      <Toaster />
    </>
  );
}

export default App;
