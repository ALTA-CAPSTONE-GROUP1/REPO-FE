import { FC } from "react";
import UserHome from "./UserHome";
import { Layout } from "@/components/Layout";

const Home: FC = () => {
  return (
    <Layout>
      <div className="h-[90%]">
        <UserHome />
      </div>
    </Layout>
  );
};

export default Home;
