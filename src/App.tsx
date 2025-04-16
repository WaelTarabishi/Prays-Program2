import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./component/home";
import Login from "./component/login";

// Create a QueryClient instance

function App() {
  const queryClient = new QueryClient();
  const token = Cookies.get("prayerTimeIdlebTimeAdminToken");
  const navigate = useNavigate();
  console.log(token);
  if (!token) {
    navigate("/login");
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </QueryClientProvider>
      <Toaster />
    </>
  );
}

export default App;
