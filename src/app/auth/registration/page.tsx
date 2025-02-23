"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/shared/config/routes";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function handleClose() {
    router.back();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      // 1. Post to /api/register
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        // 2. If success => go to login
        router.push("/auth/login");
      } else {
        // 3. If error => read the message
        const data = await res.json();
        setErrorMsg(data.error || "Failed to register");
      }
    } catch (error) {
      console.error("Registration Error", error);
      setErrorMsg("Something went wrong");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md mx-auto rounded-lg p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-black hover:text-gray-600 text-xl"
        >
          ✖
        </button>

        <h1 className="text-2xl font-semibold text-center mb-1">Зарегистрироваться</h1>
        <p className="text-center text-gray-600 mb-4">
          Уже есть аккаунт?{" "}
          <Link href={routes.authLogin()} className="text-green-700 underline hover:text-green-800">
            Войти
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {errorMsg && <div className="text-red-500 text-sm">{errorMsg}</div>}

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Эл. почта
            </label>
            <input
              id="email"
              type="email"
              className="border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600"
              placeholder="Введите вашу почту"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              className="border-b border-gray-300 w-full px-2 py-1 focus:outline-none focus:border-green-600"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition-colors"
          >
            Зарегистрироваться
          </button>
        </form>

        <div className="flex items-center justify-center my-4">
          <span className="text-sm text-gray-500">Или зарегистрируйтесь через</span>
        </div>
      </div>
    </div>
  );
}
