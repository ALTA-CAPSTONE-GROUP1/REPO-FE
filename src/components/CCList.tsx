import ccTypes from "@/utils/types/cc";
import { FC, useEffect } from "react";
import { BsDownload } from "react-icons/bs";

const CCList: FC<ccTypes> = (props) => {
  const { from, title, submission_type } = props;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadFile = () => {
    const url = "/images/test2.pdf";
    // const url = { attachment };
    window.open(`/app2?url=${url}`);
  };

  return (
    <div
      className={`bg-@Red4 flex justify-around border-b-2 p-2 items-center hover:border-slate-500 hover:border-t-2 hover:border-t-gray-200 font-bold text-sm`}
    >
      <div className=" w-4/12">
        <p>From: {from.position + " " + from.name}</p>
      </div>
      <div className=" w-4/12">
        <p>To: {from.position + " " + from.name}</p>
      </div>
      <div className=" w-2/12">
        <p>{title}</p>
      </div>
      <div className=" w-1/12">
        <p>{submission_type}</p>
      </div>
      <div className=" w-1/12">
        <button onClick={downloadFile} className=" text-@Blu font-bold">
          <BsDownload />
        </button>
      </div>
    </div>
  );
};

export default CCList;
