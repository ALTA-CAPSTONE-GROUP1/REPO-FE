import SideBar from "@/components/SideBar";
import { FC, useEffect, useState } from "react";
import { RedButton, Red2Button, BlueButton } from "@/components/Button";
import { CardApprove, CardApproving } from "@/components/Card";
import { Input } from "@/components/Input";
import { RiCloseCircleFill } from "react-icons/ri";
import { Layout } from "@/components/Layout";
import Loading from "@/components/Loading";
import withReactContent from "sweetalert2-react-content";

import Swal from "@/utils/Swal";
import ApproveDetailType from "@/utils/types/ApproveDetail";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const ApproveDetail: FC = () => {
  const [createSubmission, setCreateSubmission] = useState<boolean>(false);
  const [page, setPage] = useState<string>("user-home");
  const [bg1, setBg1] = useState<boolean>(true);
  const [bg2, setBg2] = useState<boolean>(false);
  const [bg3, setBg3] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ApproveDetailType>();
  const MySwal = withReactContent(Swal);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch();
  }, []);

  function fetch() {
    axios
      .get(`/approver/${id}`)
      .then((res) => {
        const { data } = res.data;
        setData(data);
      })
      .catch((err) => {
        const { message } = err.response;
        MySwal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      });
  }

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
              <CardApprove
                title={data?.title}
                from={data?.from}
                to={data?.to}
                submission_id={data?.submission_id}
                cc={data?.cc}
                submission_type={data?.submission_type}
                status_by={data?.status_by}
                message_body={data?.message_body}
                attacment={data?.attacment}
              />
            )}
            <div className="flex justify-end mb-5 pr-4 ">
              <textarea
                placeholder="Input Note"
                id="note-acction"
                className="textarea rounded-lg resize-none shadow-md w-1/2 pb-20"
              ></textarea>
            </div>
            <div className="flex justify-end mb-5 pr-4">
              <div className="flex flex-col md:flex-row gap-2">
                <div className="w-40">
                  <Red2Button
                    label="Revise"
                    id="button-approve-revise"
                    type="submit"
                  />
                </div>
                <div className="w-40">
                  <RedButton
                    label="Reject"
                    id="button-approve-eject"
                    type="submit"
                  />
                </div>
                <div className="w-40">
                  <BlueButton
                    label="Approve"
                    id="button-approve-approve"
                    type="submit"
                  />
                </div>
              </div>
            </div>
          </div>

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
                        type="text"
                        register={""}
                        name="title"
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
        </div>
      </SideBar>
    </Layout>
  );
};

export default ApproveDetail;
