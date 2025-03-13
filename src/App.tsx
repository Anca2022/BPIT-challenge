import { Route, Routes } from "react-router-dom";
import NavbarComponent from "./components/navbar/navbarComponent/NavbarComponent";
import Home from "./pages/otherPages/Home";
import Transactions from "./pages/transactions/Transactions";
import Budgets from "./pages/otherPages/Budgets";
import Bills from "./pages/otherPages/Bills";
import Pots from "./pages/otherPages/Pots";
import "./App.scss";

function App() {
  return (
    <div className="app">
      <NavbarComponent />
      <div className="pages">
        <Routes>
          <Route path="/" element={<Transactions />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/budgets" element={<Budgets />}></Route>
          <Route path="/bills" element={<Bills />}></Route>
          <Route path="/pots" element={<Pots />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
