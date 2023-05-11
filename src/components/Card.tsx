import { FC } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line, RiPencilLine } from "react-icons/ri";

interface PropsTableUsers {
  name: string;
  id_user: string;
  email_address: string;
  position: string;
  office: string;
  link_del: string;
  link_update: string;
}

export const CardTableUser: FC<PropsTableUsers> = (props) => {
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
        <div className="flex justify-center">
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
        </div>
      </th>
    </tr>
  );
};
interface PropsTablePosition {
  position: string;
  tag: string;
  link_del: string;
}

export const CardTablePosition: FC<PropsTablePosition> = (props) => {
  const { position, tag, link_del } = props;

  return (
    <tr>
      <td className="bg-white border-@Gray2">{position}</td>
      <td className="uppercase bg-white border-@Gray2">{tag}</td>
      <th className="bg-white border-@Gray2">
        <div className="flex pr-3 justify-end">
          <Link to={link_del}>
            <button className="btn btn-ghost btn-xl text-xl text-@Red">
              <RiDeleteBin6Line />
            </button>
          </Link>
        </div>
      </th>
    </tr>
  );
};
