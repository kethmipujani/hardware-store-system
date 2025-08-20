import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"; 
import NewSale from "./pages/NewSale";
import Supplier from "./pages/Supplier"; // Importing the Supplier component

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sales/new" element={<NewSale />} />
        <Route path="/suppliers" element={<Supplier />} />
      </Routes>
    </Router>
  );
}

