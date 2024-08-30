import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./components/hooks/useAuthContext";
import Navbar from "./components/Navbar";
import LoginForm from "./client/LoginForm";
import ProductList from "./components/ProductList";
import FetchData from "./components/products/FetchData";
import Footer from "./components/Footer";
import AddUsers from "./admin/AddUsers";
import UserProfile from "./pages/UserProfile";
import Notifications from "./components/reusable/Notifications";
import Forms from "./components/Forms";
import Bill from "./components/Billing/Bill";
import HealthCareInventoryOverview from "./pages/About";
import "./App.css";
import Stocks from "./components/Stocks";

function App() {
  const { user } = useAuthContext();
  console.log("User state:", user);

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={user ? <ProductList /> : <Navigate to="/about" />}
            />
            <Route
              path="/products"
              element={user ? <FetchData /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <LoginForm /> : <Navigate to="/" />}
            />
            <Route
              path="/forms"
              element={user ? <Forms /> : <Navigate to="/login" />}
            />
            <Route
              path="/addusers"
              element={user ? <AddUsers /> : <Navigate to="/" />}
            />
            <Route
              path="/notification"
              element={user ? <Notifications /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={user ? <UserProfile /> : <Navigate to="/login" />}
            />
            {/* <Route path="/billing" element={user ? <Billing/> : <Navigate to="/login" /> }/> */}
            <Route
              path="/billing"
              element={user ? <Bill /> : <Navigate to="/login" />}
            />
            <Route path="/stocks" element={user ? <Stocks /> : <Navigate to="/login" />} />
            <Route
              path="/about"
              element={
                !user ? <HealthCareInventoryOverview /> : <Navigate to="/" />
              }
            />
          </Routes>
          <Footer />
        </Router>
      </main>
    </div>
  );
}

export default App;
