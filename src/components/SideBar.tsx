import { ReactNode, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
interface Props {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onClickUserHome: React.MouseEventHandler<HTMLButtonElement>;
  onClickCC: React.MouseEventHandler<HTMLButtonElement>;
  onClickApprove: React.MouseEventHandler<HTMLButtonElement>;
  bg1: boolean;
  bg2: boolean;
  bg3: boolean;
}
const SideBar: FC<Props> = (props) => {
  const navigate = useNavigate();
  const {
    children,
    onClick,
    onClickUserHome,
    onClickCC,
    onClickApprove,
    bg1,
    bg2,
    bg3,
  } = props;

  return (
    <div className="drawer drawer-mobile h-full ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      {children}
      <div className="drawer-side ">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 text-base-content bg-@Red4  font-semibold ">
          <li className="bg-@Red rounded-full mt-3 text-white ">
            <button
              className=" flex justify-center items-center"
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
          </li>
          <li className={`${bg1 ? "bg-@Red3" : ""}  rounded-full mt-3 `}>
            <button onClick={onClickUserHome}>Submission</button>
          </li>
          <li className={`${bg2 ? "bg-@Red3" : ""}  rounded-full mt-3 `}>
            <button onClick={onClickCC}>CC</button>
          </li>
          <li className={`${bg3 ? "bg-@Red3" : ""}  rounded-full mt-3 `}>
            <button onClick={onClickApprove}>Approve</button>
          </li>
          <li>
            <div className="divider"></div>
          </li>
          <li className="flex justify-center items-center">
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
