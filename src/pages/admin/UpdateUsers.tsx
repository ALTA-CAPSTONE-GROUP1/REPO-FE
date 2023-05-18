/* eslint-disable react-hooks/exhaustive-deps */
import { json, useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";
import * as z from "zod";

import { OfficeData, PositionData } from "@/utils/types/Admin";
import { UserDataUpdate } from "@/utils/types/Admin";
import { LayoutAdmin } from "@/components/Layout";
import { RedButton } from "@/components/Button";
import { TabUser } from "@/components/Tab";
import { Input } from "@/components/Input";
import { Position } from "./Position";

const schema = z.object({
  password: z.string().min(6, { message: "Password is mininum 6 character" }),
  email: z.string().min(1, { message: "Email is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  phone_number: z.string().min(1, { message: "No HP is required" }),
  position_id: z.string(),
  office_id: z.string(),
});

type Schema = z.infer<typeof schema>;

export function UpdateUsers() {
  const [positionData, setPositionData] = useState<PositionData[]>([]);
  const [officeData, setOfficeData] = useState<OfficeData[]>([]);
  const [data] = useState<UserDataUpdate | null>(null);
  // const [position, setPosition] = useState<string>("");
  const [idPosition, setIdPosition] = useState<number>(0);
  // const [office, setOffice] = useState<string>("");
  const [, setLoading] = useState<boolean>(false);
  const [cookie] = useCookies(["token"]);
  const { user_id } = useParams();
  const getToken = cookie.token;
  const navigate = useNavigate();
  let position = "";

  const {
    getValues,
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

  const fetchData = async () => {
    axios
      .get(`users/${user_id}`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setValue("name", data.name);
        setValue("email", data.email);
        setValue("phone_number", data.phone_number);
        setValue("password", data.password);
        position = data.position;
        // setOffice(data.office);
      })
      .catch((err) => {
        const { data } = err.response;
        Swal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(fetchDataPositions)
      .finally(() => setLoading(false));
  };

  const fetchDataPositions = async () => {
    axios
      .get("position", {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((response) => {
        const { data } = response.data;
        setPositionData(data);
        console.log(data);
        const filterPosition = data.filter(
          (item: any) => item.position === position
        );
        console.log(data);
        alert(JSON.stringify(filterPosition[0].position_id));
        setIdPosition(filterPosition[0].position_id);
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

  const onSubmit: SubmitHandler<Schema> = (data) => {
    const postionID = parseInt(data.position_id);
    const officeID = parseInt(data.office_id);

    const newData = { ...data, position_id: postionID, office_id: officeID };

    setLoading(true);
    axios
      .put(`users/${user_id}`, newData, {
        headers: {
          Authorization: `Bearer ${getToken}`,
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
            navigate("/admin");
          }
        });
      })
      .catch((error) => {
        const { data } = error.response;
        Swal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => fetchData());
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
            <h3 className="font-bold text-2xl text-black">Update User</h3>
            <h3 className="text-sm">Update detail user </h3>
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
                id="input-no-phone_number"
                error={errors.phone_number?.message}
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
                <option value={idPosition} disabled selected>
                  {position}
                </option>
                {positionData.map((pos) => (
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
                {officeData.map((office) => (
                  <option value={office.ID}>{office.Name}</option>
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
                error={errors.password?.message}
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
    </LayoutAdmin>
  );
}

export default UpdateUsers;
