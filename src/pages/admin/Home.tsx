import { FC } from "react";
import { BsQuestionCircle, BsSearch } from "react-icons/bs";
import {
  RiDeleteBin6Line,
  RiPencilLine,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "react-icons/ri";
import { RedButton } from "@/components/Button";
import { Input } from "@/components/Input";
import { LayoutAdmin } from "@/components/Layout";
import { TabUser } from "@/components/Tab";
import CardTableUser from "@/components/Card";

const HomeAdmin: FC = () => {
  return (
    <LayoutAdmin>
      <div
        className="max-w-[85rem] w-full mx-auto bg-white"
        aria-label="Global"
      >
        <TabUser />
        <form className="flex flex-col p-4 bg-white rounded-md ">
          <div className="mt-3">
            <h3 className="font-bold text-2xl text-black">Add User</h3>
            <h3 className="text-sm">Create new user </h3>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">Name</label>
              <Input placeholder="Enter Name" id="input-name" />
            </div>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">Email</label>
              <Input placeholder="Enter Email" id="input-email" type="email" />
            </div>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">No Hp</label>
              <Input placeholder="Enten Phone Number" id="input-no-hp" />
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
                <option>Regional Manager</option>
                <option>UI Design</option>
                <option>Backend Developer</option>
              </select>
            </div>
            <div className="mt-5 w-full">
              <label className="font-semibold text-md text-black">Office</label>
              <select
                className="border rounded-md bg-white border-@Gray text-black p-2 focus:outline-none w-full"
                placeholder="Select Office"
                id="select-Office"
              >
                <option disabled selected>
                  Select Office
                </option>
                <option>Medan</option>
                <option>Surabaya</option>
                <option>Solo</option>
              </select>
            </div>
            <div className="mt-5">
              <RedButton label="Add User" id="button-add-user" type="submit" />
            </div>
          </div>
        </form>

        <div>
          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="my-modal-3"
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
                    <Input placeholder="Enter Name" id="input-name" />
                  </div>
                  <div className="mt-5 w-full">
                    <label className="font-semibold text-md text-black">
                      Email
                    </label>
                    <Input
                      placeholder="Enter Email"
                      id="input-email"
                      type="email"
                    />
                  </div>
                  <div className="mt-5 w-full">
                    <label className="font-semibold text-md text-black">
                      No Hp
                    </label>
                    <Input placeholder="Enten Phone Number" id="input-no-hp" />
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
                      <option>Regional Manager</option>
                      <option>UI Design</option>
                      <option>Backend Developer</option>
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
                      <option>Medan</option>
                      <option>Surabaya</option>
                      <option>Solo</option>
                    </select>
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
        <CardTableUser
          name="Olivia Rhye"
          id_user="PD01"
          email_address="olivia@untiledui.com
              "
          position="Product Manager"
          office="Jakarta"
          link_del="Delete"
          link_update=""
        />
      </div>
    </LayoutAdmin>
  );
};

export default HomeAdmin;
