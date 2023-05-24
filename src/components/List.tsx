import SubmissionType from "@/utils/types/submission";
import { FC, useEffect, useState } from "react";

const List: FC<SubmissionType> = (props) => {
  const [colorStatus, setColorStatus] = useState<string>("");
  const [colorBg, setColorBg] = useState<string>("");
  const { status, receive_date, opened, title, attachment, to } = props;
  const [toString, setTo] = useState<string>("");
  useEffect(() => {
    if (status == "approved" || status == "Approved") {
      setColorStatus("text-@Green");
    } else if (status == "rejected" || status == "Rejected") {
      setColorStatus("text-@Red");
    } else if (status == "revised" || status == "Revised") {
      setColorStatus("text-@Orange");
    }

    if (opened) {
      setColorBg("bg-@Red4");
    } else {
      setColorBg("");
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchData() {
    let stringJoin = "";
    to.map((data) => {
      return (stringJoin +=
        data.approver_position + " " + data.approver_name + ",");
    });
    setTo(stringJoin);
  }

  const downloadFile = (attachment: string) => {
    window.open(`/app2?url=${attachment}`);
  };

  return (
    <div
      className={`${colorBg} flex justify-around border-b-2 p-2 hover:border-slate-500 hover:border-t-2 hover:border-t-gray-200 font-bold text-sm`}
    >
      <div className="w-5/12">
        <p className=" w-full truncate">To: {toString}</p>
      </div>
      <div className="flex flex-col w-2/12">
        <p className=" w-full truncate">{title}</p>
        <button
          onClick={() => downloadFile(attachment)}
          className=" font-bold py-2 rounded flex"
        >
          <img src="/images/pdf.png" alt="" className="w-6 h-6 object-cover" />
          <p>{attachment.split("/")[attachment.split("/").length - 1]}</p>
        </button>
      </div>
      <div className={`${colorStatus} w-1/12`}>
        <p>{status}</p>
      </div>
      <div className=" min-w-[5rem] text-right">
        <p>{receive_date}</p>
      </div>
    </div>
  );
};

export default List;
