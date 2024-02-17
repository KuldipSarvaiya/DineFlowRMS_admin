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
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLayoutEffect } from "react";
import axios from "axios";
import MenuItem from "./forms/MenuItem";

function App() {
  useLayoutEffect(() => {
    axios.defaults.baseURL = "http://localhost:8080/";
  });
  
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <main id="main" class="main">
        <Routes>
          
          {/* pages */}
          <Route path="/" element={<Home />} />
          <Route path="/bills" element={<Bills />} />
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
          <Route path="*" element={<NotFound />} />

          {/* forms */}
          <Route path="/menuitem" element={<MenuItem />} />
          <Route path="/menuitem/:id" element={<MenuItem />} />

        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
