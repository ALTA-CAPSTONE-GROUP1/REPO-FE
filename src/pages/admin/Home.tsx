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
        <div className="overflow-x-auto w-full p-6 mt-20 ">
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

          <table className="table w-full border border-@Gray2">
            {/* head */}
            <thead>
              <th className="capitalize bg-@Gray2 text-black">Name</th>
              <th className=" bg-@Gray2 text-black">ID</th>
              <th className="capitalize  bg-@Gray2 text-black">
                Email Address
              </th>
              <th className="capitalize  bg-@Gray2 text-black">
                <div className="flex flex-row gap-2 text-black">
                  <p>Position</p>
                  <p>
                    <BsQuestionCircle />
                  </p>
                </div>
              </th>
              <th className="capitalize  bg-@Gray2 text-black">
                <div className="flex flex-row gap-2 text-black">
                  <p>Office</p>
                  <p>
                    <BsQuestionCircle />
                  </p>
                </div>
              </th>
              <th className="capitalize  bg-@Gray2 text-black ">Action</th>
            </thead>
            <tbody>
              <tr>
                <td className="bg-white border-@Gray2">
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold text-black">Olivia Rhye</div>
                      <div className="text-sm opacity-50 text-@Gray">PD01</div>
                    </div>
                  </div>
                </td>
                <td className="bg-white border-@Gray2">PD01</td>
                <td className="bg-white border-@Gray2">
                  olivia@untitledui.com
                </td>
                <td className="bg-white border-@Gray2">Product Designer</td>
                <td className="bg-white border-@Gray2">Jakarta</td>
                <th className="bg-white border-@Gray2">
                  <button className="btn btn-ghost btn-xl text-xl text-@Red">
                    <RiDeleteBin6Line />
                  </button>
                  <button className="btn btn-ghost btn-xl text-xl text-@Blue">
                    <RiPencilLine />
                  </button>
                </th>
              </tr>
              <tr>
                <td className="bg-white border-@Gray2">
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold text-black">Olivia Rhye</div>
                      <div className="text-sm opacity-50 text-@Gray">PD01</div>
                    </div>
                  </div>
                </td>
                <td className="bg-white border-@Gray2">PD01</td>
                <td className="bg-white border-@Gray2">
                  olivia@untitledui.com
                </td>
                <td className="bg-white border-@Gray2">Product Designer</td>
                <td className="bg-white border-@Gray2">Jakarta</td>
                <th className="bg-white border-@Gray2">
                  <button className="btn btn-ghost btn-xl text-xl text-@Red">
                    <RiDeleteBin6Line />
                  </button>
                  <button className="btn btn-ghost btn-xl text-xl text-@Blue">
                    <RiPencilLine />
                  </button>
                </th>
              </tr>
              <tr>
                <td className="bg-white border-@Gray2">
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold text-black">Olivia Rhye</div>
                      <div className="text-sm opacity-50 text-@Gray">PD01</div>
                    </div>
                  </div>
                </td>
                <td className="bg-white border-@Gray2">PD01</td>
                <td className="bg-white border-@Gray2">
                  olivia@untitledui.com
                </td>
                <td className="bg-white border-@Gray2">Product Designer</td>
                <td className="bg-white border-@Gray2">Jakarta</td>
                <th className="bg-white border-@Gray2">
                  <button className="btn btn-ghost btn-xl text-xl text-@Red">
                    <RiDeleteBin6Line />
                  </button>
                  <button className="btn btn-ghost btn-xl text-xl text-@Blue">
                    <RiPencilLine />
                  </button>
                </th>
              </tr>
              <tr>
                <td className="bg-white border-@Gray2">
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold text-black">Olivia Rhye</div>
                      <div className="text-sm opacity-50 text-@Gray">PD01</div>
                    </div>
                  </div>
                </td>
                <td className="bg-white border-@Gray2">PD01</td>
                <td className="bg-white border-@Gray2">
                  olivia@untitledui.com
                </td>
                <td className="bg-white border-@Gray2">Product Designer</td>
                <td className="bg-white border-@Gray2">Jakarta</td>
                <th className="bg-white border-@Gray2">
                  <button className="btn btn-ghost btn-xl text-xl text-@Red">
                    <RiDeleteBin6Line />
                  </button>
                  <button className="btn btn-ghost btn-xl text-xl text-@Blue">
                    <RiPencilLine />
                  </button>
                </th>
              </tr>
              <tr>
                <td className="bg-white border-@Gray2">
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold text-black">Olivia Rhye</div>
                      <div className="text-sm opacity-50 text-@Gray">PD01</div>
                    </div>
                  </div>
                </td>
                <td className="bg-white border-@Gray2">PD01</td>
                <td className="bg-white border-@Gray2">
                  olivia@untitledui.com
                </td>
                <td className="bg-white border-@Gray2">Product Designer</td>
                <td className="bg-white border-@Gray2">Jakarta</td>
                <th className="bg-white border-@Gray2">
                  <button className="btn btn-ghost btn-xl text-xl text-@Red">
                    <RiDeleteBin6Line />
                  </button>
                  <button className="btn btn-ghost btn-xl text-xl text-@Blue">
                    <RiPencilLine />
                  </button>
                </th>
              </tr>
            </tbody>
            {/* foot */}
            <tfoot></tfoot>
          </table>
          <div className="flex flex-row p-2 bg-white text-black border rounded-es-md rounded-ee-md justify-between items-center">
            <button className="btn btn-ghost btn-xl text-xl text-@Gray capitalize border border-@Gray">
              <RiArrowLeftLine /> Previous
            </button>
            <div className="btn-group">
              <button className="btn btn-ghost bg-@Red2">1</button>
              <button className="btn btn-ghost">2</button>
              <button className="btn btn-ghost ">...</button>
              <button className="btn btn-ghost">99</button>
              <button className="btn btn-ghost">100</button>
            </div>
            <button className="btn btn-ghost btn-xl text-xl text-@Gray capitalize border border-@Gray">
              Next <RiArrowRightLine />
            </button>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default HomeAdmin;
