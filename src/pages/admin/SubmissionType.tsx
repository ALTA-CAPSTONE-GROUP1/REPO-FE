import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiDeleteBin6Line,
} from "react-icons/ri";
import { BsFillPlusCircleFill, BsPatchMinusFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import {
  useForm,
  useFieldArray,
  FieldArrayWithId,
  SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import axios from "axios";
import * as z from "zod";

import { CardTableSubmissionType } from "@/components/Card";
import { TabSubmisionType } from "@/components/Tab";
import { LayoutAdmin } from "@/components/Layout";
import { RedButton } from "@/components/Button";
import { Input, SelectForm } from "@/components/Input";
import {
  PositionData,
  SubmissionData,
  SubmissionDetail,
} from "@/utils/types/Admin";
import { TableSubmission } from "@/components/Table";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<SubmissionDetail[]>([]);

  const {
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

  // const onSubmit = (data: Schema) => {
  //   console.log(data);
  // };

  const onSubmit: SubmitHandler<Schema> = (data: Schema) => {
    setLoading(true);
    axios
      .post("/submission-type", data)
      .then((res) => {
        const { message, data } = res.data;
        if (data) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: message,
            showCancelButton: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
        }
        console.log(data);
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      });
    console.log(data);
  };
  // Handle add position

  useEffect(() => {
    fetchDataPositions();
    fetchData();
  }, []);

  const [submissionData, setSubmissionData] = useState<SubmissionDetail[]>([]);
  const fetchData = async () => {
    try {
      const response = await axios.get("submission-type");
      const { data } = response.data;

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

      console.log(submissionDetails);

      setData(submissionDetails);
    } catch (error) {
      alert(errors.toString());
    } finally {
      setLoading(false);
    }
  };
  // const fetchData = async () => {
  //   axios
  //     .get("submission-type")
  //     .then((response) => {
  //       const { data } = response.data;
  //       setData(data);
  //     })
  //     .catch((error) => {
  //       alert(error.toString());
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // };

  const fetchDataPositions = async () => {
    axios
      .get("position")
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

  const handleDeleteRow = (row: SubmissionDetail) => {
    // Implementasikan logika penghapusan data di sini
    console.log("Menghapus data:", row);
  };

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
            {dataPosition.map((position, index) => (
              <div className="flex flex-row" key={index}>
                <div className="mt-5 w-full">
                  <div>
                    <select
                      {...register(`position.${index}`)}
                      className="border rounded-l-lg bg-white border-@Gray text-black p-2 focus:outline-none w-full"
                      id={`select-position-${index}`}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Position
                      </option>
                      {positionData.map((pos) => (
                        <option>{pos.position}</option>
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
                        {fieldSubVal.position_to.map((position_to, idx) => (
                          <div key={idx} className="flex flex-row mt-5  w-full">
                            <div className="w-full">
                              <select
                                {...register(
                                  `submission_value.${index}.position_to.${idx}`
                                )}
                                className="border rounded-l-lg bg-white border-@Gray text-black p-2 focus:outline-none w-full"
                                id={`select-${index}-position-to-${idx}`}
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Select Position
                                </option>
                                {positionData.map((pos) => (
                                  <option>{pos.position}</option>
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
                        {fieldSubVal.position_cc.map((position_cc, idx) => (
                          <div key={idx} className="flex flex-row mt-5  w-full">
                            <div className="w-full">
                              <select
                                {...register(
                                  `submission_value.${index}.position_cc.${idx}`
                                )}
                                className="border rounded-l-lg bg-white border-@Gray text-black p-2 focus:outline-none w-full "
                                id={`select-${index}-position-cc-${idx}`}
                                defaultValue=""
                              >
                                <option value="" disabled>
                                  Select Position
                                </option>
                                {positionData.map((pos) => (
                                  <option>{pos.position}</option>
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
          <div className="flex flex-row p-2 bg-@Red2 text-black rounded-ss-md rounded-se-md justify-between items-center">
            <p className="font-bold">Submission Type List</p>

            <label className="relative block flex-initial w-64 rounded-full ">
              <Input
                className="rounded-full placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-@Red focus:ring-@Red focus:ring-1 sm:text-sm"
                placeholder="Search for anything..."
                type="text"
                name="search"
              />
              <span className="sr-only">Search</span>
              <span className="absolute inset-y-0 right-4 flex justify-end items-center pl-2">
                <BsSearch className="h-5 w-5 font-bold" />
              </span>
            </label>
          </div>

          <TableSubmission data={data} />

          <div className="flex flex-row p-2 bg-white text-black border rounded-es-md rounded-ee-md justify-between items-center">
            <button className="btn btn-ghost btn-xl text-xl text-@Gray capitalize border border-@Gray rounded-md">
              <RiArrowLeftLine /> Previous
            </button>
            <div className="btn-group">
              <button className="btn btn-ghost bg-@Red2">1</button>
              <button className="btn btn-ghost">2</button>
              <button className="btn btn-ghost ">...</button>
              <button className="btn btn-ghost">99</button>
              <button className="btn btn-ghost">100</button>
            </div>
            <button className="btn btn-ghost btn-xl text-xl text-@Gray capitalize border border-@Gray rounded-md">
              Next <RiArrowRightLine />
            </button>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
}
