import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  //@ts-ignore
  const [Admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for authentication token
    const checkAuth = () => {
      const token = Cookies.get("role");
      if (token === "admin") {
        setAdmin(true);
      } else {
        setAdmin(false);
        navigate("/");
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100/50 w-full px-[calc(2vw+1rem)] py-12">
      <h1 className="text-center text-amber-900 text-[calc(2vw+1.8rem)] font-bold mb-12">
        لوحة التحكم
      </h1>

      <div className=" mx-auto grid md:grid-cols-2  gap-8">
        {/* أحاديث Card */}
        <div className="bg-amber-50 border-amber-900/20 border rounded-xl shadow-lg p-[calc(1vw+0.6rem)] flex flex-col gap-y-[calc(0.2vw+1rem)] text-center hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
          <div className="flex justify-center mb-2">
            <div className="bg-amber-100 p-4 rounded-full"></div>
          </div>
          <div className="text-amber-800 text-[calc(2vw+1.2rem)] font-bold">
            أحاديث
          </div>
          <div className="text-gray-600 text-[calc(1vw+0.5rem)] min-h-[60px]">
            إعدادات الأحاديث النبوية
          </div>
          <Link
            to="/dashboard/hadith-settings"
            className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg text-[calc(0.8vw+0.7rem)] transition-all duration-300 hover:scale-105 mt-auto">
            الذهاب إلى الإعدادات
          </Link>
        </div>

        <div className="bg-amber-50 border-amber-900/20 border rounded-xl shadow-lg p-[calc(1vw+0.6rem)] flex flex-col gap-y-[calc(0.2vw+1rem)] text-center hover:shadow-xl transition-all duration-300 hover:translate-y-[-5px]">
          <div className="flex justify-center mb-2">
            <div className="bg-amber-100 p-4 rounded-full"></div>
          </div>
          <div className="text-amber-800 text-[calc(2vw+1.2rem)] font-bold">
            الإقامة
          </div>
          <div className="text-gray-600 text-[calc(1vw+0.5rem)] min-h-[60px]">
            إعدادات أوقات الإقامة
          </div>
          <Link
            to="/dashboard/iqameh-settings"
            className="bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg text-[calc(0.8vw+0.7rem)] transition-all duration-300 hover:scale-105 mt-auto">
            الذهاب إلى الإعدادات
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
