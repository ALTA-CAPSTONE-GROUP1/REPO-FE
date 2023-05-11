import { FC } from "react";
import { RedButton, Red2Button, BlueButton } from "@/components/Button";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { TabUser } from "@/components/Tab";

const Home: FC = () => {
  return (
    <Layout>
      <div>
        <div className=" font-bold text-red-600">this is a Home</div>
      </div>
    </Layout>
  );
};

export default Home;
