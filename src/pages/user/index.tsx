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
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmissionType, { to_cc_type } from "@/utils/types/submission";
import withReactContent from "sweetalert2-react-content";
import * as z from "zod";

// import Swal from "@/utils/Swal";
import Swal from "sweetalert2";
import axios from "axios";
import ccTypes from "@/utils/types/cc";
import approveTypes from "@/utils/types/approve";

const schema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  message: z.string().min(5, { message: "Message is required" }),
  sub_type: z.string(),
  value: z.string(),
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
  const [category, setCategory] = useState<string>("to");
  const [search, setSearch] = useState<string>("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const {
    fields: fieldsSubValTo,
    append: appendSubValTo,
    remove: removeSubValTo,
    update: updateSubValTo,
  } = useFieldArray({
    control,
    name: "to",
  });

  const {
    fields: fieldsSubValCc,
    append: appendSubValCc,
    remove: removeSubValCc,
    update: updateSubValCc,
  } = useFieldArray({
    control,
    name: "cc",
  });

  useEffect(() => {
    if (page == "user-home") {
      axios
        .get(`submission?${category}=${search}`)
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
  }, [page, category, search]);

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
    let to: string[] = [];
    let cc: string[] = [];

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
        console.log(JSON.stringify(data.to));
        data.to.map((dataz: any) => {
          return to.push(dataz.approver_id);
        });
        data.cc.map((dataz: any) => {
          return cc.push(dataz.cc_id);
        });
        console.log(to);
        console.log(cc);
        appendSubValTo(to);
        appendSubValCc(cc);

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
    const formData = new FormData();
    let key: keyof typeof data;
    for (key in data) {
      if (key === "attachment") formData.append(key, data[key][0]);
      formData.append(key, data[key]);
    }
    axios
      .post("submission", formData)
      .then((res) => {
        const { message } = res.data;
        Swal.fire({
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

  function handleSearch(event: React.ChangeEvent<HTMLSelectElement>) {
    setCategory(event.target.value);
  }

  function handleSearchInput(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
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
          <UserHome
            datas={datasSubmission}
            onchange={(e) => handleSearch(e)}
            onchangeInput={(e) => handleSearchInput(e)}
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
                              ? "tooltip tooltip-open w-full tooltip-bottom"
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
                            register={register}
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
