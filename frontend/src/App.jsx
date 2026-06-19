import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
// import { Sidebar } from "lucide-react";
import  Sidebar  from "./components/Sidebar";
import  Dashboard  from "./pages/Dashboard";
import  Transactions  from "./pages/Transactions";

function App() {
  return (
    <BrowserRouter>
        <Sidebar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/Transactions" element={<Transactions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;