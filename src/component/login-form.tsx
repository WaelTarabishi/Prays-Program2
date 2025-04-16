"use client";
import { useMutation } from "@tanstack/react-query";
import { LoginFn } from "../functions/login";
import { useAuthStore } from "../store/auth-store";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const login = useAuthStore((state) => state.login);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    mutate(formData);
  };

  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: FormData) => {
      const result = await LoginFn(data);
      if (typeof result === "string") {
        throw new Error(result);
      }
      return result;
    },
    onSuccess: async (data) => {
      login(data.token);
      toast.success("مرحباً بعودتك!");
      if (data.user.role == "user") {
        navigate("/");
      } else {
        navigate("/");
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || "بيانات الدخول غير صحيحة");
    },
  });

  return (
    <form
      onSubmit={handleSubmit}
      className={"flex flex-col gap-6 w-full   px-[calc(1vw+0.6rem)]"}
      {...props}>
      <div className="flex flex-col items-center gap-2 text-center w-full">
        <h1 className="text-[calc(5vw+0.7rem)] font-bold text-amber-900">
          تسجيل الدخول
        </h1>
        <p className="text-balance text-[calc(1vw+1.4rem)]  text-amber-700">
          أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك
        </p>
      </div>
      {/* Remove max-w-md and mx-auto to allow full width */}
      <div className="grid gap-6 w-full">
        <div className="grid gap-2 w-full">
          <label
            htmlFor="email"
            className="text-amber-800   text-right font-medium text-[calc(1vw+1.4rem)]">
            البريد الإلكتروني
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="border-2 w-full border-amber-500 rounded-[calc(3vw+1em)] mt-[calc(0.2vw+0.4rem)]  p-[calc(1.5vw+0.9rem)]   focus:outline-none lg:h-[calc(4vw)] text-[calc(1vw+1.4rem)] focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
        <div className="grid gap-2 w-full">
          <div className="flex items-end justify-end">
            <label
              htmlFor="password"
              className="text-amber-800   text-right font-medium text-[calc(1vw+1.4rem)]">
              كلمة المرور
            </label>
          </div>
          <input
            name="password"
            id="password"
            type="password"
            required
            className="border-2 w-full border-amber-500 mt-[calc(0.2vw+0.4rem)] rounded-[calc(3vw+1em)]  p-[calc(1.5vw+0.9rem)]   lg:h-[calc(4vw)] text-[calc(1vw+1.4rem)] focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
        <button
          disabled={isPending}
          type="submit"
          className="w-full bg-amber-600 cursor-pointer  hover:bg-amber-700 text-white font-semibold rounded-[calc(3vw+1em)]  transition-colors duration-500 mt-4  lg:h-[calc(4vw)] text-[calc(1vw+1.4rem)]">
          {isPending ? (
            <span className="loader inline-block border-[calc(0.2vw+0.1rem)] w-[calc(2vw+1rem)] h-[calc(2vw+1rem)] border-white mt-[calc(1vh+0.4rem)] border-t-transparent rounded-full animate-spin"></span>
          ) : (
            "تسجيل الدخول"
          )}
        </button>
      </div>
    </form>
  );
}
