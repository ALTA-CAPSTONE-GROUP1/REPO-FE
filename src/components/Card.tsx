import { FC } from "react";
import { Link } from "react-router-dom";
import { BsQuestionCircle, BsSearch } from "react-icons/bs";
import {
  RiDeleteBin6Line,
  RiPencilLine,
  RiArrowLeftLine,
  RiArrowRightLine,
} from "react-icons/ri";

interface PropsTableUsers {
  name: string;
  id_user: string;
  email_address: string;
  position: string;
  office: string;
  link_del: string;
  link_update: string;
}

const CardTableUser: FC<PropsTableUsers> = (props) => {
  const {
    name,
    id_user,
    email_address,
    position,
    office,
    link_del,
    link_update,
  } = props;

  return (
    <div className="overflow-x-auto w-full p-6 mt-20 ">
      <div className="flex flex-row p-2 bg-@Red2 text-black rounded-ss-md rounded-se-md justify-between items-center">
        <p className="font-bold">Team Members</p>

        <label className="relative block flex-initial w-64 rounded-full ">
          <input
            className="rounded-full placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-@Red focus:ring-@Red focus:ring-1 sm:text-sm"
            placeholder="Search for anything..."
            type="text"
            name="search"
          />
          <span className="sr-only">Search</span>
          <span className="absolute inset-y-0 right-4 flex justify-end items-center pl-2">
            <BsSearch className="h-5 w-5 font-bold" />
          </span>
        </label>
      </div>

      <table className="table w-full border border-@Gray2">
        {/* head */}
        <thead>
          <th className="capitalize bg-@Gray2 text-black">Name</th>
          <th className=" bg-@Gray2 text-black">ID</th>
          <th className="capitalize  bg-@Gray2 text-black">Email Address</th>
          <th className="capitalize  bg-@Gray2 text-black">
            <div className="flex flex-row gap-2 text-black">
              <p>Position</p>
              <p>
                <BsQuestionCircle />
              </p>
            </div>
          </th>
          <th className="capitalize  bg-@Gray2 text-black">
            <div className="flex flex-row gap-2 text-black">
              <p>Office</p>
              <p>
                <BsQuestionCircle />
              </p>
            </div>
          </th>
          <th className="capitalize  bg-@Gray2 text-black ">Action</th>
        </thead>
        <tbody>
          <tr>
            <td className="bg-white border-@Gray2">
              <div className="flex items-center space-x-3">
                <div>
                  <div className="font-bold text-black">{name}</div>
                  <div className="text-sm opacity-50 text-@Gray">{id_user}</div>
                </div>
              </div>
            </td>
            <td className="bg-white border-@Gray2">{id_user}</td>
            <td className="bg-white border-@Gray2">{email_address}</td>
            <td className="bg-white border-@Gray2">{position}</td>
            <td className="bg-white border-@Gray2">{office}</td>
            <th className="bg-white border-@Gray2">
              <Link to={link_del}>
                <button className="btn btn-ghost btn-xl text-xl text-@Red">
                  <RiDeleteBin6Line />
                </button>
              </Link>

              <label
                htmlFor="my-modal-3"
                className="btn btn-ghost btn-xl text-xl text-@Blue"
              >
                <RiPencilLine />
                {link_update}
              </label>
            </th>
          </tr>
        </tbody>
        {/* foot */}
        <tfoot></tfoot>
      </table>
      <div className="flex flex-row p-2 bg-white text-black border rounded-es-md rounded-ee-md justify-between items-center">
        <button className="btn btn-ghost btn-xl text-xl text-@Gray capitalize border border-@Gray rounded-md">
          <RiArrowLeftLine /> Previous
        </button>
        <div className="btn-group">
          <button className="btn btn-ghost bg-@Red2">1</button>
          <button className="btn btn-ghost">2</button>
          <button className="btn btn-ghost ">...</button>
          <button className="btn btn-ghost">99</button>
          <button className="btn btn-ghost">100</button>
        </div>
        <button className="btn btn-ghost btn-xl text-xl text-@Gray capitalize border border-@Gray rounded-md">
          Next <RiArrowRightLine />
        </button>
      </div>
    </div>
  );
};

export default CardTableUser;
