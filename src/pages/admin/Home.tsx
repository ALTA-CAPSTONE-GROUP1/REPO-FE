import { BsQuestionCircle, BsSearch } from "react-icons/bs";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState, useEffect } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";
import * as z from "zod";

import {
  OfficeData,
  PositionData,
  UserData,
  UserDataUpdate,
} from "@/utils/types/Admin";
import { LayoutAdmin } from "@/components/Layout";
import { RedButton } from "@/components/Button";
import { TabUser } from "@/components/Tab";
import { Input } from "@/components/Input";
import { TableUsers } from "@/components/Table";

const schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  hp: z.string().min(1, { message: "No HP is required" }),
  position: z.string(),
  office: z.string(),
});

type Schema = z.infer<typeof schema>;

export function HomeAdmin() {
  const [positionData, setPositionData] = useState<PositionData[]>([]);
  const [officeData, setOfficeData] = useState<OfficeData[]>([]);
  const [data, setData] = useState<UserData[]>([]);
  const [dataUpdate, setDataUpdate] = useState<Partial<UserDataUpdate>>({});
  const [loading, setLoading] = useState<boolean>(false);

  const params = useParams();
  const { user_id } = params;

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
      .post("users", data)
      .then((response) => {
        const { message, data } = response.data;
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

  useEffect(() => {
    fetchDataPositions();
    fetchDataOffices();
    fetchData();
  }, []);

  const fetchData = async () => {
    axios
      .get("users")
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
  };

  useEffect(() => {
    const fetchDataUpdate = async () => {
      try {
        const response = await axios.get(`users/${user_id}`);
        const { data } = response.data;
        setDataUpdate(data);
      } catch (error: any) {
        alert(error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchDataUpdate();
  }, [user_id]);

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

  const fetchDataOffices = async () => {
    axios
      .get("office")
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
                name="hp"
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
                {...register("position")}
                className="border rounded-md bg-white border-@Gray text-black p-2 focus:outline-none w-full"
                placeholder="Select Position"
                id="select-position"
              >
                <option disabled selected>
                  Select Position
                </option>
                {positionData.map((pos) => (
                  <option>{pos.position}</option>
                ))}
              </select>
            </div>

            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">Office</label>
              <select
                {...register("office")}
                className="border rounded-md bg-white border-@Gray text-black p-2 focus:outline-none w-full"
                placeholder="Select Office"
                id="select-Office"
              >
                <option disabled selected>
                  Select Office
                </option>
                {officeData.map((office) => (
                  <option>{office.office_name}</option>
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

        <div>
          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />

          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor={`my-modal-3`}
                // htmlFor={`my-modal-update-${user_id}`}
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <form className="flex flex-col p-4 bg-white rounded-md ">
                <img src="/images/Logo2.png" alt="" />
                <div className="mt-3">
                  <h3 className="font-bold text-2xl text-black">Update User</h3>
                  <h3 className="text-sm">Update detail user </h3>
                  <div className="mt-5 w-full">
                    <label className="font-semibold text-md text-black">
                      Name
                    </label>
                    <Input
                      register={register}
                      name="name"
                      placeholder="Enter Name"
                      id="input-name"
                      defaultValue={dataUpdate.name}
                    />
                  </div>
                  <div className="mt-5 w-full">
                    <label className="font-semibold text-md text-black">
                      Email
                    </label>
                    <Input
                      register={register}
                      name="email"
                      placeholder="Enter Email"
                      id="input-email"
                      type="email"
                    />
                  </div>
                  <div className="mt-5 w-full">
                    <label className="font-semibold text-md text-black">
                      No Hp
                    </label>
                    <Input
                      register={register}
                      name="hp"
                      placeholder="Enten Phone Number"
                      id="input-no-hp"
                    />
                  </div>
                  <div className="mt-5 w-full">
                    <label className="font-semibold text-md text-black">
                      Position
                    </label>
                    <select
                      className="border rounded-md bg-white border-@Gray text-black p-2 focus:outline-none w-full"
                      placeholder="Select Position"
                      id="select-position"
                    >
                      <option disabled selected>
                        Select Position
                      </option>
                      {positionData.map((pos) => (
                        <option>{pos.position}</option>
                      ))}{" "}
                    </select>
                  </div>
                  <div className="mt-5 w-full">
                    <label className="font-semibold text-md text-black">
                      Office
                    </label>
                    <select
                      className="border rounded-md bg-white border-@Gray text-black p-2 focus:outline-none w-full"
                      placeholder="Select Office"
                      id="select-Office"
                    >
                      <option disabled selected>
                        Select Office
                      </option>
                      {officeData.map((office) => (
                        <option>{office.office_name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-5 w-full">
                    <label className="font-semibold text-md text-black">
                      Password
                    </label>
                    <Input
                      register={register}
                      name="password"
                      placeholder="Enten Password"
                      id="input-password"
                    />
                  </div>
                  <div className="mt-5">
                    <RedButton
                      label="Update User"
                      id="button-update-user"
                      type="submit"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto w-full p-6 mt-20 hidden md:block">
          <div className="flex flex-row p-2 bg-@Red2 text-black rounded-ss-md rounded-se-md justify-between items-center">
            <p className="font-bold">Team Members</p>

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
          <TableUsers dataUsers={data} />
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

export default HomeAdmin;
