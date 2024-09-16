import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BlogListPage } from "./pages/BlogListPage";
import { Login } from "./pages/LoginPage";
import { BlogEditPage } from "./pages/BlogEditPage";

function App() {
  

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs/:id" element={<BlogEditPage />} />
          <Route path="/blogs" element={<BlogListPage />} />
        </Routes>
      </Router>{" "}
      {/* {isToastComponentActive && (
        <ToastCompnent
          message="Login successfull"
          duration={2000}
          type="success"
        />
      )} */}
    </div>
  );
}

export default App;
