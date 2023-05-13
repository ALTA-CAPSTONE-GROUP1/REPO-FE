import { Layout } from "@/components/Layout";
import UserHome from "./UserHome";
import { FC, useEffect, useState } from "react";
import SideBar from "@/components/SideBar";
import CC from "./CC";
import Approve from "./Approve";
import { RiCloseCircleFill } from "react-icons/ri";
import { Input } from "@/components/Input";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const UserIndex: FC = () => {
  const [createSubmission, setCreateSubmission] = useState<boolean>(false);
  const [page, setPage] = useState<string>("user-home");
  const [bg1, setBg1] = useState<boolean>(true);
  const [bg2, setBg2] = useState<boolean>(false);
  const [bg3, setBg3] = useState<boolean>(false);
  const navigate = useNavigate();

  function handleMenu1() {
    setBg1(true);
    setBg2(false);
    setBg3(false);

    setPage("user-home");
  }

  function handleMenu2() {
    setBg1(false);
    setBg2(true);
    setBg3(false);
    setPage("cc");
  }

  function handleMenu3() {
    setBg1(false);
    setBg2(false);
    setBg3(true);
    setPage("approve");
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
        {page === "user-home" || createSubmission ? (
          <UserHome>
            <div className="h-10 w-full bg-@Red4 relative transition-all">
              {createSubmission ? (
                <div
                  data-theme="cupcake"
                  className="absolute right-2 bottom-2 h-[30rem] w-[50rem] shadow-2xl -translate-x-2 translate-y-2 transition-all"
                >
                  <div className="flex justify-between px-5 py-2 bg-@Red4 items-center">
                    <p className=" text-sm font-bold">New Submission</p>
                    <button
                      className=" text-@Red"
                      onClick={() => setCreateSubmission(!createSubmission)}
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
                          register={""}
                          name="title"
                          type="text"
                          placeholder="Title"
                          className=" border-b-2 focus:outline-none focus:border-b-@Red w-full mt-3"
                        />
                        <Input
                          register={""}
                          name="title"
                          type="text"
                          placeholder="To:"
                          className=" border-b-2 focus:outline-none focus:border-b-@Red w-full mt-3"
                        />
                        <Input
                          register={""}
                          name="title"
                          type="text"
                          placeholder="CC:"
                          className=" border-b-2 focus:outline-none focus:border-b-@Red w-full mt-3"
                        />
                        <textarea
                          className="textarea pb-20"
                          placeholder="Messages"
                        ></textarea>
                        <div className="flex justify-between items-end mt-5 h-20 max-h-20">
                          <Input
                            register={""}
                            name="title"
                            type="file"
                            className="w-full "
                            multiple
                          />
                          <button>Send</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </UserHome>
        ) : page === "cc" ? (
          <CC />
        ) : (
          <Approve />
        )}
      </SideBar>
    </Layout>
  );
};

export default UserIndex;
