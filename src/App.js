import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";
import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";
import { Toaster } from "./components/ghcomponents/Loader";
import { userRole } from "./components/constants/commonString";

const LoginPage = lazy(() => import("./components/login/Login"));
const Register = lazy(() => import("./components/user/accountReg"));
const ForgotPassword = lazy(() => import("./components/login/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/login/reset"));

const NoFoundComponent = lazy(() =>
  import("./components/pages/noFoundComponent")
);
const Dashboard = lazy(() => import("./components/Dashboard"));
const AdminDashboard = lazy(() => import("./components/admin/dashboard"));
const AccountSetup = lazy(() => import("./components/user/accountReg"));

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchRole = localStorage.getItem("role");
    setIsAuthenticated(Boolean(token));
    setRole(fetchRole);
  }, []);

  return (
    <Router>
      <Toaster />
      <Suspense fallback={<CircularProgress />}>
        <Routes>
          <Route path="*" element={<NoFoundComponent />} />
          <Route
            exact
            path="/login"
            element={
              <LoginPage
                setIsAuthenticated={setIsAuthenticated}
                setRole={setRole}
              />
            }
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route exact path="/account-setup" element={<AccountSetup />} />
          <Route exact path="/reset" element={<ResetPassword />} />

          <Route
            exact
            path="/"
            element={
              <PrivateRoute
                isAuthenticated={role === userRole.EMPLOYEE && isAuthenticated}
              />
            }
          >
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute
                isAuthenticated={role === userRole.ADMIN && isAuthenticated}
              />
            }
          >
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
