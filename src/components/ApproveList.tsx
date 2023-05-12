import { FC, useEffect, useState } from "react";

interface Props {
  status: string;
  time: string;
  opened: boolean;
}

const ApproveList: FC<Props> = (props) => {
  const [colorStatus, setColorStatus] = useState<string>("");
  const [colorBg, setColorBg] = useState<string>("");
  const { status, time, opened } = props;

  useEffect(() => {
    if (status == "Approved") {
      setColorStatus("text-@Green");
    } else if (status == "Reject") {
      setColorStatus("text-@Red");
    } else if (status == "Revise") {
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
        <p>From: Regional Manager (Zakaria)</p>
      </div>
      <div className=" w-2/12">
        <p>Courier Recruiitment</p>
      </div>
      <div className=" w-1/12">
        <p>Program</p>
      </div>
      <div className={`${colorStatus} max-w-[3rem]`}>
        <p>{status}</p>
      </div>
      <div className=" min-w-[5rem] text-right  w-1/12">
        <p>{time}</p>
      </div>
    </div>
  );
};

export default ApproveList;
