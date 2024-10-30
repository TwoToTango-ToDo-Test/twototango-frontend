"use client";
import { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Alert from "@/components/Alert";

interface LoginProps {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    data: {
        Email: string;
        Password: string;
    };
    error: string | undefined;
    
}

export default function Login({handleSubmit, handleChange, data, error}: LoginProps) {


  return (
    <div className="w-full flex bg-white flex-col justify-center items-center m-auto h-screen">
      {error && <Alert message={error} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col justify-center max-w-sm w-full  px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="Email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="Email"
            id="Email"
            onChange={handleChange}
            value={data.Email}
            className="shadow appearance-none border-gray-700 border-[1px] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="youremail@company.tld"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="Password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="Password"
            id="Password"
            onChange={handleChange}
            value={data.Password}
            className="shadow appearance-none border-gray-700 border-[1px] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="*************"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
        <p className="my-8 text-sm flex justify-between px-3 text-black">
          Do not have an account?
          <Link
            href="/signup"
            className="text-blue-700 hover:text-blue-900 underline"
          >
            Sign up
          </Link>
        </p>
        <hr className="after:content-['LOGIN'] text-gray-700" />
      </form>
    </div>
  );
}