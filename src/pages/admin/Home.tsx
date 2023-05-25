/* eslint-disable react-hooks/exhaustive-deps */
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import Swal from "sweetalert2";
import axios from "axios";
import * as z from "zod";

import { OfficeData, PositionData, UserData, Meta } from "@/utils/types/Admin";
import { LayoutAdmin } from "@/components/Layout";
import { TableUsers } from "@/components/Table";
import { RedButton } from "@/components/Button";
import { TabUser } from "@/components/Tab";
import { Input } from "@/components/Input";

const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  phone_number: z.string().min(1, { message: "No HP is required" }),
  office_id: z.string(),
  position_id: z.string(),
});

type Schema = z.infer<typeof schema>;

export function HomeAdmin() {
  const [positionData, setPositionData] = useState<PositionData[]>([]);
  const [officeData, setOfficeData] = useState<OfficeData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<UserData[]>([]);
  const [offSet, setOffSet] = useState<number>(0);
  const [meta, setMeta] = useState<Meta>();

  const [cookie] = useCookies(["token", "user_position"]);

  const limit = 5;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = (data) => {
    const positionID = parseInt(data.position_id);
    const officeID = parseInt(data.office_id);

    const newData = { ...data, position_id: positionID, office_id: officeID };

    setLoading(true);
    axios
      .post("users", newData, {
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
        }).then((result) => {
          if (result.isConfirmed) {
            setValue("email", "");
            setValue("phone_number", "");
            setValue("name", "");
            setValue("office_id", "Select Office");
            setValue("position_id", "Select Position");
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

  useEffect(() => {
    fetchDataPositions();
    fetchDataOffices();
    fetchData();
  }, [offSet]);

  const fetchData = async () => {
    axios
      .get(`users?limit=${limit}&offset=${offSet}`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((response) => {
        const { data, meta } = response.data;
        setData(data);
        setMeta(meta);
      })
      .catch((error) => {
        alert(error.toString());
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchDataPositions = async () => {
    axios
      .get(`position?limit=50`, {
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

  const fetchDataOffices = async () => {
    axios
      .get("office?limit=50", {
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

  function handleDelete(id: string) {
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
            .delete(`users/${id}`, {
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
        }
      })
      .finally(fetchData);
  }

  function handlePage(page: number) {
    setOffSet(page);
  }

  return (
    <LayoutAdmin>
      <div
        className="max-w-[85rem] w-full mx-auto bg-white"
        aria-label="Global"
      >
        <TabUser />
        <form
          className="flex flex-col p-4 bg-white rounded-md "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-3">
            <h3 className="font-bold text-2xl text-black">Add User</h3>
            <h3 className="text-sm">Create new user </h3>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">Name</label>
              <Input
                register={register}
                name="name"
                placeholder="Enter Name"
                id="input-name"
                error={errors.name?.message}
              />
            </div>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">Email</label>
              <Input
                register={register}
                name="email"
                placeholder="Enter Email"
                id="input-email"
                type="email"
                error={errors.email?.message}
              />
            </div>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">No Hp</label>
              <Input
                register={register}
                name="phone_number"
                placeholder="Enten Phone Number"
                id="input-no-hp"
                error={errors.name?.message}
              />
            </div>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">
                Position
              </label>

              <select
                {...register("position_id")}
                className="border rounded-md bg-white border-@Gray text-black p-2 focus:outline-none w-full"
                placeholder="Select Position"
                id="select-position"
              >
                <option disabled selected>
                  Select Position
                </option>
                {positionData?.map((pos) => (
                  <option value={pos.position_id}>{pos.position}</option>
                ))}
              </select>
            </div>

            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">Office</label>
              <select
                {...register("office_id")}
                className="border rounded-md bg-white border-@Gray text-black p-2 focus:outline-none w-full"
                placeholder="Select Office"
                id="select-Office"
              >
                <option disabled selected>
                  Select Office
                </option>
                {officeData?.map((office) => (
                  <option value={office.ID}>{office.Name}</option>
                ))}
              </select>
            </div>
            <div className="mt-5">
              <RedButton
                label="Add User"
                id="button-add-user"
                type="submit"
                disabled={loading}
              />
            </div>
          </div>
        </form>

        <div className="overflow-x-auto w-full p-6 mt-20 hidden md:block">
          <TableUsers
            dataUsers={data}
            onclickDelete={(id) => handleDelete(id)}
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

export default HomeAdmin;
