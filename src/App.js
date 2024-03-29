import Header from "./widgets/Header";
import Footer from "./widgets/Footer";
import Sidebar from "./widgets/Sidebar";
import NotFound from "./widgets/NotFound";
import Home from "./pages/Home";
import FeedBack from "./pages/FeedBack";
import Menu from "./pages/Menu";
import Bills from "./pages/Bills";
import Managers from "./pages/users/Managers";
import Waiters from "./pages/users/Waiters";
import Chefs from "./pages/users/Chefs";
import Customers from "./pages/users/Customers";
import Details from "./pages/tables/Details";
import Bookings from "./pages/tables/Bookings";
import Past from "./pages/orders/Past";
import Present from "./pages/orders/Present";
// import Future from "./pages/orders/Future";
import { Routes, Route } from "react-router-dom";
import { useLayoutEffect } from "react";
import axios from "axios";
import MenuItem from "./forms/MenuItem";
// import BillsForm from "./forms/BillsForm";
import RestUser from "./forms/RestUser";
import CustomerForm from "./forms/CustomerForm";
import TableForm from "./forms/TableForm";
import GenretedBill from "./widgets/GenretedBill";
import ContectUs from "./pages/ContectUs";
import SignIn from "./pages/auth/SignIn";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { context } from "./AppState";
import Kitchen from "./pages/Kitchen";
import ItemOrders from "./pages/orders/ItemOrders";

function App() {
  const { appData, Dispatch } = useContext(context);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    axios.defaults.baseURL = "http://localhost:8080";
    if (!appData.auth) {
      const id = localStorage.getItem("id");
      console.log(id);
      if (!id) return navigate("/signin");
      (async () => {
        const res = await axios.get("/employee/" + id);
        console.log(res);
        if (!res?.data) return navigate("signin");
        Dispatch({ type: "setAuth", payload: res?.data[0] });
      })();
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" class="main">
        <Routes>
          {/* pages */}
          <Route path="/" element={<Home />} />
          <Route path="/bills" element={<Bills />} />
          <Route path="/bill/:id" element={<GenretedBill />} />
          <Route path="/users_managers" element={<Managers />} />
          <Route path="/users_waiters" element={<Waiters />} />
          <Route path="/users_chefs" element={<Chefs />} />
          <Route path="/users_customers" element={<Customers />} />
          <Route path="/table_details" element={<Details />} />
          <Route path="/table_bookings" element={<Bookings />} />
          <Route path="/orders_past" element={<Past />} />
          <Route path="/orders_current" element={<Present />} />
          <Route path="/feedback" element={<FeedBack />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/contact_us" element={<ContectUs />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/itemorders" element={<ItemOrders />} />

          {/* forms */}
          <Route path="/menuitem" element={<MenuItem />} />
          <Route path="/menuitem/:id" element={<MenuItem />} />
          {/* <Route path="/bills/:id" element={<BillsForm />} /> */}
          <Route path="/customer" element={<CustomerForm />} />
          <Route path="/customer/:id" element={<CustomerForm />} />
          <Route path="/user/:role/" element={<RestUser />} />
          <Route path="/user/:role/:id" element={<RestUser />} />
          <Route path="/table" element={<TableForm />} />
          <Route path="/table/:id" element={<TableForm />} />

          {/* auth */}
          <Route path="/signin" element={<SignIn />} />

          {/*  */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
