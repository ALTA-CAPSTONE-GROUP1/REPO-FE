import { FC } from "react";
import { BsSearch } from "react-icons/bs";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import { LayoutAdmin } from "@/components/Layout";
import { TabPosition } from "@/components/Tab";
import { RedButton } from "@/components/Button";
import { Input } from "@/components/Input";
import { CardTablePosition } from "@/components/Card";

export const Position: FC = () => {
  return (
    <LayoutAdmin>
      <div
        className="max-w-[85rem] w-full mx-auto bg-white"
        aria-label="Global"
      >
        <TabPosition />
        <form className="flex flex-col p-4 bg-white rounded-md ">
          <div className="mt-3">
            <h3 className="font-bold text-2xl text-black">Add Position</h3>
            <h3 className="text-sm">
              The new employee's responsibilities will include a new role tag
              for social media management
            </h3>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="mt-5 w-full">
                <label className="font-semibold text-md text-black">
                  Position
                </label>
                <Input placeholder="Enter Position" id="input-position" />
              </div>
              <div className="mt-5 w-full">
                <label className="font-semibold text-md text-black">Tag</label>
                <Input placeholder="Enter Tag" id="input-tag" type="email" />
              </div>
              <div className="mt-5 md:mt-10 w-80">
                <RedButton
                  label="+ Add"
                  id="button-add-position"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </form>

        <div className="overflow-x-auto w-full p-6 mt-20 hidden md:block">
          <div className="flex flex-row p-2 bg-@Red2 text-black rounded-ss-md rounded-se-md justify-between items-center">
            <p className="font-bold">Position List</p>

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
              <th className="capitalize bg-@Gray2 text-black">Position</th>
              <th className="bg-@Gray2 text-black">ID</th>

              <th className="capitalize  bg-@Gray2 text-black ">
                <div className="flex pr-6 justify-end">Action</div>
              </th>
            </thead>
            <tbody>
              <CardTablePosition
                position="Product Manager"
                tag="pm"
                link_del=""
              />
              <CardTablePosition
                position="Product Manager"
                tag="pm"
                link_del=""
              />
              <CardTablePosition
                position="Product Manager"
                tag="pm"
                link_del=""
              />
              <CardTablePosition
                position="Product Manager"
                tag="pm"
                link_del=""
              />
              <CardTablePosition
                position="Product Manager"
                tag="pm"
                link_del=""
              />
            </tbody>
            {/* foot */}
            <tfoot></tfoot>
          </table>
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
};
