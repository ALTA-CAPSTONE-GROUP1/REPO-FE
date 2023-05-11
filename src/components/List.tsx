import { FC, useEffect, useState } from "react";

interface Props {
  status: string;
  time: string;
  opened: boolean;
}

const List: FC<Props> = (props) => {
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
  }, []);

  return (
    <div
      className={`${colorBg} flex justify-around border-b-2 p-2 hover:border-slate-500 hover:border-t-2 hover:border-t-gray-200 font-bold text-sm`}
    >
      <div>
        <p>To: Regional Manager (Zakaria), National Manager (Kristain)</p>
      </div>
      <div className="flex flex-col">
        <p>Courier Recruiitment</p>
        <a
          href="/path/to/file.pdf"
          download
          className=" font-bold py-2 px-4 rounded flex justify-start items-center"
        >
          <img src="/images/pdf.png" alt="" className="w-6 h-6 object-cover" />
          <p>File.pdf</p>
        </a>
      </div>
      <div className={`${colorStatus} max-w-[3rem]`}>
        <p>{status}</p>
      </div>
      <div className=" min-w-[5rem] text-right">
        <p>{time}</p>
      </div>
    </div>
  );
};

export default List;
