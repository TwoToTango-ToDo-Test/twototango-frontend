import { ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import Alert from "@/components/Alert";

interface SignupProps {
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    error: string | undefined;
    data: {
        Name: string;
        Email: string;
        Password: string;
    };
} 

export default function Signup({ handleInputChange, handleSubmit, error, data}: SignupProps) {


  return (
    <div className="w-full bg-white flex flex-col justify-center items-center m-auto h-auto min-h-screen">
      {error && <Alert message={error} />}

      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-sm w-full rounded px-8 pt-6 pb-6 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="Name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            type="text"
            name="Name"
            id="Name"
            onChange={handleInputChange}
            value={data.Name}
            className="shadow appearance-none border-gray-700 border-[1px] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="youruser"
          />
        </div>
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            value={data.Password}
            className="shadow appearance-none border-gray-700 border-[1px] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="*************"
          />
        </div>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Sign up
        </button>

        <p className="my-8 text-sm text-gray-700 flex justify-between px-4">
          Already have an Account?
          <Link
            href="/login"
            className="text-blue-700 hover:text-blue-900 underline"
          >
            Sign in
          </Link>
        </p>
        <hr className="after:content-['LOGIN'] text-gray-700" />
      </form>
    </div>
  );
}