import approveTypes from "@/utils/types/approve";
import { FC, useEffect, useState } from "react";

const ApproveList: FC<approveTypes> = (props) => {
  const [colorStatus, setColorStatus] = useState<string>("");
  const [colorBg, setColorBg] = useState<string>("");
  const { from, title, submission_type, status, receive_date, opened } = props;

  useEffect(() => {
    if (status == "approved") {
      setColorStatus("text-@Green");
    } else if (status == "rejected") {
      setColorStatus("text-@Red");
    } else if (status == "revise") {
      setColorStatus("text-@Orange");
    }

    if (opened) {
      setColorBg("bg-@Red4");
    } else {
      setColorBg("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`${colorBg} flex justify-around border-b-2 p-2 items-center hover:border-slate-500 hover:border-t-2 hover:border-t-gray-200 font-bold text-sm`}
    >
      <div className=" w-4/12">
        <p>From: {from}</p>
      </div>
      <div className=" w-3/12">
        <p>{title}</p>
      </div>
      <div className=" w-2/12">
        <p>{submission_type}</p>
      </div>
      <div className={`${colorStatus} w-1/12`}>
        <p>{status}</p>
      </div>
      <div className=" min-w-[5rem] text-right  w-1/12">
        <p>{receive_date}</p>
      </div>
    </div>
  );
};

export default ApproveList;
