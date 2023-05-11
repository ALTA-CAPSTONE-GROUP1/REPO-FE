import { Layout } from "@/components/Layout";
import { FC } from "react";

const Home: FC = () => {
  return (
    <Layout>
      <div className=" font-bold text-red-600">this is a Home</div>
      <div>
        <progress className="progress w-56"></progress>
      </div>
    </Layout>
  );
};

export default Home;
