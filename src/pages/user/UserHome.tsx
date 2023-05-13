import List from "@/components/List";
import { FC, ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { RiMenu2Fill } from "react-icons/ri";
import { z } from "zod";
import withReactContent from "sweetalert2-react-content";

import SubmissionType from "@/utils/types/submission";
import Swal from "@/utils/Swal";
import axios from "axios";
interface Props {
  children: ReactNode;
}

const UserHome: FC<Props> = (props) => {
  const { children } = props;
  const [createSubmission, setCreateSubmission] = useState<boolean>(false);
  const [datas, setDatas] = useState<SubmissionType[]>([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchData() {
    axios
      .get(`submission`)
      .then((res) => {
        const { data } = res.data;
        setDatas(data);
      })
      .catch((err) => {
        const { message } = err.response;
        MySwal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      });
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
        {datas.map((data) => {
          return (
            <Link to={""}>
              <List
                to={data.to}
                status={data.status}
                receive_date={data.receive_date.split(" ")[1]}
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
