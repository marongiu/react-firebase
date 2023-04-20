import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./screen/Home";
import SignUp from "./components/auth/SignUp";
import Header from "./components/ui/Header";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <TodoProvider>
                <Home />
              </TodoProvider>
            }
          />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
