import { ReactNode, FC, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
interface Props {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const SideBar: FC<Props> = (props) => {
  const [bg1, setBg1] = useState<boolean>(true);
  const [bg2, setBg2] = useState<boolean>(false);
  const [bg3, setBg3] = useState<boolean>(false);
  const navigate = useNavigate();
  const { children, onClick } = props;

  function handleMenu1() {
    setBg1(true);
    setBg2(false);
    setBg3(false);

    navigate("/");
  }

  function handleMenu2() {
    setBg1(false);
    setBg2(true);
    setBg3(false);

    navigate("/cc");
  }

  function handleMenu3() {
    setBg1(false);
    setBg2(false);
    setBg3(true);

    navigate("/approve");
  }

  return (
    <div className="drawer drawer-mobile h-full ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">{children}</div>
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
            <button onClick={handleMenu1}>Submission</button>
          </li>
          <li className={`${bg2 ? "bg-@Red3" : ""}  rounded-full mt-3 `}>
            <button onClick={handleMenu2}>CC</button>
          </li>
          <li className={`${bg3 ? "bg-@Red3" : ""}  rounded-full mt-3 `}>
            <button onClick={handleMenu3}>Approve</button>
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
