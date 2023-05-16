/* eslint-disable prefer-const */
import List from "@/components/List";
import SideBar from "@/components/SideBar";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { CardSubmission } from "@/components/Card";
import { Input } from "@/components/Input";
import { RiCloseCircleFill } from "react-icons/ri";
import { Layout } from "@/components/Layout";
import Loading from "@/components/Loading";
import { useCookies } from "react-cookie";
import { RedButton } from "@/components/Button";
import axios from "axios";
import SubDetailType from "@/utils/types/SubDetail";
import withReactContent from "sweetalert2-react-content";
import * as z from "zod";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";

import Swal from "@/utils/Swal";
import { to_cc_type } from "@/utils/types/submission";
import { zodResolver } from "@hookform/resolvers/zod";

interface submission_type {
  name: string;
  values: number[];
}

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

const SubDetail: FC = () => {
  const [createSubmission, setCreateSubmission] = useState<boolean>(false);
  const [page, setPage] = useState<string>("user-home");
  const [bg1, setBg1] = useState<boolean>(false);
  const [bg2, setBg2] = useState<boolean>(false);
  const [bg3, setBg3] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [data, setData] = useState<Partial<SubDetailType>>();
  const MySwal = withReactContent(Swal);
  const { id } = useParams();
  const [subTypes, setSubTypes] = useState<submission_type[]>([]);
  const [to_cc, setTo_Cc] = useState<to_cc_type>();
  const [selectValue, setSelectValue] = useState<number>();

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
    fetch();
  }, []);

  function fetch() {
    const dataSub: string | null = localStorage.getItem("SubmissionType");
    if (dataSub !== null) {
      setSubTypes(JSON.parse(dataSub));
    }
    axios
      .get(`/submission/${id}`)
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
    const url = "/images/test2.pdf";
    let approver;
    if (data?.approver_action && data?.approver_action?.length > 0) {
      approver = data?.approver_action?.map((data) => {
        return (
          data.action +
          " by " +
          data.approver_position +
          " " +
          data.approver_name +
          ","
        );
      });
    }
    window.open(`/app2?url=${url}&approver=${approver}`);
  }

  function handleGetToCC(event: React.ChangeEvent<HTMLSelectElement>) {
    let to: string[] = [];
    let cc: string[] = [];
    let type = "";
    // if (indexSubtypes) {
    type = subTypes[0].name;
    // }
    const value = event.target.value;
    setSelectValue(parseInt(value));

    axios
      .get(
        `submission/requirements?submissiont_type=${type}&submission_value=${value}`
      )
      .then((res) => {
        const { data } = res.data;
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
        Swal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      });
  }

  const onSubmit: SubmitHandler<Schema> = (data) => {
    alert(JSON.stringify(data));
    const formData = new FormData();
    let key: keyof typeof data;
    for (key in data) {
      if (key === "attachment") formData.append(key, data[key][0]);
      formData.append(key, data[key]);
    }
    axios
      .put(`submission/${id}`, formData)
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
        <div className="drawer-content flex flex-col h-[90%]">
          <div className="h-full overflow-auto  min-w-[50rem]">
            {loading ? (
              <Loading />
            ) : (
              <CardSubmission
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
                      <div className="input-group rounded-md justify-between w-[40%]">
                        <select
                          {...register("sub_type")}
                          className="select select-bordered"
                          value={data?.submission_type}
                        >
                          <option disabled selected>
                            Submission Type
                          </option>
                          {subTypes.map((dataz) => {
                            return (
                              <option value={dataz.name}>{dataz.name}</option>
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
                            Value
                          </option>
                          {subTypes[0].values.map((dataz) => {
                            return <option value={dataz}>{dataz}</option>;
                          })}
                        </select>
                      </div>
                      <Input
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
                        <Input
                          register={register}
                          name="attachment"
                          type="file"
                          className="w-full "
                          multiple
                        />
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
