"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Login from "@/components/Login";
import { setCookie } from "@/utils/cookies";

interface User {
  Email: string;
  Password: string;
}

const LoginPage = () => {
  const [data, setData] = useState<User>({
    Email: "",
    Password: "",
  });
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        const token = await res.json();
        const [header, payload] = token.Data.Token.split(".");
        const decodedHeader = atob(header);
        const decodedPayload = atob(payload);
        const { sub } = JSON.parse(decodedPayload);
        localStorage.setItem("token", token.Data.Token);
        setCookie("token", token.Data.Token, 120);
        setCookie("userUUID", sub, 120);
        router.push("/");
      } else {
        const { errors } = await res.json();
        setError(errors);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Login
        data={data}
        error={error}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default LoginPage;