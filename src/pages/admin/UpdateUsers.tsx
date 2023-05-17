import { useNavigate, useParams } from "react-router-dom";
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

const schema = z.object({
  password: z.string().min(6, { message: "Password is mininum 6 character" }),
  email: z.string().min(1, { message: "Email is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  hp: z.string().min(1, { message: "No HP is required" }),
  position: z.string(),
  office: z.string(),
});

type Schema = z.infer<typeof schema>;

export function UpdateUsers() {
  const [positionData, setPositionData] = useState<PositionData[]>([]);
  const [officeData, setOfficeData] = useState<OfficeData[]>([]);
  const [data, setData] = useState<UserDataUpdate | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cookie] = useCookies(["token"]);
  const { user_id } = useParams();
  const getToken = cookie.token;
  const navigate = useNavigate();

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    fetchDataPositions();
    fetchDataOffices();
    fetchData();
  }, []);

  const fetchData = async () => {
    axios
      .get(`users/${user_id}`)
      .then((res) => {
        const { name, email, hp, position, office, password } = res.data.data;
        setValue("name", name);
        setValue("email", email);
        setValue("hp", hp);
        setValue("position", position);
        setValue("office", office);
        setValue("password", password);
      })
      .catch((err) => {
        const { data } = err.response;
        Swal.fire({
          title: "Failed",
          text: data.message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

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

  const onSubmit: SubmitHandler<Schema> = (data) => {
    setLoading(true);
    const formData = new FormData();
    let key: keyof typeof data;
    for (key in data) {
      formData.append(key, data[key]);
    }
    axios
      .put(`users/${user_id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
                name="hp"
                placeholder="Enten Phone Number"
                id="input-no-hp"
                error={errors.hp?.message}
              />
            </div>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">
                Position
              </label>
              <select
                {...register("position")}
                value={"position"}
                className="border rounded-md bg-white border-@Gray text-black p-2 focus:outline-none w-full"
                placeholder="Select Position"
                id="select-position"
              >
                {positionData.map((pos) => (
                  <option>{pos.position}</option>
                ))}
              </select>
            </div>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">Office</label>

              <select
                {...register("office")}
                value={data?.office}
                className="border rounded-md bg-white border-@Gray text-black p-2 focus:outline-none w-full"
                placeholder="Select Office"
                id="select-Office"
              >
                <option disabled>{data?.office}</option>
                {officeData.map((office) => (
                  <option key={office.office_name}>{office.office_name}</option>
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
