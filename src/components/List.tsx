import SubmissionType from "@/utils/types/submission";
import { FC, useEffect, useState } from "react";

const List: FC<SubmissionType> = (props) => {
  const [colorStatus, setColorStatus] = useState<string>("");
  const [colorBg, setColorBg] = useState<string>("");
  const { status, receive_date, opened, title, attachment, to } = props;
  const [toString, setTo] = useState<string>("");
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

  const downloadFile = () => {
    // const link = document.createElement("a");
    // link.href = "/images/test.pdf";
    // // link.download = "/images/test.pdf";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
    const url = "/images/test2.pdf";
    window.open(`/app2?url=${url}`);
  };

  return (
    <div
      className={`${colorBg} flex justify-around border-b-2 p-2 hover:border-slate-500 hover:border-t-2 hover:border-t-gray-200 font-bold text-sm`}
    >
      <div>
        <p>{toString}</p>
      </div>
      <div className="flex flex-col">
        <p>{title}</p>
        <button
          onClick={downloadFile}
          className=" font-bold py-2 px-4 rounded flex justify-start items-center"
        >
          <img src="/images/pdf2.png" alt="" className="w-6 h-6 object-cover" />
          <p>{attachment}</p>
        </button>
      </div>
      <div className={`${colorStatus} max-w-[3rem]`}>
        <p>{status}</p>
      </div>
      <div className=" min-w-[5rem] text-right">
        <p>{receive_date}</p>
      </div>
    </div>
  );
};

export default List;
