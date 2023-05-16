import { FC, useEffect } from "react";
import { BsQuestionCircle, BsSearch } from "react-icons/bs";
import {
  RiDeleteBin6Line,
  RiPencilLine,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "react-icons/ri";
import { RedButton } from "@/components/Button";
import { Input } from "@/components/Input";
import { Layout } from "@/components/Layout";
import { TabUser } from "@/components/Tab";
import { CardTableUser } from "@/components/Card";
import axios from "axios";
import Swal from "@/utils/Swal";

const Profile: FC = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJ1c2VySUQiOjR9.QTZxERh4CwC_UnL_eJvTi_A_qdLeBZ-IjR4nqoxjodk";

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    axios
      .get(`profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { data } = res.data;
        alert(JSON.stringify(data));
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

  return (
    <Layout>
      <div className="max-w-[85rem] w-full mx-auto" aria-label="Global">
        <form className="flex flex-col p-4 rounded-md ">
          <div className="mt-3">
            <h3 className="font-bold text-2xl text-black">Update Profile</h3>
            <h3 className="text-sm">User just update no HP and password </h3>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">Name</label>
              <Input
                register={""}
                name="title"
                placeholder="Enter Name"
                id="input-name"
                disabled
              />
            </div>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">Email</label>
              <Input
                register={""}
                name="title"
                placeholder="Enter Email"
                id="input-email"
                type="email"
                disabled
              />
            </div>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">No Hp</label>
              <Input
                register={""}
                name="title"
                placeholder="Enter Phone Number"
                id="input-no-hp"
              />
            </div>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">
                Position
              </label>
              <select
                className="border rounded-md bg-white border-@Gray text-black p-2 focus:outline-none w-full disabled:bg-@Gray2"
                placeholder="Select Position"
                id="select-position"
                disabled
              >
                <option disabled selected>
                  Select Position
                </option>
                <option>Regional Manager</option>
                <option>UI Design</option>
                <option>Backend Developer</option>
              </select>
            </div>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">Office</label>
              <select
                className="border rounded-md bg-white border-@Gray text-black p-2 focus:outline-none w-full disabled:bg-@Gray2"
                placeholder="Select Office"
                id="select-Office"
                disabled
              >
                <option disabled selected>
                  Select Office
                </option>
                <option>Medan</option>
                <option>Surabaya</option>
                <option>Solo</option>
              </select>
            </div>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">
                Password
              </label>
              <Input
                register={""}
                name="title"
                placeholder="Enter Password"
                id="input-no-hp"
                type="password"
              />
            </div>
            <div className="mt-5">
              <RedButton
                label="Update Profile"
                id="button-update-profile"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
