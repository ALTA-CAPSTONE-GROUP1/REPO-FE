import { FC, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Input } from "@/components/Input";
import { RedButton } from "@/components/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Swal from "sweetalert2";
import * as z from "zod";

const schema = z.object({
  sign_id: z.string().min(5, { message: "Sign ID is Failed" }),
});

// interface DataSignID {
//   nama: string;
//   titile: string;
//   position: string;
//   date: string;
// }

type Schema = z.infer<typeof schema>;

export function SignID() {
  // const [data, setData] = useState<Partial<DataSignID>>({});
  const [clicked, setClicked] = useState(false);
  const [, setCookie] = useCookies([
    "submission_title",
    "official_name",
    "official_position",
    "date",
  ]);
  const [cookies] = useCookies([
    "submission_title",
    "official_name",
    "official_position",
    "date",
  ]);
  const { sign_id } = useParams();

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
    axios
      .post(`sign-validation/${sign_id}`, data)
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
              setCookie("submission_title", data.submission_title, {
                path: "/",
              });
              setCookie("official_name", data.official_name, { path: "/" });
              setCookie("official_position", data.official_position, {
                path: "/",
              });
              setCookie("date", data.date, { path: "/" });
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
      });
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url("https://wallpaperaccess.com/full/1163675.jpg")`,
      }}
    >
      <div className="flex hero-overlay bg-opacity-60 justify-center items-center ">
        <form
          className="flex flex-col m-6 p-8 bg-white rounded-md w-full md:w-fit h-fit"
          onSubmit={handleSubmit(onSubmit)}
        >
          <img src="/images/Logo2.png" alt="" />
          <div className="mt-3">
            <h3 className="font-bold text-2xl text-black">Sign ID</h3>
            <h3 className="text-sm">Enter Users Sign ID </h3>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">
                Sign ID
              </label>
              <Input
                register={register}
                name="sign_id"
                placeholder="Enter User ID"
                id="input-user-id"
                error={errors.sign_id?.message}
              />
            </div>
            <div className="mt-5 font-semibold text-black">
              {clicked && (
                <>
                  <p>Title : {cookies.submission_title}</p>
                  <p>
                    Name :{cookies.official_position} ({cookies.official_name})
                  </p>
                  <p>Approve Date : {cookies.date}</p>
                </>
              )}
            </div>
            <div className="mt-5">
              <RedButton
                label="Check"
                id="button-check"
                type="submit"
                onClick={() => setClicked(true)}
              />
            </div>
            <div className="flex flex-col mt-5 md:justify-center md:items-center text-md text-black">
              <p>
                Don't have an Account? Contanct{" "}
                <Link
                  to="/"
                  className="font-bold text-black dark:text-@2A9D8F hover:text-@427AA1"
                  id="contact-admin"
                >
                  Your Admin
                </Link>
              </p>
              <p>
                Have an Account?
                <Link
                  to="/login"
                  className="font-bold text-black dark:text-@2A9D8F hover:text-@427AA1"
                  id="sign-id"
                >
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
