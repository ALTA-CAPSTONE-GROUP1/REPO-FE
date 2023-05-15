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
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  action: z.string(),
  approval_message: z.string(),
});

type Schema = z.infer<typeof schema>;

const ApproveDetail: FC = () => {
  const [createSubmission, setCreateSubmission] = useState<boolean>(false);
  const [page, setPage] = useState<string>();
  const [bg1, setBg1] = useState<boolean>(false);
  const [bg2, setBg2] = useState<boolean>(false);
  const [bg3, setBg3] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<ApproveDetailType>();
  const MySwal = withReactContent(Swal);
  const { id } = useParams();
  const navigate = useNavigate();
  const [action, setAction] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

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
    navigate("/user");
  }

  function handleMenu2() {
    setBg1(false);
    setBg2(true);
    setBg3(false);
    navigate("/user");
  }

  function handleMenu3() {
    setBg1(false);
    setBg2(false);
    setBg3(true);
    navigate("/user");
  }

  const onSubmit: SubmitHandler<Schema> = (data) => {
    const newData = { ...data, action: action };
    alert(JSON.stringify(newData));
    axios
      .put(`approver/${id}`, newData)
      .then((res) => {
        const { message } = res.data;
        MySwal.fire({
          title: "Success",
          text: message + " with " + action + " this submission",
          showCancelButton: false,
        });
      })
      .catch((err) => {
        const { message } = err.response;
        MySwal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      });
  };
  return (
    <Layout>
      <SideBar
        bg1={bg1}
        bg2={bg2}
        bg3={bg3}
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-end mb-5 pr-4 ">
                <textarea
                  {...register("approval_message")}
                  placeholder="Input Note"
                  id="note-acction"
                  className="textarea rounded-lg resize-none shadow-md w-1/2 pb-20"
                ></textarea>
                <input
                  type="text"
                  {...register("action")}
                  value={action}
                  hidden
                />
              </div>
              <div className="flex justify-end mb-5 pr-4">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="w-40">
                    <Red2Button
                      label="Revise"
                      id="button-approve-revise"
                      type="submit"
                      onClick={() => setAction("revise")}
                    />
                  </div>
                  <div className="w-40">
                    <RedButton
                      label="Reject"
                      id="button-approve-eject"
                      type="submit"
                      onClick={() => setAction("reject")}
                    />
                  </div>
                  <div className="w-40">
                    <BlueButton
                      label="Approve"
                      id="button-approve-approve"
                      type="submit"
                      onClick={(e) => setAction("approve")}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </SideBar>
    </Layout>
  );
};

export default ApproveDetail;
