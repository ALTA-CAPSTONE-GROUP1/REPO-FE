/* eslint-disable react-hooks/exhaustive-deps */
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import { FC, useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Swal from "sweetalert2";
import axios from "axios";
import * as z from "zod";

import { LayoutAdmin } from "@/components/Layout";
import { OfficeData } from "@/utils/types/Admin";
import { RedButton } from "@/components/Button";
import { TabOffice } from "@/components/Tab";
import { Input } from "@/components/Input";
import { TableOffice } from "@/components/Table";
import { useCookies } from "react-cookie";

const schema = z.object({
  name: z.string(),
});

type Schema = z.infer<typeof schema>;

export const Office: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [officeData, setOfficeData] = useState<OfficeData[]>([]);
  const [cookie] = useCookies(["token", "user_position"]);

  const { register, handleSubmit } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = (data) => {
    setLoading(true);
    axios
      .post("office", data, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
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
      .finally(() => setLoading(false))
      .finally(() => {
        fetchDataOffices();
      });
  };
  useEffect(() => {
    fetchDataOffices();
  }, []);
  const fetchDataOffices = async () => {
    axios
      .get("office", {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        setOfficeData(data);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`office?id=${id}`, {
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
            }).finally(fetchDataOffices);
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
      }
    });
  };

  return (
    <LayoutAdmin>
      <div
        className="max-w-[85rem] w-full mx-auto bg-white"
        aria-label="Global"
      >
        <TabOffice />
        <form
          className="flex flex-col p-4 bg-white rounded-md "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-3">
            <h3 className="font-bold text-2xl text-black">Add Office</h3>
            <h3 className="text-sm">
              The office determines the place or location of work
            </h3>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="mt-5 w-full">
                <label className="font-semibold text-md text-black">
                  Office
                </label>
                <Input
                  register={register}
                  name="name"
                  placeholder="Enter Office Location"
                  id="input-office-location"
                />
              </div>
              <div className="mt-5 md:mt-10 w-full md:w-40">
                <RedButton
                  label="+ Add"
                  id="button-add-office-location"
                  type="submit"
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        </form>

        <div className="overflow-x-auto w-full p-6 mt-20 hidden md:block">
          <div className="flex flex-row p-2 bg-@Red2 text-black rounded-ss-md rounded-se-md justify-between items-center">
            <p className="font-bold">Office List</p>

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
          {officeData ? (
            <TableOffice
              data={officeData}
              onClickDelete={(id) => handleDelete(id)}
            />
          ) : (
            ""
          )}

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
