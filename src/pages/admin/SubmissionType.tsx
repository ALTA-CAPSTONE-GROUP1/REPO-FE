/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  FieldArrayWithId,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { BsFillPlusCircleFill, BsPatchMinusFill } from "react-icons/bs";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import Swal from "sweetalert2";
import axios from "axios";
import * as z from "zod";

import { PositionData, SubmissionDetail, Meta } from "@/utils/types/Admin";
import { TableSubmission } from "@/components/Table";
import { TabSubmisionType } from "@/components/Tab";
import { LayoutAdmin } from "@/components/Layout";
import { RedButton } from "@/components/Button";
import { Input } from "@/components/Input";

const schema = z.object({
  submission_type_name: z
    .string()
    .min(1, { message: "Submission Name is required" }),
  position: z
    .string()
    .array()
    .refine(
      (val) =>
        val.every((el) => {
          return el !== "";
        }),
      {
        message: "Position need to be filled",
      }
    ),
  submission_value: z
    .object({
      value: z.number().min(1, { message: "value cannot be filled with 0" }),
      position_to: z
        .string()
        .array()
        .refine(
          (val) =>
            val.every((el) => {
              return el !== "";
            }),
          {
            message: "Position To need to be filled",
          }
        ),
      position_cc: z
        .string()
        .array()
        .refine(
          (val) =>
            val.every((el) => {
              return el !== "";
            }),
          {
            message: "Position CC need to be filled",
          }
        ),
    })
    .array(),
  requirement: z.string(),
});

type Schema = z.infer<typeof schema>;

