import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FC } from "react";
import { RiMenu2Fill } from "react-icons/ri";

import ApproveList from "@/components/ApproveList";
import approveTypes from "@/utils/types/approve";

interface Props {
  datas: approveTypes[];
  onchange: React.ChangeEventHandler<HTMLSelectElement>;
  onchangeInput: React.ChangeEventHandler<HTMLInputElement>;
  select: boolean;
}

const Approve: FC<Props> = (props) => {
  const { datas, onchange, onchangeInput } = props;

  return (
    <div className="drawer-content flex flex-col">
      <div className="p-7 w-full">
        <label
          htmlFor="my-drawer-2"
          className="btn  drawer-button lg:hidden bg-@Red text-white border-@Red mb-5"
        >
          <RiMenu2Fill />
        </label>
        <div className="form-control rounded-full flex flex-row relative border-2">
          <select
            onChange={onchange}
            className=" bg-@Red flex-initial w-[10%] rounded-l-full focus:rounded-none transition-all ease-in-out flex justify-center items-center"
          >
            <option
              className=" text-center rounded-tl-full"
              selected
              value={"to"}
            >
              To
            </option>
            <option className=" text-center rounded-bl-full" value={"title"}>
              Title
            </option>
          </select>

          <label className="relative block flex-initial w-full rounded-r-full ">
            <input
              onChange={onchangeInput}
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
        {datas.map((data) => {
          return (
            <Link to={`/approve-detail/${data.submission_id}`}>
              <ApproveList
                submission_id={data.submission_id}
                from={data.from}
                title={data.title}
                submission_type={data.submission_type}
                status={data.status === "Sent" ? "Waiting You" : data.status}
                receive_date={data.receive_date}
                opened={data.opened}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Approve;
