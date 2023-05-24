import { ReactNode, FC } from "react";
import { RiFileAddFill } from "react-icons/ri";
import { RiFileList2Fill } from "react-icons/ri";
import { BsFileCheckFill } from "react-icons/bs";
import { RiLogoutBoxLine } from "react-icons/ri";

interface Props {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onClickUserHome: React.MouseEventHandler<HTMLButtonElement>;
  onClickCC: React.MouseEventHandler<HTMLButtonElement>;
  onClickApprove: React.MouseEventHandler<HTMLButtonElement>;
  onClickLogout: React.MouseEventHandler<HTMLButtonElement>;
  bg: string;
}
const SideBar: FC<Props> = (props) => {
  const {
    children,
    onClick,
    onClickUserHome,
    onClickCC,
    onClickApprove,
    onClickLogout,
    bg,
  } = props;

  return (
    <div className="drawer drawer-mobile h-full max-w-[1700px] mx-auto max-h-[90%]">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      {children}

      <div className="drawer-side ">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 text-base-content bg-@Red4  font-semibold ">
          <li className="bg-@Red rounded-full mt-3 text-white ">
            {bg === "user-home" ? (
              <button
                className="flex justify-center items-center"
                onClick={onClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                New Submission{" "}
              </button>
            ) : (
              <button
                disabled
                className="flex justify-center items-center disabled:bg-slate-400"
                onClick={onClick}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                New Submission{" "}
              </button>
            )}
          </li>
          <li
            className={`${
              bg === "user-home" ? "bg-@Red3" : ""
            }  rounded-full mt-3 `}
          >
            <button onClick={onClickUserHome}>
              <RiFileAddFill /> Submission
            </button>
          </li>
          <li
            className={`${bg === "cc" ? "bg-@Red3" : ""}  rounded-full mt-3 `}
          >
            <button onClick={onClickCC}>
              {" "}
              <RiFileList2Fill /> CC
            </button>
          </li>
          <li
            className={`${
              bg === "approve" ? "bg-@Red3" : ""
            }  rounded-full mt-3 `}
          >
            <button onClick={onClickApprove}>
              <BsFileCheckFill /> Approve
            </button>
          </li>
          <li>
            <div className="divider"></div>
          </li>
          <li className="flex justify-center items-center">
            <button onClick={onClickLogout}>
              <RiLogoutBoxLine /> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
