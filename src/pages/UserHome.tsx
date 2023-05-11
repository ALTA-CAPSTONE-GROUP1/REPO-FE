import List from "@/components/List";
import SideBar from "@/components/SideBar";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { Input } from "@/components/Input";
import { RiCloseCircleFill } from "react-icons/ri";
const UserHome: FC = () => {
  const [createSubmission, setCreateSubmission] = useState<boolean>(false);
  return (
    <SideBar onClick={() => setCreateSubmission(!createSubmission)}>
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
          <List status="Approved" time="09:00" opened={true} />
        </Link>
        <Link to={""}>
          <List status="Reject" time="02 May 2023" opened={false} />
        </Link>
        <Link to={""}>
          <List status="Revise" time="18 April 2023" opened={true} />
        </Link>
        <Link to={""}>
          <List status="Approved" time="09:00" opened={true} />
        </Link>
        <Link to={""}>
          <List status="Reject" time="02 May 2023" opened={false} />
        </Link>
        <Link to={""}>
          <List status="Revise" time="18 April 2023" opened={true} />
        </Link>
        <Link to={""}>
          <List status="Revise" time="18 April 2023" opened={true} />
        </Link>
        <Link to={""}>
          <List status="Revise" time="18 April 2023" opened={true} />
        </Link>
        <Link to={""}>
          <List status="Revise" time="18 April 2023" opened={true} />
        </Link>
        <Link to={""}>
          <List status="Revise" time="18 April 2023" opened={true} />
        </Link>
      </div>
      <div className="h-10 w-full bg-@Red4 relative transition-all">
        {createSubmission ? (
          <div
            data-theme="cupcake"
            className="absolute right-2 bottom-2 h-[30rem] w-[50rem] shadow-2xl -translate-x-2 translate-y-2 transition-all"
          >
            <div className="flex justify-between px-5 py-2 bg-@Red4 items-center">
              <p className=" text-sm font-bold">New Submission</p>
              <button
                className=" text-@Red"
                onClick={() => setCreateSubmission(!createSubmission)}
              >
                <RiCloseCircleFill />
              </button>
            </div>
            <div data-theme="light" className=" p-5 h-[90%]">
              <form action="">
                <div className="form-control">
                  <div className="input-group rounded-md justify-between w-[40%]">
                    <select className="select select-bordered">
                      <option disabled selected>
                        Submission Type
                      </option>
                      <option>Program</option>
                      <option>Finance</option>
                    </select>
                    <select className="select select-bordered">
                      <option disabled selected>
                        Value
                      </option>
                      <option>{">60 Juta"}</option>
                      <option>{"<30 Juta"}</option>
                    </select>
                  </div>
                  <Input
                    type="text"
                    placeholder="Title"
                    className=" border-b-2 focus:outline-none focus:border-b-@Red w-full mt-3"
                  />
                  <Input
                    type="text"
                    placeholder="To:"
                    className=" border-b-2 focus:outline-none focus:border-b-@Red w-full mt-3"
                  />
                  <Input
                    type="text"
                    placeholder="CC:"
                    className=" border-b-2 focus:outline-none focus:border-b-@Red w-full mt-3"
                  />
                  <textarea
                    className="textarea pb-20"
                    placeholder="Messages"
                  ></textarea>
                  <div className="flex justify-between items-end mt-5 h-20 max-h-20">
                    <Input type="file" className="w-full " multiple />
                    <button>Send</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </SideBar>
  );
};

export default UserHome;
