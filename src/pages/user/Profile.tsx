import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import axios from "axios";
import * as z from "zod";

import { RedButton } from "@/components/Button";
import { Layout } from "@/components/Layout";
import { Input } from "@/components/Input";
import Swal from "@/utils/Swal";

const schema = z.object({
  name: z.string(),
  email: z.string().min(10, { message: "Input Correct Email" }),
  hp: z.string().min(10, { message: "Hp number didn't allow to empty" }),
  position: z.string(),
  office: z.string(),
  password: z.string(),
});

type Schema = z.infer<typeof schema>;

const Profile: FC = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJ1c2VySUQiOjR9.QTZxERh4CwC_UnL_eJvTi_A_qdLeBZ-IjR4nqoxjodk";

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
    const url = "https://virtserver.swaggerhub.com/123ADIYUDA/E-Proposal/1.0.0";
    axios({
      method: "get",
      url: `${url}/profile`,
    })
      // axios
      //   .get(`profile`, {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   })
      .then((res) => {
        const { data } = res.data;
        setValue("name", data.name);
        setValue("email", data.email);
        setValue("hp", data.hp);
        setValue("position", data.position);
        setValue("office", data.office);
        setValue("password", data.password);
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
    axios
      .put(`profile`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { message } = res.data;
        Swal.fire({
          title: "Failed",
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
                error={errors.hp?.message}
                register={register}
                name="hp"
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
                register={register}
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
                register={register}
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
                error={errors.password?.message}
                register={register}
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
