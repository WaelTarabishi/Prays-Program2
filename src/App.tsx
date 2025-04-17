import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Home from "./component/home";
import Login from "./component/login";
import Cookies from "js-cookie";
import Dashboard from "./component/dashboard";
import HadithSettings from "./component/hadith-settings";
import IqamehSettings from "./component/iqameh-settings";

function App() {
  const queryClient = new QueryClient();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authentication token
    const checkAuth = () => {
      const token = Cookies.get("prayerTimeIdlebTimeAdminToken");
      if (token) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate("/login");
      }
      setIsLoading(false);
    };

    // Add a small delay to show the loader (optional)
    const timer = setTimeout(() => {
      checkAuth();
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-amber-100/50 bg-cover bg-center">
        <p
          className="mt-8 font-bold text-amber-900 text-right text-[calc(1.8vw+1rem)] drop-shadow-sm"
          style={{
            textShadow: "0 1px 2px rgba(255,255,255,0.5)",
          }}>
          ...جاري تحميل أوقات الصلاة
        </p>
      </div>
    );
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/dashboard">
            <Route index element={<Dashboard />} />
            <Route
              path="/dashboard/hadith-settings"
              element={<HadithSettings />}></Route>
            <Route
              path="/dashboard/iqameh-settings"
              element={<IqamehSettings />}></Route>
          </Route>
        </Routes>
      </QueryClientProvider>
      <Toaster
        toastOptions={{
          style: {
            fontSize: "clamp(1rem, 0.8vw + 0.8rem, 2rem)",
            padding: "clamp(10px, 0.5vw + 10px, 30px)",
            borderRadius: "8px",
          },
        }}
      />
    </>
  );
}

export default App;
