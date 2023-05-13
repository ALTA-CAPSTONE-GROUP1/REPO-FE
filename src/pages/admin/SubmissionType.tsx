import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import { FC, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import axios from "axios";
import * as z from "zod";

import { CardTableSubmissionType } from "@/components/Card";
import { TabSubmisionType } from "@/components/Tab";
import { LayoutAdmin } from "@/components/Layout";
import { RedButton } from "@/components/Button";
import { Input } from "@/components/Input";

const schema = z.object({
  name: z
    .string()
    .min(5, { message: "Submission name is 5 minimum character" }),
  value: z.string().min(5, { message: "Submission value is required" }),
  position_to: z.string(),
  position_cc: z.string(),
  requirement: z
    .string()
    .max(50, { message: "Submission requirement is max 50 character" }),
});

type Schema = z.infer<typeof schema>;

interface ticketCategoriesType {
  ticket_category: string;
  ticket_price: number;
  ticket_quantity: number;
}

export function SubmissionType() {
  const [loading, setLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = (data) => {
    setLoading(true);
    axios
      .post("submission-type", data)
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
            <h3 className="text-sm">Submission is a category for proposal </h3>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">
                Submission Name
              </label>
              <Input
                register={register}
                name="name"
                placeholder="Enter Submission Name"
                id="input-submission-type-name"
                error={errors.name?.message}
              />
            </div>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">Value</label>
              <Input
                register={register}
                name="value"
                placeholder="Enter Value"
                id="input-submission-value"
                error={errors.value?.message}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="mt-5 w-full">
                <span className="label-text font-bold">Position To</span>
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
              <div className="mt-5 w-full">
                <span className="label-text font-bold">Position CC</span>
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
              <input
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
