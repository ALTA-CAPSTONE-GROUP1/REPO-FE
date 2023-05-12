import List from "@/components/List";
import SideBar from "@/components/SideBar";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { CardSubmission } from "@/components/Card";
import { Input } from "@/components/Input";
import { RiCloseCircleFill } from "react-icons/ri";
import { Layout } from "@/components/Layout";
import Loading from "@/components/Loading";

const SubDetail: FC = () => {
  const [createSubmission, setCreateSubmission] = useState<boolean>(false);
  const [page, setPage] = useState<string>("user-home");
  const [bg1, setBg1] = useState<boolean>(true);
  const [bg2, setBg2] = useState<boolean>(false);
  const [bg3, setBg3] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  function handleMenu1() {
    setBg1(true);
    setBg2(false);
    setBg3(false);

    setPage("user-home");
    navigate("/user");
  }

  function handleMenu2() {
    setBg1(false);
    setBg2(true);
    setBg3(false);
    setPage("cc");
    navigate("/user");
  }

  function handleMenu3() {
    setBg1(false);
    setBg2(false);
    setBg3(true);
    setPage("approve");
    navigate("/user");
  }
  return (
    <Layout>
      <SideBar
        bg1={bg1}
        bg2={bg2}
        bg3={bg3}
        onClick={() => setCreateSubmission(!createSubmission)}
        onClickUserHome={handleMenu1}
        onClickCC={handleMenu2}
        onClickApprove={handleMenu3}
      >
        <div className="drawer-content flex flex-col h-[90%]">
          <div className="h-full overflow-auto  min-w-[50rem]">
            {loading ? (
              <Loading />
            ) : (
              <CardSubmission
                title="Courier Recruitment"
                type="Recruitment"
                from="Product Design : Azhari Aziz"
                cc="Regional Manager Olivia, Product Design Baker, Product Manager Andi, UI Design Natali, Frontend Developer Lana, Backend Developer Demi"
                message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
                file="1"
                to="Approve by : Regional Zakaria"
                action=" Regional Manager : Ayunda"
                status="Revise"
              />
            )}
          </div>
        </div>
      </SideBar>
    </Layout>
  );
};

export default SubDetail;
