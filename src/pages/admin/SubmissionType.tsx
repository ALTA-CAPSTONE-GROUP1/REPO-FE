import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiDeleteBin6Line,
} from "react-icons/ri";
import { BsFillPlusCircleFill, BsPatchMinusFill } from "react-icons/bs";
import { FC, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import axios from "axios";
import * as z from "zod";

import { CardTableSubmissionType } from "@/components/Card";
import { TabSubmisionType } from "@/components/Tab";
import { LayoutAdmin } from "@/components/Layout";
import { Red2Button, RedButton } from "@/components/Button";
import { Input } from "@/components/Input";
import { Position } from "./Position";

const schema = z.object({
  submission_type_name: z
    .string()
    .min(1, { message: "Submission Name is required" }),
  position: z.array(z.string()),
  submission_value: z.array(z.array(z.string())),
  value: z.number(),
  position_to: z.array(z.string()),
  position_cc: z.array(z.string()),
  requirement: z.string(),
});

type Schema = {
  submission_type_name: string;
  position: string[];
  submission_value: string[][];
  value: number;
  position_to: string[];
  position_cc: string[];
  requirement: string;
};

export function SubmissionType() {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      submission_type_name: "",
      position: [],
      submission_value: [[]],
      value: 0,
      position_to: [],
      position_cc: [],
      requirement: "",
    },
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "submission_value",
    }
  );

  const onSubmit = (data: Schema) => {
    console.log(data);
  };

  // const onSubmit: SubmitHandler<Schema> = (data) => {
  //   setLoading(true);
  //   axios
  //     .post("/submission-type", data)
  //     .then((res) => {
  //       const { message, data } = res.data;
  //       if (data) {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Success",
  //           text: message,
  //           showCancelButton: false,
  //         }).then((result) => {
  //           if (result.isConfirmed) {
  //             window.location.reload();
  //           }
  //         });
  //       }
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       const { message } = error.response.data;
  //       Swal.fire({
  //         title: "Failed",
  //         text: message,
  //         showCancelButton: false,
  //       });
  //     });
  //   console.log(Position);
  // };
  // Handle add position
  const [dataPosition, setDataPosition] = useState([{ position: "" }]);
  const handleAddPosition = () => {
    setDataPosition([...dataPosition, "new value"]);
  };
  const handleDeletePosition = (index) => {
    const newPosition = [...dataPosition];
    newPosition.splice(index, 1);
    setDataPosition(newPosition);
  };
  useEffect(() => {
    console.log(dataPosition);
  }, [dataPosition]);

  // Handle add position

  const [dataSubmissionValue, setDataSubmissionValue] = useState([
    "initial value",
  ]);
  const handleAddSubmissionValue = () => {
    setDataSubmissionValue([...dataSubmissionValue, "new value"]);
  };
  const handleDeleteSubmissionValue = (index) => {
    const newSubmissionValue = [...dataSubmissionValue];
    newSubmissionValue.splice(index, 1);
    setDataSubmissionValue(newSubmissionValue);
  };

  // Handle add position to
  const [dataPositionTo, setDataPositionTo] = useState(["initial value"]);
  const handleAddPositionTo = () => {
    setDataPositionTo([...dataPositionTo, "new value"]);
  };
  const handleDeletePositionTo = (index) => {
    const newPositionTo = [...dataPositionTo];
    newPositionTo.splice(index, 1);
    setDataPositionTo(newPositionTo);
  };
  // Handle add position CC
  const [dataPositionCC, setDataPositionCC] = useState(["initial value"]);
  const handleAddPositionCC = () => {
    setDataPositionCC([...dataPositionCC, "new value"]);
  };
  const handleDeletePositionCC = (index) => {
    const newPositionCC = [...dataPositionCC];
    newPositionCC.splice(index, 1);
    setDataPositionCC(newPositionCC);
  };
  // Batassan
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
            <h3 className="text-sm">Submission is a category for proposal </h3>
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

            {dataPosition.map((position, index) => (
              <div className="flex flex-row gap-3" key={index}>
                <div className="mt-5 w-full">
                  <span className="label-text font-bold">Position</span>
                  <select
                    {...register(`position.${index}.position`)}
                    defaultValue={`position.position`}
                    className="border rounded-md bg-white border-@Gray text-black p-2 focus:outline-none w-full"
                    placeholder="Select Position"
                    id={`select-position-${index}`}
                  >
                    <option>Select Position</option>
                    <option>Regional Manager</option>
                    <option>UI Design</option>
                    <option>Backend Developer</option>
                  </select>
                </div>
                <div className="btn-group mt-5">
                  <button
                    className="mt-5  p-3 text-lg rounded-l-lg text-white bg-@Green"
                    onClick={handleAddPosition}
                  >
                    <BsFillPlusCircleFill />
                  </button>
                  <button
                    className="mt-5  p-3 text-lg rounded-r-lg text-white bg-@Red"
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
                {/* <button
                  onClick={(event) => {
                    addSubmissionValue();
                  }}
                >
                  <span className="label-text font-bold text-button  ml-5">
                    + Add Submission Value
                  </span>
                </button> */}
                {dataSubmissionValue.map((submission_value, index) => (
                  <div key={index} className="mt-5">
                    <div className="flex flex-row gap-3">
                      <div className="w-full">
                        <label className="font-semibold text-md text-black">
                          Value
                        </label>
                        <Input
                          register={register}
                          name={`value${index}`}
                          placeholder="Enter Value"
                          id="input-submission-value"
                          error={errors.value?.message}
                        />
                      </div>
                      <div className="btn-group flex justify-center items-center">
                        <button
                          className="mt-5  p-3 text-lg rounded-l-lg text-white bg-@Green"
                          onClick={handleAddSubmissionValue}
                        >
                          <BsFillPlusCircleFill />
                        </button>
                        <button
                          className="mt-5  p-3 text-lg rounded-r-lg text-white bg-@Red"
                          onClick={() => {
                            handleDeleteSubmissionValue(index);
                          }}
                        >
                          <BsPatchMinusFill />
                        </button>
                      </div>
                    </div>
                    <h3 className="md:px-2 mt-5 font-bold text-@Red">
                      NOTE: Sort the positions from the lowest to the highest{" "}
                    </h3>
                    <div className="flex flex-col md:flex-row gap-4 ">
                      <div className="flex flex-col w-full">
                        {dataPositionTo.map((position_to, index) => (
                          <div
                            key={index}
                            className="flex flex-row mt-5  w-full gap-2"
                          >
                            <div className="w-full">
                              <span className="label-text font-bold">
                                Position To
                              </span>
                              <button>
                                <span className="label-text font-bold text-button  ml-5">
                                  + Add Position
                                </span>
                              </button>
                              <select
                                {...register("position_to")}
                                className="border rounded-md bg-white border-@Gray text-black p-2 focus:outline-none w-full"
                                placeholder="Select Position"
                                id="select-position-to"
                              >
                                <option disabled selected>
                                  Select Position
                                </option>
                                <option>Regional Manager</option>
                                <option>UI Design</option>
                                <option>Backend Developer</option>
                              </select>
                            </div>
                            <div className="btn-group flex justify-center items-center">
                              <button
                                className="mt-5  p-3 text-lg rounded-l-lg text-white bg-@Green"
                                onClick={handleAddPositionTo}
                              >
                                <BsFillPlusCircleFill />
                              </button>
                              <button
                                className="mt-5  p-3 text-lg rounded-r-lg text-white bg-@Red"
                                onClick={() => {
                                  handleDeletePositionTo(index);
                                }}
                              >
                                <BsPatchMinusFill />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col w-full">
                        {dataPositionCC.map((position_cc, index) => (
                          <div
                            key={index}
                            className="flex flex-row mt-5  w-full gap-2"
                          >
                            <div className="w-full">
                              <span className="label-text font-bold">
                                Position CC
                              </span>
                              <button>
                                <span className="label-text font-bold text-button  ml-5">
                                  + Add Position
                                </span>
                              </button>
                              <select
                                {...register("position_cc")}
                                className="border rounded-md bg-white border-@Gray text-black p-2 focus:outline-none w-full "
                                placeholder="Select Position"
                                id="select-position-cc"
                              >
                                <option disabled selected>
                                  Select Position
                                </option>
                                <option>Regional Manager</option>
                                <option>UI Design</option>
                                <option>Backend Developer</option>
                              </select>
                            </div>
                            <div className="btn-group flex justify-center items-center">
                              <button
                                className="mt-5  p-3 text-lg rounded-l-lg text-white bg-@Green"
                                onClick={handleAddPositionCC}
                              >
                                <BsFillPlusCircleFill />
                              </button>
                              <button
                                className="mt-5  p-3 text-lg rounded-r-lg text-white bg-@Red"
                                onClick={(e) => {
                                  handleDeletePositionCC(index);
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
          <table className="table w-full border border-@Gray2">
            {/* head */}
            <thead>
              <th className="capitalize bg-@Gray2 text-black">
                Submission Name
              </th>
              <th className="capitalize bg-@Gray2 text-black">Value</th>
              <th className="capitalize bg-@Gray2 text-black">Requirement</th>
              <th className="capitalize  bg-@Gray2 text-black ">
                <div className="flex pr-6 justify-end">Action</div>
              </th>
            </thead>
            <CardTableSubmissionType
              sub_name="Program"
              sub_value="50000000"
              sub_requirement="KTP, NPWP, FILE PENDUKUNG"
              link_del=""
            />
            <CardTableSubmissionType
              sub_name="Program"
              sub_value="50000000"
              sub_requirement="KTP, NPWP, FILE PENDUKUNG"
              link_del=""
            />
            <CardTableSubmissionType
              sub_name="Program"
              sub_value="50000000"
              sub_requirement="KTP, NPWP, FILE PENDUKUNG"
              link_del=""
            />
            <CardTableSubmissionType
              sub_name="Program"
              sub_value="50000000"
              sub_requirement="KTP, NPWP, FILE PENDUKUNG"
              link_del=""
            />
            <CardTableSubmissionType
              sub_name="Program"
              sub_value="50000000"
              sub_requirement="KTP, NPWP, FILE PENDUKUNG"
              link_del=""
            />
            <tbody></tbody>
            {/* foot */}
            <tfoot></tfoot>
          </table>
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
