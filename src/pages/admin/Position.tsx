/* eslint-disable react-hooks/exhaustive-deps */
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import * as z from "zod";

import { LayoutAdmin } from "@/components/Layout";
import { TabPosition } from "@/components/Tab";
import { RedButton } from "@/components/Button";
import { Input } from "@/components/Input";
import { PositionData } from "@/utils/types/Admin";
import { TablePosition } from "@/components/Table";
import { useCookies } from "react-cookie";

const schema = z.object({
  position: z.string().min(1, { message: "Position is required" }),
  tag: z.string(),
});

type Schema = z.infer<typeof schema>;

export const Position: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cookie] = useCookies(["token", "user_position"]);
  const [data, setData] = useState<PositionData[]>([]);

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    fetchData();
  }, []);
  const onSubmit: SubmitHandler<Schema> = (data) => {
    setLoading(true);
    axios
      .post("position", data, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { message } = res.data;
        Swal.fire({
          title: "Success",
          text: message,
          showCancelButton: false,
        }).then((result) => {
          if (result.isConfirmed) {
            setValue("position", "");
            setValue("tag", "");
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
      .finally(() => setLoading(false))
      .finally(fetchData);
  };

  //get data in table

  function fetchData() {
    axios
      .get("position?limit=50", {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
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
  }

  function handleDelete(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`position?position_id=${id}`, {
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
            }).finally(fetchData);
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
  }

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
          <TablePosition data={data} onClickDelete={(id) => handleDelete(id)} />
        </div>
      </div>
    </LayoutAdmin>
  );
};
