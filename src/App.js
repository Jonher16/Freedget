import HeaderNav from "./components/HeaderNav"
import "./App.scss"
import Categorization from "./pages/Categorization";
import ExpenseList from "./pages/ExpenseList";
import Panel from "./pages/Panel";
import { useState } from "react";

function App() {

  const [selection, setselection] = useState()

  const handleClick = (e, option) => {
    e.preventDefault();
    setselection(option)
  }

  return (
    <>
      <HeaderNav onClick={e=>setselection()} />
      {!selection ?
        <Panel onClick={handleClick} />
        : (selection === "Expense List" ? (<ExpenseList />) 
        : (selection === "Categorization" ? (<Categorization />) : "Error"))
    }

    </>
  );
}

export default App;
