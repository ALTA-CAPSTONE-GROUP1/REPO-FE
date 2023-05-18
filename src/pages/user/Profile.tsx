/* eslint-disable react-hooks/exhaustive-deps */
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import * as z from "zod";

import { RedButton } from "@/components/Button";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/Input";
import Swal from "@/utils/Swal";

const schema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  phone_number: z.string().min(1, { message: "No HP is required" }),
});

type Schema = z.infer<typeof schema>;

const Profile: FC = () => {
  const [cookie] = useCookies(["token", "user_position", "username"]);

  const [position, setUsePosition] = useState<string>("");
  const [office, setUseOffice] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    // const url = "https://virtserver.swaggerhub.com/123ADIYUDA/E-Proposal/1.0.0";
    // axios({
    //   method: "get",
    //   url: `${url}/profile`,
    // })
    axios
      .get(`profile`, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        setValue("name", data.name);
        setValue("email", data.email);
        setValue("phone_number", data.phone_number);
        setUseOffice(data.office);
        setUsePosition(data.position);
      })
      .catch((err) => {
        const { message } = err.response;
        Swal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      });
  }
  const onSubmit: SubmitHandler<Schema> = (data) => {
    alert(JSON.stringify(data));
    axios
      .put(`profile`, data, {
        headers: {
          Authorization: `Bearer ${cookie.token}`,
        },
      })
      .then((res) => {
        const { message } = res.data;
        Swal.fire({
          icon: "success",
          title: "Success",
          text: message,
          showCancelButton: false,
        });
      })
      .catch((err) => {
        const { message } = err.response;
        Swal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      });
  };
  return (
    <Layout>
      <div className="max-w-[85rem] w-full mx-auto" aria-label="Global">
        <form
          className="flex flex-col p-4 rounded-md "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-3">
            <h3 className="font-bold text-2xl text-black">Update Profile</h3>
            <h3 className="text-sm">User just update no HP and password </h3>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">Name</label>
              <Input
                register={register}
                name="name"
                placeholder="Enter Name"
                id="input-name"
                disabled
              />
            </div>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">Email</label>
              <Input
                error={errors.email?.message}
                register={register}
                name="email"
                placeholder="Enter Email"
                id="input-email"
                type="email"
              />
            </div>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">No Hp</label>
              <Input
                type="number"
                error={errors.phone_number?.message}
                register={register}
                name="phone_number"
                placeholder="Enter Phone Number"
                id="input-no-hp"
              />
            </div>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">
                Position
              </label>
              <Input
                disabled
                type="text"
                // register={register}
                defaultValue={position}
                name="position"
                placeholder="Enter Phone Number"
                id="input-no-hp"
              />
            </div>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">Office</label>
              <Input
                disabled
                type="text"
                // register={register}
                defaultValue={office}
                name="office"
                placeholder="Enter Phone Number"
                id="input-no-hp"
              />
            </div>

            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">
                Password
              </label>
              <Input
                // error={errors.password?.message}
                // register={register}
                name="password"
                placeholder="Enter Password"
                id="input-no-hp"
                type="password"
              />
            </div>
            <div className="mt-5">
              <RedButton label="Update Profile" id="button-update-profile" />
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