export function SubmissionType() {
  const [positionData, setPositionData] = useState<PositionData[]>([]);
  const [dataPosition, setDataPosition] = useState<string[]>([""]);
  const [data, setData] = useState<SubmissionDetail[]>([]);
  const [, setLoading] = useState<boolean>(false);
  const [offSet, setOffSet] = useState<number>(0);
  const [meta, setMeta] = useState<Meta>();

  const [cookie] = useCookies(["token", "user_position"]);

  const limit = 5;

  const {
    setValue,
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      submission_type_name: "",
      position: [""],
      submission_value: [
        {
          value: 0,
          position_to: [""],
          position_cc: [""],
        },
      ],
      requirement: "",
    },
  });

  const {
    fields: fieldsSubVal,
    append: appendSubVal,
    remove: removeSubVal,
    update: updateSubVal,
  } = useFieldArray({
    control,
    name: "submission_value",
  });

  const onSubmit: SubmitHandler<Schema> = (data) => {
    setLoading(true);
    axios
      .post("/submission-type", data, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { message } = res.data;
        Swal.fire({
          icon: "success",
          title: "Success",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setValue("submission_type_name", "");
            setValue("position", []);
            setValue("submission_value", []);
            setValue("requirement", "");
          }
        });
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(fetchData);
  };

  useEffect(() => {
    fetchDataPositions();
    fetchData();
  }, []);

  const fetchData = async () => {
    axios
      .get(`submission-type?limit=${limit}&offset=${offSet}`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((response) => {
        const { data, meta } = response.data;
        const submissionData = data.submission_type;
        const submissionDetails = submissionData.reduce(
          (acc: any, submission: any) => {
            submission.submission_detail.forEach((detail: any) => {
              const submissionDetail = {
                submission_type_name: submission.submission_type_name,
                submission_value: detail.submission_value,
                submission_requirement: detail.submission_requirement,
              };
              acc.push(submissionDetail);
            });
            return acc;
          },
          []
        );
        setData(submissionDetails);
        setMeta(meta);
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchDataPositions = async () => {
    axios
      .get("position?limit=50", {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        setPositionData(data);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  };

  function handleDelete(submission_type_name: string) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`submission-type?submission_type=${submission_type_name}`, {
              headers: {
                Authorization: `Bearer ${cookie.token}`,
              },
            })
            .then((response) => {
              const { message } = response.data;
              Swal.fire({
                icon: "success",
                title: "Success",
                text: message,
                showCancelButton: false,
              });
            })
            .catch((error) => {
              const { data } = error.response;
              Swal.fire({
                icon: "error",
                title: "Failed",
                text: data.message,
                showCancelButton: false,
              });
            });
          console.log(data);
        }
      })
      .finally(fetchData);
  }

  function handlePage(page: number) {
    setOffSet(page);
  }

  const handleAddPosition = () => {
    setDataPosition([...dataPosition, ""]);
  };

  const handleDeletePosition = (index: number) => {
    const newPosition = [...dataPosition];
    newPosition.splice(index, 1);
    setDataPosition(newPosition);
  };

  const handleAddSubmissionValue = () => {
    appendSubVal({
      value: 0,
      position_to: [""],
      position_cc: [""],
    });
  };

  const handleDeleteSubmissionValue = (index: number) => {
    removeSubVal(index);
  };

  const handleAddPositionTo = (
    index: number,
    data: FieldArrayWithId<Schema>
  ) => {
    const newData = {
      ...data,
      position_to: [...data.position_to, ""],
    };
    updateSubVal(index, newData);
  };

  const handleDeletePositionTo = (
    index: number,
    idx: number,
    data: FieldArrayWithId<Schema>
  ) => {
    const newPositionTo = [...data.position_to];
    newPositionTo.splice(idx, 1);
    const newData = {
      ...data,
      position_to: newPositionTo,
    };
    updateSubVal(index, newData);
  };

  const handleAddPositionCC = (
    index: number,
    data: FieldArrayWithId<Schema>
  ) => {
    const newData = {
      ...data,
      position_cc: [...data.position_cc, ""],
    };
    updateSubVal(index, newData);
  };

  const handleDeletePositionCC = (
    index: number,
    idx: number,
    data: FieldArrayWithId<Schema>
  ) => {
    const newPositionCC = [...data.position_cc];
    newPositionCC.splice(idx, 1);
    const newData = {
      ...data,
      position_cc: newPositionCC,
    };
    updateSubVal(index, newData);
  };

  return (
    <LayoutAdmin>
      <div
        className="max-w-[85rem] w-full mx-auto bg-white"
        aria-label="Global"
      >
        <TabSubmisionType />
        <form
          className="flex flex-col p-4 bg-white rounded-md "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-3">
            <h3 className="font-bold text-2xl text-black">
              Add Submission Type
            </h3>
            <h3 className="text-sm">Submission is a category for proposal</h3>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">
                Submission Name
              </label>
              <Input
                register={register}
                name="submission_type_name"
                placeholder="Enter Submission Name"
                id="input-submission-type-name"
                error={errors.submission_type_name?.message}
              />
            </div>
            <div className="flex gap-2 mt-5">
              <div>
                <span className="label-text font-bold">Position</span>
              </div>
              <button onClick={handleAddPosition}>
                <span className="label-text text-2xl font-extrabold text-button">
                  <BsFillPlusCircleFill />
                </span>
              </button>
            </div>
            {dataPosition.map((_position, index) => (
              <div className="flex flex-row" key={index}>
                <div className="mt-5 w-full">
                  <div>
                    <select
                      {...register(`position.${index}`)}
                      className="border rounded-l-lg bg-white border-@Gray text-black p-2 focus:outline-none w-full"
                      id={`select-position-${index}`}
                    >
                      <option value="" disabled>
                        Select Position
                      </option>
                      {positionData.map((pos) => (
                        <option value={pos.tag}>{pos.position}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="btn-group mt-5">
                  <button
                    className="p-3 text-lg rounded-r-lg text-white bg-@Red"
                    onClick={() => {
                      handleDeletePosition(index);
                    }}
                  >
                    <BsPatchMinusFill />
                  </button>
                </div>
              </div>
            ))}

            <div className="sub-form">
              <div className="mt-5 w-full">
                <div className="flex gap-2">
                  <button onClick={handleAddSubmissionValue}>
                    <span className="label-text text-lg font-extrabold text-button">
                      Add Submission value
                    </span>
                  </button>
                </div>
                {fieldsSubVal.map((fieldSubVal, index) => (
                  <div key={fieldSubVal.id} className="mt-5">
                    <div className="flex flex-row">
                      <div className="w-full">
                        <label className="font-semibold text-md text-black">
                          Value
                        </label>
                        <Input
                          className="border rounded-l-lg bg-white border-slate-400 text-black p-2 focus:outline-none focus:border-blue-900 focus:ring-1 focus:ring-blue-900 w-full"
                          register={register}
                          name={`submission_value.${index}.value`}
                          placeholder="Enter Value"
                          id={`input-submission-value-${index}`}
                          valueAsNumber={true}
                          error={
                            errors.submission_value?.[index]?.value?.message
                          }
                        />
                      </div>
                      <div className="btn-group flex justify-center items-center">
                        <button
                          className="mt-6 p-3 text-lg rounded-r-lg text-white bg-@Red"
                          onClick={() => {
                            handleDeleteSubmissionValue(index);
                          }}
                        >
                          <BsPatchMinusFill />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 ">
                      <div className="flex flex-col w-full">
                        <div className="mt-5 flex gap-2">
                          <div>
                            <span className="label-text font-bold">
                              Position To
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              handleAddPositionTo(index, fieldSubVal)
                            }
                          >
                            <span className="label-text text-2xl font-extrabold text-button">
                              <BsFillPlusCircleFill />
                            </span>
                          </button>
                        </div>
                        {fieldSubVal.position_to.map((_position_to, idx) => (
                          <div key={idx} className="flex flex-row mt-5  w-full">
                            <div className="w-full">
                              <select
                                {...register(
                                  `submission_value.${index}.position_to.${idx}`
                                )}
                                className="border rounded-l-lg bg-white border-@Gray text-black p-2 focus:outline-none w-full"
                                id={`select-${index}-position-to-${idx}`}
                              >
                                <option value="" disabled>
                                  Select Position
                                </option>
                                {positionData.map((pos) => (
                                  <option value={pos.tag}>
                                    {pos.position}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="btn-group flex justify-center items-center">
                              <button
                                className="p-3 text-lg rounded-r-lg text-white bg-@Red"
                                onClick={() =>
                                  handleDeletePositionTo(
                                    index,
                                    idx,
                                    fieldSubVal
                                  )
                                }
                              >
                                <BsPatchMinusFill />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col w-full">
                        <div className="mt-5 flex gap-3">
                          <div>
                            <span className="label-text font-bold">
                              Position CC
                            </span>
                          </div>
                          <button
                            onClick={() =>
                              handleAddPositionCC(index, fieldSubVal)
                            }
                          >
                            <span className="label-text text-2xl font-extrabold text-button">
                              <BsFillPlusCircleFill />
                            </span>
                          </button>
                        </div>
                        {fieldSubVal.position_cc.map((_position_cc, idx) => (
                          <div key={idx} className="flex flex-row mt-5  w-full">
                            <div className="w-full">
                              <select
                                {...register(
                                  `submission_value.${index}.position_cc.${idx}`
                                )}
                                className="border rounded-l-lg bg-white border-@Gray text-black p-2 focus:outline-none w-full "
                                id={`select-${index}-position-cc-${idx}`}
                              >
                                <option value="" disabled>
                                  Select Position
                                </option>
                                {positionData.map((pos) => (
                                  <option value={pos.tag}>
                                    {pos.position}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="btn-group flex justify-center items-center">
                              <button
                                className="p-3 text-lg rounded-r-lg text-white bg-@Red"
                                onClick={() => {
                                  handleDeletePositionCC(
                                    index,
                                    idx,
                                    fieldSubVal
                                  );
                                }}
                              >
                                <BsPatchMinusFill />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">
                Requirement
              </label>
              <Input
                register={register}
                name="requirement"
                placeholder="Enter Requirement"
                id="input-requirement"
                error={errors.requirement?.message}
              />
            </div>
            {/* batsan */}
            <h3 className="md:px-2 mt-5 font-bold text-@Red">
              NOTE: Sort the positions from the lowest to the highest{" "}
            </h3>
            <div className="mt-5 w-full">
              <RedButton
                label="Submit"
                id="button-add-submission-type"
                type="submit"
              />
            </div>
          </div>
        </form>

        <div className="overflow-x-auto w-full p-6 mt-20 hidden md:block">
          <TableSubmission
            data={data}
            onClickDelete={(submissionTypeName) =>
              handleDelete(submissionTypeName)
            }
          />
          <div className="flex flex-row p-2 bg-white text-black border rounded-es-md rounded-ee-md justify-between items-center">
            <button
              className="btn btn-ghost btn-xl text-xl text-@Gray capitalize border border-@Gray rounded-md"
              disabled={meta?.current_page === 1}
              onClick={() => handlePage(offSet - 5)}
            >
              <RiArrowLeftLine /> Previous
            </button>
            <div className="btn-group">
              {Array.from({ length: meta?.total_page || 0 }, (_, index) => (
                <button
                  key={index}
                  className={`btn btn-ghost ${
                    meta?.current_page === index + 1 ? "bg-@Red2" : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button
              className="btn btn-ghost btn-xl text-xl text-@Gray capitalize border border-@Gray rounded-md"
              disabled={meta?.current_page === meta?.total_page}
              onClick={() => handlePage(offSet + 5)}
            >
              Next <RiArrowRightLine />
            </button>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
