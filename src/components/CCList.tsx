import { FC, useEffect, useState } from "react";
import { BsDownload } from "react-icons/bs";

interface Props {
  status: string;
  time: string;
  opened: boolean;
}

const CCList: FC<Props> = (props) => {
  const [colorBg, setColorBg] = useState<string>("");
  const { time, opened } = props;

  useEffect(() => {
    if (opened) {
      setColorBg("bg-@Red4");
    } else {
      setColorBg("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const downloadFile = () => {
    window.open(
      "https://drive.google.com/file/d/194CUCBxrqw4h8h6kRhAfZBvXs27C8mRf/view?usp=sharing"
    );
    // const link = document.createElement("a");
    // link.href = "/images/test.pdf";
    // // link.download = "/images/test.pdf";
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);
  };

  return (
    <div
      className={`${colorBg} flex justify-around border-b-2 p-2 items-center hover:border-slate-500 hover:border-t-2 hover:border-t-gray-200 font-bold text-sm`}
    >
      <div className=" w-4/12">
        <p>From: Regional Manager (Zakaria)</p>
      </div>
      <div className=" w-4/12">
        <p>To: Regional Manager (Zakaria), National Manager (Kristain)</p>
      </div>
      <div className=" w-2/12">
        <p>Courier Recruiitment</p>
      </div>
      <div className=" w-1/12">
        <p>Program</p>
      </div>
      <div className=" w-1/12">
        <button onClick={downloadFile} className=" text-@Blu font-bold">
          <BsDownload />
        </button>
      </div>
      <div className=" min-w-[5rem] text-right  w-1/12">
        <p>{time}</p>
      </div>
    </div>
  );
};

export default CCList;
