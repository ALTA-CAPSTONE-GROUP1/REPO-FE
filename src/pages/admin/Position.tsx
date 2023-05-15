import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiDeleteBin6Line,
} from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import React, { FC, useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import axios from "axios";
import * as z from "zod";
import { useTable } from "react-table";

import { CardTablePosition } from "@/components/Card";
import { LayoutAdmin } from "@/components/Layout";
import { TabPosition } from "@/components/Tab";
import { RedButton } from "@/components/Button";
import { Input } from "@/components/Input";
import { PositionData } from "@/utils/types/Admin";
import { TablePosition } from "@/components/Table";

const schema = z.object({
  position: z.string().min(1, { message: "Position is required" }),
  tag: z.string(),
});

type Schema = z.infer<typeof schema>;

export const Position: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { position_id } = useParams();
  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = (data) => {
    setLoading(true);
    axios
      .post("position", data)
      .then((res) => {
        const { message, data } = res.data;
        if (data) {
          Swal.fire({
            title: "Success",
            text: message,
            showCancelButton: false,
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
            console.log(result);
          });
        }
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  //get data in table
  const [data, setData] = useState<PositionData[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios
      .get("position")
      .then((response) => {
        const { data } = response.data;
        setData(data);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => {
        setLoading(false);
      });
    console.log(data);
  };
  // const data = React.useMemo(() => "position", []);

  // useEffect(() => {
  //   fetch();
  // }, []);

  // function fetch() {
  //   axios
  //     .get("position")
  //     .then((res) => {
  //       const { data } = res.data;
  //       setDatas(data);
  //     })
  //     .catch((err) => {
  //       const { message } = err.response;
  //       Swal.fire({
  //         title: "Failed",
  //         text: message,
  //         showCancelButton: false,
  //       });
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }

  return (
    <LayoutAdmin>
      <div
        className="max-w-[85rem] w-full mx-auto bg-white"
        aria-label="Global"
      >
        <TabPosition />
        <form
          className="flex flex-col p-4 bg-white rounded-md "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-3">
            <h3 className="font-bold text-2xl text-black">Add Position</h3>
            <h3 className="text-sm">
              The new employee's responsibilities will include a new role tag
              for social media management
            </h3>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="mt-5 w-full">
                <label className="font-semibold text-md text-black">
                  Position
                </label>
                <Input
                  register={register}
                  name="position"
                  placeholder="Enter Position"
                  id="input-position"
                  error={errors.position?.message}
                />
              </div>
              <div className="mt-5 w-full">
                <label className="font-semibold text-md text-black">Tag</label>
                <Input
                  register={register}
                  name="tag"
                  placeholder="Enter Tag"
                  id="input-tag"
                  error={errors.tag?.message}
                />
              </div>
              <div className="flex items-center justify-center mt-5 md:mt-10 w-full md:w-80">
                <RedButton
                  label="+ Add"
                  id="button-add-position"
                  type="submit"
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </form>

        <div className="overflow-x-auto w-full p-6 mt-20 hidden md:block">
          <div className="flex flex-row p-2 bg-@Red2 text-black rounded-ss-md rounded-se-md justify-between items-center">
            <p className="font-bold">Position List</p>

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
          <TablePosition data={data} />
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
};
