/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import withReactContent from "sweetalert2-react-content";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import * as z from "zod";

import { RedButton, Red2Button, BlueButton } from "@/components/Button";
import ApproveDetailType from "@/utils/types/ApproveDetail";
import { CardApprove } from "@/components/Card";
import { Layout } from "@/components/Layout";
import SideBar from "@/components/SideBar";
import Loading from "@/components/Loading";
import Swal from "@/utils/Swal";

const schema = z.object({
  action: z.string(),
  approval_message: z.string().min(1, { message: "Please Write Note" }),
});

type Schema = z.infer<typeof schema>;

const ApproveDetail: FC = () => {
  const [cookie, , removeCookie] = useCookies(["token", "user_position"]);

  const [loading] = useState<boolean>(false);

  const [data, setData] = useState<ApproveDetailType>();

  const [action, setAction] = useState<string>("");
  const [bg] = useState<string>("approve");

  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const { id } = useParams();

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
      .get(`/approver/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
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
    navigate("/user?menu=user-home");
  }

  function handleMenu2() {
    navigate("/user?menu=cc");
  }

  function handleMenu3() {
    navigate("/user?menu=approve");
  }

  const onSubmit: SubmitHandler<Schema> = (data) => {
    const newData = { ...data, action: action };
    axios
      .put(`approver/${id}`, newData, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
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

  function handleLogout() {
    removeCookie("token");
    removeCookie("user_position");
    navigate("/");
  }

  return (
    <Layout>
      <SideBar
        onClickLogout={handleLogout}
        bg={bg}
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
                message={data?.message}
                attachment={data?.attachment}
              />
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex justify-end mb-5 pr-4 ">
                <div
                  className={`${
                    errors.approval_message?.message
                      ? "tooltip tooltip-open tooltip-bottom w-1/2"
                      : ""
                  } w-1/2`}
                  data-tip={errors.approval_message?.message}
                >
                  <textarea
                    {...register("approval_message")}
                    name="approval_message"
                    className="textarea rounded-lg resize-none shadow-md w-full  pb-20"
                    placeholder="Input Note"
                    id="note-acction"
                  ></textarea>
                </div>
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
                      onClick={() => setAction("approve")}
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
