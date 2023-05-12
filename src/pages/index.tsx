import { Layout } from "@/components/Layout";
import { FC } from "react";
import UserHome from "./UserHome";

const Home: FC = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url("https://wallpaperaccess.com/full/1163675.jpg")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className=" text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
          <p className="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>

          <a href="/login" className="btn glass rounded-full">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
