import Registration from "./pages/Registration";
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Navigator from "./components/Navigator";

function App() {
  return (
    // <Router>

    //   <Routes>
    //     <Route path="/" element={<Navigate to="/login" />} />
    //     <Route path="/login" element={<Login />} />
    //     <Route path="/register" element={<Registration />} />
    //     <Route path="/dashboard" element={<Dashboard />} />
    //     {/* <div className="App">
    //         <Registration />
    //       </div> */}
    //   </Routes>
    // </Router>
    <BrowserRouter>
      <Navigator />
    </BrowserRouter>
  );
}

export default App;
