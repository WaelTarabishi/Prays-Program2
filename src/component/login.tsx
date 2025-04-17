import { useNavigate } from "react-router-dom";
import { LoginForm } from "./login-form";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);
  //@ts-ignore
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authentication token
    const checkAuth = () => {
      const token = Cookies.get("prayerTimeIdlebTimeAdminToken");
      if (token) {
        setIsAuthenticated(true);
        navigate("/");
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
      <div
        className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50/90 to-amber-100/80 bg-blend-overlay bg-cover bg-center"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundAttachment: "fixed",
        }}>
        {/* <div className="relative mx-auto">
      <div className="mx-auto border-[calc(0.3vw+0.3rem)] border-amber-600 border-t-transparent rounded-full animate-spin w-[calc(3vw+3rem)] h-[calc(3vw+3rem)]" />
      <div className="absolute inset-0 border-[calc(0.15vw+0.15rem)] border-amber-400/30 rounded-full w-[calc(3vw+3rem)] h-[calc(3vw+3rem)]" />
    </div> */}
        <p
          className="mt-8 font-bold text-amber-900 text-right text-[calc(1.8vw+1rem)] drop-shadow-sm"
          style={{
            textShadow: "0 1px 2px rgba(255,255,255,0.5)",
          }}>
          ...جاري تحميل أوقات الصلاة
        </p>
        {/* <div className="mt-4 flex justify-center space-x-1">
          <span
            className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}></span>
          <span
            className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}></span>
          <span
            className="w-2 h-2 bg-amber-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.3s" }}></span>
        </div> */}
      </div>
    );
  }
  return (
    <div className="flex flex-col h-screen bg-amber-100/50">
      <div className="grid h-full    lg:grid-cols-2">
        <div className="relative hidden bg-muted lg:block">
          <img
            src="./mouseq.jpg"
            alt="Image"
            className="absolute inset-0 h-full w-full object-cover "
          />
        </div>
        <div className="flex flex-col gap-4 p-6 md:p-10 ">
          <div className="flex flex-1 items-center justify-center  ">
            <div className="w-full    ">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
