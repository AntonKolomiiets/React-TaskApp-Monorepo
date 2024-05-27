import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav/Nav.js";
import About from "./pages/About/About.js";
import Dogs from "./pages/Dogs/Dogs.js";
// import TaskApp from "./pages/TaskApp/TaskApp.js";
import TaskApp from "./pages/TaskApp/TaskApp";
import Home from "./pages/Home/Home.js";
import Login from "./pages/Login/Login.js";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute.js"; // Component for cheching is user is Looged
import { AuthProvider } from "./contexts/AuthContext.js"; // Context for for checking if user is logged in

function App() {
  return (
    
      <AuthProvider>
        <Nav />
        <div className="PageComponent">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/dogs" element={<Dogs />} />
              <Route path="/link2" element={<TaskApp />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    
  );
}

export default App;
