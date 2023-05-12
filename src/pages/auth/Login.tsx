import { FC } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/Input";
import { RedButton } from "@/components/Button";

export const Login: FC = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url("https://wallpaperaccess.com/full/1163675.jpg")`,
      }}
    >
      <div className="flex hero-overlay bg-opacity-60 justify-center items-center ">
        <form className="flex flex-col m-6 p-8 bg-white rounded-md w-full md:w-fit h-fit">
          <img src="/images/Logo2.png" alt="" />
          <div className="mt-3">
            <h3 className="font-bold text-2xl text-black">Login</h3>
            <h3 className="text-sm">
              Welcome back. Enter your credentials to access your account
            </h3>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">
                User ID
              </label>
              <Input placeholder="Enter Your ID" id="input-user-id" />
            </div>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">
                Password
              </label>
              <Input placeholder="Enter Your Password" id="input-user-id" />
            </div>
            <div className="mt-5">
              <RedButton label="Login" id="button-login" type="submit" />
            </div>
            <div className="flex flex-col mt-5 md:justify-center md:items-center text-md text-black">
              <p>
                Don't have an Account? Contanct{" "}
                <Link
                  to="/"
                  className="font-bold text-black dark:text-@2A9D8F hover:text-@427AA1"
                  id="contact-admin"
                >
                  Your Admin
                </Link>
              </p>
              <p>
                Check Users Sign Submission?
                <Link
                  to="/sign-id"
                  className="font-bold text-black dark:text-@2A9D8F hover:text-@427AA1"
                  id="sign-id"
                >
                  Sign ID
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
