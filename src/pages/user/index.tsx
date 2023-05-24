/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiCloseCircleFill } from "react-icons/ri";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";
import * as z from "zod";

import SubmissionType, { to_cc_type } from "@/utils/types/submission";
import approveTypes from "@/utils/types/approve";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/Input";
import SideBar from "@/components/SideBar";
import ccTypes from "@/utils/types/cc";
import UserHome from "./UserHome";
import Approve from "./Approve";
import CC from "./CC";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  message: z.string().min(5, { message: "Message is required" }),
  submission_type: z.string(),
  submission_value: z.string(),
  attachment: z.any(),
  to: z
    .string()
    .array()
    .refine((val) =>
      val.every((el) => {
        return el !== "";
      })
    ),
  cc: z
    .string()
    .array()
    .refine((val) =>
      val.every((el) => {
        return el !== "";
      })
    ),
});

type Schema = z.infer<typeof schema>;

interface submission_type {
  name: string;
  values: number[];
}

const UserIndex: FC = () => {
  const [createSubmission, setCreateSubmission] = useState<boolean>(false);
  const [select, setSelect] = useState<boolean>(false);

  const [loading, setLoading] = useState(true);

  const [datasSubmission, setDatasSubmission] = useState<SubmissionType[]>([]);
  const [datasApprove, setDatasApprove] = useState<approveTypes[]>([]);
  const [subTypes, setSubTypes] = useState<submission_type[]>([]);
  const [datascc, setDatascc] = useState<ccTypes[]>([]);
  const [to_cc, setTo_Cc] = useState<to_cc_type>();

  const [selectSubType, setSelectSubType] = useState<string>();
  const [category, setCategory] = useState<string>("to");

  const [search, setSearch] = useState<string>("");

  const [selectValue, setSelectValue] = useState<number>();
  const [indexSubtypes, setIndexSub] = useState<number>();

  const [file, setFile] = useState<any>();

  const [cookie, , removeCookie] = useCookies(["token", "user_position"]);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const location = useLocation();

  const menu = new URLSearchParams(location.search).get("menu");

  const [page, setPage] = useState<string>(menu ? menu : "user-home");
  const [bg, setBg] = useState<string>(menu ? menu : "user-home");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const {
    fields: fieldsSubVal,
    remove: removeSubValTo,
    append: appendSubValTo,
  } = useFieldArray({
    control,
    name: "to",
  });

  const { append: appendSubValCc } = useFieldArray({
    control,
    name: "cc",
  });

  useEffect(() => {
    if (page == "user-home") {
      fetchSubmission();
    } else if (page == "cc") {
      fetchCc();
    } else {
      fetchApprove();
    }
  }, [page]);

  function fetchSubmission() {
    setLoading(true);
    axios
      .get(`submission?${category}=${search}`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      // const url =
      //   "https://virtserver.swaggerhub.com/123ADIYUDA/E-Proposal/1.0.0";
      // axios({
      //   method: "get",
      //   url: `${url}/submission?${category}=${search}`,
      // })
      .then((res) => {
        const { data } = res.data;
        setDatasSubmission(data.submissions);
        setSubTypes(data.submission_type_choices);
        localStorage.removeItem("SubmissionType");
        localStorage.setItem(
          "SubmissionType",
          JSON.stringify(data.submission_type_choices)
        );
      })
      .catch((err) => {
        const { message } = err.response;
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  }

  function fetchCc() {
    setLoading(true);
    axios
      .get(`cc?${category}=${search}`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setDatascc(data);
      })
      .catch((err) => {
        const { message } = err.response;
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  }

  function fetchApprove() {
    setLoading(true);
    axios
      .get(`approver?${category}=${search}`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setDatasApprove(data);
      })
      .catch((err) => {
        const { message } = err.response;
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  }

  function handleMenu1() {
    setBg("user-home");
    setPage("user-home");
    setDatasApprove([]);
    setDatascc([]);
    setCategory("");
    setSearch("");
  }

  function handleMenu2() {
    setBg("cc");
    setPage("cc");
    setDatasSubmission([]);
    setCreateSubmission(false);
    setDatasApprove([]);
    setCategory("");
    setSearch("");
  }

  function handleMenu3() {
    setBg("approve");
    setPage("approve");
    setDatasSubmission([]);
    setDatascc([]);
    setCreateSubmission(false);
    setCategory("");
    setSearch("");
  }

  function handleTypeSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setIndexSub(subTypes.findIndex((item) => item.name === event.target.value));
    setSelectSubType(
      subTypes[subTypes.findIndex((item) => item.name === event.target.value)]
        .name
    );
  }

  function handleGetToCC(event: React.ChangeEvent<HTMLSelectElement>) {
    let to: string[] = [];
    let cc: string[] = [];

    let type = "";
    if (indexSubtypes !== null && indexSubtypes !== undefined) {
      type = subTypes[indexSubtypes].name;
    }
    const values = event.target.value;
    setSelectValue(parseInt(values));
    axios
      .get(
        `submission/requirements?submission_type=${type}&submission_value=${values}`,
        {
          headers: {
            Authorization: `Bearer ${cookie.token}`,
          },
        }
      )
      .then((res) => {
        const { data } = res.data;
        data.to.map((dataz: any) => {
          return to.push(dataz.approver_id);
        });
        data.cc.map((dataz: any) => {
          return cc.push(dataz.cc_id);
        });

        for (let i = 0; i < fieldsSubVal.length; i++) {
          removeSubValTo(i);
        }

        appendSubValTo(to);
        appendSubValCc(cc);

        setTo_Cc(data);
      })
      .catch((err) => {
        const { message } = err.response;
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      });
  }

  const onSubmit: SubmitHandler<Schema> = (data) => {
    const newData = {
      ...data,
      submission_value: parseInt(data.submission_value),
      attachment: file,
    };
    const formData = new FormData();
    let key: keyof typeof newData;
    for (key in newData) {
      // if (key === "attachment") formData.append(key, newData[key][0]);
      if (key === "to") {
        newData.to.map((value: any) => {
          return formData.append(`to`, value);
        });
      } else if (key === "cc") {
        newData.cc.map((value: any) => {
          return formData.append(`cc`, value);
        });
      } else {
        formData.append(key, newData[key]);
      }
    }

    axios
      .post("submission", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { message } = res.data;
        Swal.fire({
          icon: "success",
          title: "Success ",
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
      .finally(fetchSubmission);
  };

  function handleSearch(event: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(event.target.value);
    setSelect(true);
  }

  function handleSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  function handleEnterAndClicked(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      if (page == "user-home") {
        fetchSubmission();
      } else if (page == "cc") {
        fetchCc();
      } else {
        fetchApprove();
      }
    }
  }

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
        onClick={() => setCreateSubmission(!createSubmission)}
        onClickUserHome={handleMenu1}
        onClickCC={handleMenu2}
        onClickApprove={handleMenu3}
      >
        {page === "user-home" || createSubmission ? (
          <UserHome
            onKeyDown={handleEnterAndClicked}
            onClickSearch={fetchSubmission}
            loading={loading}
            datas={datasSubmission}
            onchange={(e) => handleSearch(e)}
            onchangeInput={(e) => handleSearchInput(e)}
            select={select}
          >
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
                  <div data-theme="light" className=" px-5 pt-5 h-[90%]">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="form-control">
                        <div className=" flex-grow">
                          <div className="input-group rounded-md justify-between w-[40%]">
                            <select
                              {...register("submission_type")}
                              className="select select-bordered"
                              onChange={(e) => handleTypeSelect(e)}
                              value={selectSubType}
                            >
                              <option disabled selected>
                                Select Submission Type
                              </option>
                              {subTypes?.map((data) => {
                                return (
                                  <option value={data.name}>{data.name}</option>
                                );
                              })}
                            </select>
                            <select
                              {...register("submission_value")}
                              className="select select-bordered"
                              onChange={(e) => handleGetToCC(e)}
                              value={selectValue}
                            >
                              <option disabled selected>
                                Select Value
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
                            // register={register}
                            disabled
                            name="to"
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
                                    return (
                                      data.cc_position + " " + data.cc_name
                                    );
                                  })
                                : ""
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
                              {...register("message")}
                              name="message"
                              className="textarea pb-20 w-full focus:border-@Red focus:outline-none resize-none"
                              placeholder="Messages"
                            ></textarea>
                          </div>
                        </div>
                        <div className=" mt-auto">
                          <p className=" text-sm text-@Red">
                            *Requirement File: {to_cc?.requirement}
                          </p>
                          <div className="flex justify-between items-end h-10 max-h-20">
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
                            <button className=" bg-@Red rounded-full text-white py-2 px-8">
                              Send
                            </button>
                          </div>
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
          <CC
            onKeyDown={handleEnterAndClicked}
            onClickSearch={fetchCc}
            loading={loading}
            datas={datascc}
            onchange={(e) => handleSearch(e)}
            onchangeInput={(e) => handleSearchInput(e)}
            select={select}
          />
        ) : (
          <Approve
            onKeyDown={handleEnterAndClicked}
            onClickSearch={fetchApprove}
            loading={loading}
            datas={datasApprove}
            onchange={(e) => handleSearch(e)}
            onchangeInput={(e) => handleSearchInput(e)}
            select={select}
          />
        )}
      </SideBar>
    </Layout>
  );
};

export default UserIndex;
