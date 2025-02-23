"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/shared/config/routes";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleClose() {
    router.back();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/welcome");
    } else {
      console.error("Login error");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-md mx-auto rounded-lg p-6 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-black hover:text-gray-600 text-xl"
        >
          ✖
        </button>

        {/* Title & Link */}
        <h1 className="text-2xl font-semibold text-center mb-1">Войти</h1>
        <p className="text-center text-gray-600 mb-4">
          Впервые на сайте?{" "}
          <Link href={routes.authReg()} className="text-green-700 underline hover:text-green-800">
            Зарегистрироваться
          </Link>
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

          <div className="text-right text-sm text-gray-500">
            <a href="#" className="hover:underline">
              Не помню пароль
            </a>
          </div>

          <button
            type="submit"
            className="bg-[#BAD36E] text-white py-2 rounded font-semibold hover:bg-[#90a553] transition-colors"
          >
            Войти
          </button>
        </form>

        {/* Divider & Social Login */}
        <div className="flex items-center justify-center my-4">
          <span className="text-sm text-gray-500">Или войдите через</span>
        </div>
        {/* Replace with your social login buttons */}
      </div>
    </div>
  );
}
