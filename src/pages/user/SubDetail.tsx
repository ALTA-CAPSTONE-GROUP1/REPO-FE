/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
import SideBar from "@/components/SideBar";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CardSubmission } from "@/components/Card";
import { Input } from "@/components/Input";
import { RiCloseCircleFill } from "react-icons/ri";
import { Layout } from "@/components/Layout";
import Loading from "@/components/Loading";
import { RedButton } from "@/components/Button";
import axios from "axios";
import SubDetailType from "@/utils/types/SubDetail";
import withReactContent from "sweetalert2-react-content";
import * as z from "zod";
import { useForm, SubmitHandler } from "react-hook-form";

import Swal from "@/utils/Swal";
import { to_cc_type } from "@/utils/types/submission";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";

interface submission_type {
  name: string;
  values: number[];
}

const schema = z.object({
  // title: z.string().min(1, { message: "Title is required" }),
  message: z.string().min(5, { message: "Message is required" }),
  // sub_type: z.string(),
  // value: z.string(),
  // attachment: z.any(),
  // to: z
  //   .string()
  //   .array()
  //   .refine((val) =>
  //     val.every((el) => {
  //       return el !== "";
  //     })
  //   ),
  // cc: z
  //   .string()
  //   .array()
  //   .refine((val) =>
  //     val.every((el) => {
  //       return el !== "";
  //     })
  //   ),
});

type Schema = z.infer<typeof schema>;

const SubDetail: FC = () => {
  const [createSubmission, setCreateSubmission] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [bg1, setBg1] = useState<boolean>(false);
  const [bg2, setBg2] = useState<boolean>(false);
  const [bg3, setBg3] = useState<boolean>(false);
  const [loading] = useState<boolean>(false);

  const [, setPage] = useState<string>("user-home");

  const [file, setFile] = useState<any>();

  const [, setSubTypes] = useState<submission_type[]>([]);
  const [data, setData] = useState<Partial<SubDetailType>>();
  const [to_cc] = useState<to_cc_type>();

  const [cookie, , removeCookie] = useCookies(["token", "user_position"]);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const status = new URLSearchParams(location.search).get("status");

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
    const dataSub: string | null = localStorage.getItem("SubmissionType");
    if (dataSub !== null) {
      setSubTypes(JSON.parse(dataSub));
    }

    axios
      .get(`submission/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      // const url = "https://virtserver.swaggerhub.com/123ADIYUDA/E-Proposal/1.0.0";
      // axios({
      //   method: "get",
      //   url: `${url}/submission/${id}`,
      // })
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

  function handlePdf() {
    const url = data?.attachment;
    let approver;
    if (data?.approver_action && data?.approver_action?.length > 0) {
      approver = data?.approver_action?.map((data) => {
        return data.action !== "" &&
          data.action !== null &&
          data.action !== undefined
          ? data.action + " by " + data.approver_position
          : "";
      });
    }
    window.open(`/app2?url=${url}&approver=${approver}`);
  }

  const onSubmit: SubmitHandler<Schema> = (data) => {
    const newData = { ...data, attachment: file };
    const formData = new FormData();
    let key: keyof typeof newData;
    for (key in newData) {
      formData.append(key, newData[key]);
    }

    axios
      .put(`submission/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { message } = res.data;
        MySwal.fire({
          title: "Success",
          text: message,
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
      })
      .finally(fetch);
  };

  function handleLogout() {
    removeCookie("token");
    removeCookie("user_position");
    navigate("/");
  }

  function handleDelete() {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover your submission",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`submission/${id}`, {
            headers: {
              Authorization: `Bearer ${cookie.token}`,
            },
          })
          // const url = "https://virtserver.swaggerhub.com/123ADIYUDA/E-Proposal/1.0.0";
          // axios({
          //   method: "delete",
          //   url: `${url}/submission/${id}`,
          // })
          .then((res) => {
            const { message } = res.data;
            MySwal.fire({
              icon: "success",
              title: "Success",
              text: message,
              showCancelButton: false,
            }).finally(() => navigate("/user"));
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
    });
  }

  return (
    <Layout>
      <SideBar
        onClickLogout={handleLogout}
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
                status={status}
                action_message={data?.action_message}
                onClickDelete={handleDelete}
                onClickPdf={handlePdf}
                title={data?.title}
                submission_type={data?.submission_type}
                cc={data?.cc}
                message={data?.message}
                attachment={data?.attachment}
                to={data?.to}
                approver_action={data?.approver_action}
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
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control">
                      <Input
                        disabled
                        defaultValue={data?.submission_type}
                        name="sub_type"
                        type="text"
                        placeholder="Title"
                        className=" border-b-2 focus:outline-none focus:border-b-@Red w-full mt-3"
                      />
                      <Input
                        disabled
                        defaultValue={data?.title}
                        register={register}
                        name="title"
                        type="text"
                        placeholder="Title"
                        className=" border-b-2 focus:outline-none focus:border-b-@Red w-full mt-3"
                      />
                      <Input
                        disabled
                        name="to"
                        type="text"
                        value={
                          to_cc
                            ? "To: " +
                              to_cc?.to.map((dataz) => {
                                return (
                                  dataz.approver_position +
                                  " " +
                                  dataz.approver_name
                                );
                              })
                            : data?.to?.map((dataz) => {
                                return (
                                  dataz.approver_position +
                                  " " +
                                  dataz.approver_name
                                );
                              })
                        }
                        placeholder="To:"
                        className=" border-b-2 focus:outline-none focus:border-b-@Red w-full mt-3"
                      />
                      <Input
                        disabled
                        name="cc"
                        type="text"
                        value={
                          to_cc
                            ? "Cc: " +
                              to_cc?.cc.map((data) => {
                                return data.cc_position + " " + data.cc_name;
                              })
                            : data?.cc?.map((dataz) => {
                                return dataz.cc_position + " " + dataz.cc_name;
                              })
                        }
                        placeholder="CC:"
                        className=" border-b-2 focus:outline-none focus:border-b-@Red w-full mt-3"
                      />
                      <div
                        className={`${
                          errors.message?.message
                            ? "tooltip tooltip-open w-full tooltip-bottom"
                            : ""
                        }`}
                        data-tip={errors.message?.message}
                      >
                        <textarea
                          defaultValue={data?.message}
                          {...register("message")}
                          name="message"
                          className="textarea pb-20 w-full focus:border-@Red focus:outline-none"
                          placeholder="Messages"
                        ></textarea>
                      </div>
                      <div className="flex justify-between items-end mt-5 h-20 max-h-20">
                        <div className="flex flex-col">
                          <p className=" text-sm text-@Red">
                            *Please Not Upload the Same File Before Update
                          </p>

                          <Input
                            // register={register}
                            name="attachment"
                            type="file"
                            className="w-full "
                            multiple
                            onChange={(event) => {
                              if (!event.currentTarget.files) {
                                return;
                              }
                              setFile(event.currentTarget.files[0]);
                            }}
                          />
                        </div>

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
        </div>
      </SideBar>
    </Layout>
  );
};

export default SubDetail;
