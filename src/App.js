import { CircularProgress } from "@mui/material";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/routes/PrivateRoute";

const LoginPage = lazy(() => import("./components/login/Login"));
const Register = lazy(() => import("./components/login/Signup"));
const ForgotPassword = lazy(() => import("./components/login/ForgotPassword"));
const NoFoundComponent = lazy(() =>
  import("./components/pages/noFoundComponent")
);
const Dashboard = lazy(() => import("./components/Dashboard"));
const AdminDashboard = lazy(() => import("./components/admin/dashboard"));

const App = () => {
  const isAuthenticated = true;
  const isAdmin = true;

  return (
    <Router>
      <Suspense fallback={<CircularProgress />}>
        <Routes>
          <Route path="*" element={<NoFoundComponent />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route
            exact
            path="/"
            element={
              <PrivateRoute isAuthenticated={!isAdmin && isAuthenticated} />
            }
          >
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute isAuthenticated={isAdmin && isAuthenticated} />
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
