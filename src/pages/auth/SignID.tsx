import { FC } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/Input";
import { RedButton } from "@/components/Button";

const styles = {
  backgroundImage: "url(https://wallpaperaccess.com/full/1163675.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
};

export const SignID: FC = () => {
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
            <h3 className="font-bold text-2xl text-black">Sign ID</h3>
            <h3 className="text-sm">Enter Users Sign ID </h3>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">
                Sign ID
              </label>
              <Input placeholder="Enter User ID" id="input-user-id" />
            </div>
            <div className="mt-5 font-semibold text-black">
              <p>Title :</p>
              <p>Name :</p>
              <p>Approve Date :</p>
            </div>
            <div className="mt-5">
              <RedButton label="Check" id="button-check" type="button" />
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
                Have an Account?
                <Link
                  to="/login"
                  className="font-bold text-black dark:text-@2A9D8F hover:text-@427AA1"
                  id="sign-id"
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
