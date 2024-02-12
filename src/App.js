import Header from "./View/Header";
import Footer from "./View/Footer";
import Sidebar from "./View/Sidebar";
import Demo1 from "./View/Demo1";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLayoutEffect } from "react";
import axios from "axios";
import Students from "./View/Students";
import Account from "./View/Account";
import Book from "./View/Book";
import Branch from "./View/Branch";
import Fees from "./View/Fees";
import Result from "./View/Result";
import Transaction from "./View/Transaction";
import AddAccount from "./View/AddAccount";
import AddBook from "./View/AddBook";
import AddBranch from "./View/AddBranch";
import AddFees from "./View/AddFees";
import AddResult from "./View/AddResult";
import AddTransaction from "./View/AddTransaction";
import AddStudent from "./View/AddStudent";
import DropDown from "./View/DropDown";

function App() {
  useLayoutEffect(() => {
    axios.defaults.baseURL = "http://localhost:1001/";
  });

  const Layout = () => {
    return (
      <>
        <Header />
        <Sidebar />
      </>
    );
  };
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/" element={<Demo1 />} />
        <Route path="/student" element={<Students />} />
        <Route path="/account" element={<Account />} />
        <Route path="/book" element={<Book />} />
        <Route path="/branch" element={<Branch />} />
        <Route path="/fees" element={<Fees />} />
        <Route path="/result" element={<Result />} />
        <Route path="/transaction" element={<Transaction />} />
        {/* add record forms */}
        <Route path="/add_student" element={<AddStudent />} />
        <Route path="/add_account" element={<AddAccount />} />
        <Route path="/add_book" element={<AddBook />} />
        <Route path="/add_branch" element={<AddBranch />} />
        <Route path="/add_fees" element={<AddFees />} />
        <Route path="/add_result" element={<AddResult />} />
        <Route path="/add_transaction" element={<AddTransaction />} />
        {/* add record forms */}
        <Route path="/edit_student/:id" element={<AddStudent />} />
        <Route path="/edit_account/:id" element={<AddAccount />} />
        <Route path="/edit_book/:id" element={<AddBook />} />
        <Route path="/edit_branch/:id" element={<AddBranch />} />
        <Route path="/edit_fees/:id" element={<AddFees />} />
        <Route path="/edit_result/:id" element={<AddResult />} />
        <Route path="/edit_transaction/:id" element={<AddTransaction />} />
        {/* drop down */}
        <Route path="/dropdown" element={<DropDown />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
