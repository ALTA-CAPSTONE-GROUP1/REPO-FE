import List from "@/components/List";
import { FC, ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { RiCloseCircleFill, RiMenu2Fill } from "react-icons/ri";
import { z } from "zod";
import withReactContent from "sweetalert2-react-content";

import Swal from "@/utils/Swal";
import SubmissionType from "@/utils/types/submission";
import axios from "axios";
import { Input } from "@/components/Input";
interface Props {
  datas: SubmissionType[];
  children: ReactNode;
}

const UserHome: FC<Props> = (props) => {
  // const { addSubmission } = props;
  const { datas, children } = props;
  const [createSubmission, setCreateSubmission] = useState<boolean>(false);
  // const [datas, setDatas] = useState<SubmissionType[]>(data);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    // fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function fetchData() {

  // }

  function isCurrentDate(dateString: string) {
    const currentDate = new Date().toISOString().slice(0, 10);
    return dateString === currentDate;
  }

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
          <select className=" bg-@Red flex-initial w-[10%] rounded-l-full flex justify-center items-center">
            <option className=" text-center rounded-tl-full" selected>
              To
            </option>
            <option className=" text-center rounded-bl-full">Title</option>
          </select>

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
        {datas.map((data) => {
          return (
            <Link to={`/sub-detail/${data.id}`}>
              <List
                to={data.to}
                status={data.status}
                receive_date={
                  isCurrentDate(data.receive_date.split("T")[0])
                    ? data.receive_date.split("T")[1].slice(0, 8)
                    : data.receive_date.split("T")[0]
                }
                opened={data.opened}
                id={data.id}
                cc={data.cc}
                title={data.title}
                attachment={data.attachment}
                submission_type={data.submission_type}
              />
            </Link>
          );
        })}
      </div>
      {children}
    </div>
  );
};

export default UserHome;
