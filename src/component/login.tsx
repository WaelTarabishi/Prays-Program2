import { useNavigate } from "react-router-dom";
import { LoginForm } from "./login-form";
import Cookies from "js-cookie";

const Login = () => {
  const token = Cookies.get("prayerTimeIdlebTimeAdminToken");
  const navigate = useNavigate();
  console.log(token);
  if (token) {
    navigate("/");
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
