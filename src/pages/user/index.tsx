/* eslint-disable prefer-const */
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
import SubmissionType from "@/utils/types/submission";
import withReactContent from "sweetalert2-react-content";
import * as z from "zod";

import Swal from "@/utils/Swal";
import axios from "axios";
import ccTypes from "@/utils/types/cc";
import approveTypes from "@/utils/types/approve";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  message: z.string().min(5, { message: "Message is required" }),
  sub_type: z.string(),
  value: z.string(),
});

type Schema = z.infer<typeof schema>;

interface submission_type {
  name: string;
  values: number[];
}

interface to_cc_type {
  to: {
    approver_position: string;
    approver_id: string;
    approver_name: string;
  }[];
  cc: {
    cc_position: string;
    cc_name: string;
    cc_id: string;
  }[];
  requirement: string;
}

const UserIndex: FC = () => {
  const [createSubmission, setCreateSubmission] = useState<boolean>(false);
  const [page, setPage] = useState<string>("user-home");
  const [bg1, setBg1] = useState<boolean>(true);
  const [bg2, setBg2] = useState<boolean>(false);
  const [bg3, setBg3] = useState<boolean>(false);
  const navigate = useNavigate();
  const [datasSubmission, setDatasSubmission] = useState<SubmissionType[]>([]);
  const [datascc, setDatascc] = useState<ccTypes[]>([]);
  const [datasApprove, setDatasApprove] = useState<approveTypes[]>([]);
  const MySwal = withReactContent(Swal);
  const [subTypes, setSubTypes] = useState<submission_type[]>([]);
  const [indexSubtypes, setIndexSub] = useState<number>();
  const [selectSubType, setSelectSubType] = useState<string>();
  const [selectValue, setSelectValue] = useState<number>();
  const [to_cc, setTo_Cc] = useState<to_cc_type>();
  const [file, setFile] = useState<any>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (page == "user-home") {
      axios
        .get(`submission`)
        .then((res) => {
          const { data } = res.data;
          setDatasSubmission(data.submissions);
          setSubTypes(data.submission_type_choices);
        })
        .catch((err) => {
          const { message } = err.response;
          MySwal.fire({
            title: "Failed",
            text: message,
            showCancelButton: false,
          });
        });
    } else if (page == "cc") {
      axios
        .get(`cc`)
        .then((res) => {
          const { data } = res.data;
          setDatascc(data);
        })
        .catch((err) => {
          const { message } = err.response;
          MySwal.fire({
            title: "Failed",
            text: message,
            showCancelButton: false,
          });
        });
    } else {
      axios
        .get(`approver`)
        .then((res) => {
          const { data } = res.data;
          setDatasApprove(data);
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
  }, [page]);

  function handleMenu1() {
    setBg1(true);
    setBg2(false);
    setBg3(false);

    setPage("user-home");
    setDatasApprove([]);
    setDatascc([]);
  }

  function handleMenu2() {
    setBg1(false);
    setBg2(true);
    setBg3(false);
    setPage("cc");
    setDatasSubmission([]);
    setDatasApprove([]);
  }

  function handleMenu3() {
    setBg1(false);
    setBg2(false);
    setBg3(true);
    setPage("approve");
    setDatasApprove([]);
    setDatascc([]);
  }

  function handleTypeSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    alert(event.target.value);
    setIndexSub(subTypes.findIndex((item) => item.name === event.target.value));
    setSelectSubType(
      subTypes[subTypes.findIndex((item) => item.name === event.target.value)]
        .name
    );
  }

  function handleGetToCC(event: React.ChangeEvent<HTMLSelectElement>) {
    alert(selectSubType);
    let type = "";
    if (indexSubtypes) {
      type = subTypes[indexSubtypes].name;
    }
    const value = event.target.value;
    setSelectValue(parseInt(value));

    axios
      .get(
        `submission/requirements?submissiont_type=${type}&submission_value=${value}`
      )
      .then((res) => {
        const { data } = res.data;
        setTo_Cc(data);
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

  const onSubmit: SubmitHandler<Schema> = (data) => {
    let to: string[] = [];
    let cc: string[] = [];
    to_cc?.to.map((data) => {
      return to.push(data.approver_id);
    });
    to_cc?.cc.map((data) => {
      return cc.push(data.cc_id);
    });
    const newData = { ...data, To: to, CC: cc, attachment: file };
    alert(JSON.stringify(newData));
    const formData = new FormData();
    let key: keyof typeof newData;
    for (key in newData) {
      formData.append(key, newData[key]);
    }
    axios
      .post("submission", formData)
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
      });
  };

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
          <UserHome datas={datasSubmission}>
            <div className="h-10 w-full bg-@Red4 relative transition-all">
              {createSubmission ? (
                <div
                  data-theme="cupcake"
                  className="absolute min-[400px]:right-0 md:right-2 bottom-2 h-[30rem] min-[400px]:w-[30rem] min-[600px]:w[40rem] min-[1100px]:w-[50rem] shadow-2xl -translate-x-2 translate-y-2 transition-all"
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-control">
                        <div className="input-group rounded-md justify-between w-[40%]">
                          <select
                            {...register("sub_type")}
                            className="select select-bordered"
                            onChange={(e) => handleTypeSelect(e)}
                            value={selectSubType}
                          >
                            <option disabled selected>
                              Select Submission Type
                            </option>
                            {subTypes.map((data, index) => {
                              return (
                                <option value={data.name}>{data.name}</option>
                              );
                            })}
                          </select>
                          <select
                            {...register("value")}
                            className="select select-bordered"
                            onChange={(e) => handleGetToCC(e)}
                            value={selectValue}
                          >
                            <option disabled selected>
                              {selectValue}
                            </option>
                            {indexSubtypes !== undefined
                              ? subTypes[indexSubtypes].values.map((data) => {
                                  return <option value={data}>{data}</option>;
                                })
                              : ""}
                          </select>
                        </div>
                        <Input
                          error={errors.title?.message}
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
                          defaultValue={
                            to_cc
                              ? "To: " +
                                to_cc?.to.map((data) => {
                                  return (
                                    data.approver_position +
                                    " " +
                                    data.approver_name
                                  );
                                })
                              : ""
                          }
                          placeholder="To:"
                          className=" border-b-2 focus:outline-none focus:border-b-@Red w-full mt-3"
                        />
                        <Input
                          disabled
                          name="cc"
                          type="text"
                          defaultValue={
                            to_cc
                              ? "Cc: " +
                                to_cc?.cc.map((data) => {
                                  return data.cc_position + " " + data.cc_name;
                                })
                              : ""
                          }
                          placeholder="CC:"
                          className=" border-b-2 focus:outline-none focus:border-b-@Red w-full mt-3"
                        />

                        <div
                          className={`${
                            errors.message?.message
                              ? "tooltip tooltip-open w-full"
                              : ""
                          }`}
                          data-tip={errors.message?.message}
                        >
                          <textarea
                            {...register("message")}
                            name="message"
                            className="textarea pb-20 w-full focus:border-@Red focus:outline-none"
                            placeholder="Messages"
                          ></textarea>
                        </div>

                        <div className="flex justify-between items-end mt-5 h-20 max-h-20">
                          <Input
                            register={""}
                            name="title"
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
                          <button className=" bg-@Red rounded-full text-white py-3 px-5">
                            Send
                          </button>
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
          <CC datas={datascc} />
        ) : (
          <Approve datas={datasApprove} />
        )}
      </SideBar>
    </Layout>
  );
};

export default UserIndex;
