import { Layout } from "@/components/Layout";
import CCList from "@/components/CCList";
import SideBar from "@/components/SideBar";
import { FC } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

const CC: FC = () => {
  return (
    <div className="drawer-content flex flex-col h-[90%]">
      <div className="p-7 w-full">
        <div className="form-control rounded-full flex flex-row relative border-2">
          <div className=" bg-@Red flex-initial w-[10%] rounded-l-full flex justify-center items-center">
            <p className=" text-center">To</p>
          </div>

          <label className="relative block flex-initial w-full rounded-r-full ">
            <input
              className="rounded-r-full placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-@Red focus:ring-@Red focus:ring-1 sm:text-sm"
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
      </div>
      <div className="h-full overflow-auto  min-w-[50rem]">
        <Link to={""}>
          <CCList status="Approved" time="09:00" opened={true} />
        </Link>
        <Link to={""}>
          <CCList status="Reject" time="02 May 2023" opened={false} />
        </Link>
        <Link to={""}>
          <CCList status="Revise" time="18 April 2023" opened={true} />
        </Link>
        <Link to={""}>
          <CCList status="Approved" time="09:00" opened={true} />
        </Link>
        <Link to={""}>
          <CCList status="Reject" time="02 May 2023" opened={false} />
        </Link>
        <Link to={""}>
          <CCList status="Revise" time="18 April 2023" opened={true} />
        </Link>
        <Link to={""}>
          <CCList status="Revise" time="18 April 2023" opened={true} />
        </Link>
        <Link to={""}>
          <CCList status="Revise" time="18 April 2023" opened={true} />
        </Link>
        <Link to={""}>
          <CCList status="Revise" time="18 April 2023" opened={true} />
        </Link>
        <Link to={""}>
          <CCList status="Revise" time="18 April 2023" opened={true} />
        </Link>
      </div>
    </div>
  );
};

export default CC;
