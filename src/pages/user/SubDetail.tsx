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
import { useCookies } from "react-cookie";
import { RedButton } from "@/components/Button";

const SubDetail: FC = () => {
  const [createSubmission, setCreateSubmission] = useState<boolean>(false);
  const [page, setPage] = useState<string>("user-home");
  const [bg1, setBg1] = useState<boolean>(false);
  const [bg2, setBg2] = useState<boolean>(false);
  const [bg3, setBg3] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cookie, setCookie, removeCookie] = useCookies(["page"]);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState<boolean>(false);
  function handleMenu1() {
    setBg1(true);
    setBg2(false);
    setBg3(false);

    setPage("user-home");
    navigate("/user");
    setCookie("page", "home");
  }

  function handleMenu2() {
    setBg1(false);
    setBg2(true);
    setBg3(false);
    setPage("cc");
    navigate("/user");
    setCookie("page", "cc");
  }

  function handleMenu3() {
    setBg1(false);
    setBg2(false);
    setBg3(true);
    setPage("approve");
    navigate("/user");
    setCookie("page", "approve");
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
                onClick={() => setEditMode(true)}
              />
            )}
          </div>
          <div className="h-10 w-full bg-@Red4 relative transition-all">
            {editMode ? (
              <div
                data-theme="cupcake"
                className="absolute right-2 bottom-2 h-[30rem] w-[50rem] shadow-2xl -translate-x-2 translate-y-2 transition-all"
              >
                <div className="flex justify-between px-5 py-2 bg-@Red4 items-center">
                  <p className=" text-sm font-bold">New Submission</p>
                  <button
                    className=" text-@Red"
                    onClick={() => setEditMode(!editMode)}
                  >
                    <RiCloseCircleFill />
                  </button>
                </div>
                <div data-theme="light" className=" p-5 h-[90%]">
                  <form action="">
                    <div className="form-control">
                      <div className="input-group rounded-md justify-between w-[40%]">
                        <select className="select select-bordered">
                          <option disabled selected>
                            Submission Type
                          </option>
                          <option>Program</option>
                          <option>Finance</option>
                        </select>
                        <select className="select select-bordered">
                          <option disabled selected>
                            Value
                          </option>
                          <option>{">60 Juta"}</option>
                          <option>{"<30 Juta"}</option>
                        </select>
                      </div>
                      <Input
                        type="text"
                        placeholder="Title"
                        className=" border-b-2 focus:outline-none focus:border-b-@Red w-full mt-3"
                      />
                      <Input
                        type="text"
                        placeholder="To:"
                        className=" border-b-2 focus:outline-none focus:border-b-@Red w-full mt-3"
                      />
                      <Input
                        type="text"
                        placeholder="CC:"
                        className=" border-b-2 focus:outline-none focus:border-b-@Red w-full mt-3"
                      />
                      <textarea
                        className="textarea pb-20"
                        placeholder="Messages"
                      ></textarea>
                      <div className="flex justify-between items-end mt-5 h-20 max-h-20">
                        <Input type="file" className="w-full " multiple />
                        <RedButton
                          label="Update Submission"
                          type="submit"
                          className=" bg-@Red rounded-full w-4/12 text-white p-2"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="h-10 w-full bg-@Red4 relative transition-all"></div>
        </div>
      </SideBar>
    </Layout>
  );
};

export default SubDetail;
