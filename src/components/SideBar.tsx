import { ReactNode, FC } from "react";
interface Props {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const SideBar: FC<Props> = (props) => {
  const { children, onClick } = props;

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
          <li className=" bg-@Red3 rounded-full mt-3 ">
            <a>Submission</a>
          </li>
          <li className="mt-3">
            <a>CC</a>
          </li>
          <li className="mt-3">
            <a>Approve</a>
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
