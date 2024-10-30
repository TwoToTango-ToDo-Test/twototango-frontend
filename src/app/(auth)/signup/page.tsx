"use client";
import Signup from "@/components/Signup";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

interface User {
  Name: string;
  Email: string;
  Password: string;
}

const SignupPage = () => {
  const [data, setData] = useState<User>({
    Name: "",
    Email: "",
    Password: "",
  });
  const [error, setError] = useState<string | undefined>("");
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const { errors } = await res.json();
        setError(errors);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Signup
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        error={error}
        data={data}
      />
    </>
  );
};

export default SignupPage;