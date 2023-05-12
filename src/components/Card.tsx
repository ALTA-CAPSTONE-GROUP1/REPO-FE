import { FC } from "react";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BlueButton, Red2Button, RedButton } from "@/components/Button";
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

interface PropsTableOffice {
  office: string;
  link_del: string;
}
export const CardTableOffice: FC<PropsTableOffice> = (props) => {
  const { office, link_del } = props;

  return (
    <tr>
      <td className="capitalize bg-white border-@Gray2">{office}</td>
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

interface PropsTableSubmissionType {
  sub_name: string;
  sub_value: string;
  sub_requirement: string;
  link_del: string;
}
export const CardTableSubmissionType: FC<PropsTableSubmissionType> = (
  props
) => {
  const { sub_name, sub_value, sub_requirement, link_del } = props;

  return (
    <tr>
      <td className="capitalize bg-white border-@Gray2">{sub_name}</td>
      <td className="capitalize bg-white border-@Gray2">{sub_value}</td>
      <td className="capitalize bg-white border-@Gray2">{sub_requirement}</td>
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

interface PropsApproving {
  title: string;
  type: string;
  from: string;
  cc: string;
  message: string;
  file: string;
  to: string;
}
export const CardApproving: FC<PropsApproving> = (props) => {
  const { title, type, from, cc, message, file, to } = props;

  return (
    <div className="overflow-x-auto w-full p-6 mt-2">
      <h3 className="font-bold text-2xl text-black">Submission</h3>
      <div className="mt-5">
        <div className="flex justify-between">
          <h3 className="font-bold text-3xl text-black">{title}</h3>
          <h3 className="font-bold text-xl text-@Green">{type}</h3>
        </div>
        <div className="mt-2">
          <h3 className="capitalize font-semibold text-2xl text-black">
            {from}
          </h3>
          <h5 className="text-@Gray">{cc}</h5>
          <p className="mt-5 text-xl">{message} </p>
          <div className="mt-20 ">
            <a className="text-9xl text-@Red">
              <BsFileEarmarkPdfFill />
            </a>
            <h3 className="capitalize font-semibold text-2xl text-black">
              {file} lampiran
            </h3>
            <h4 className="text-@Gray font-semibold">{to}</h4>
          </div>
          <div className="flex justify-end">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="w-40">
                <Red2Button
                  label="Revise"
                  id="button-approving-revise"
                  type="submit"
                />
              </div>
              <div className="w-40">
                <RedButton
                  label="Reject"
                  id="button-approving-eject"
                  type="submit"
                />
              </div>
              <div className="w-40">
                <BlueButton
                  label="Approve"
                  id="button-approving-approve"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
interface PropsSubmission {
  title: string;
  type: string;
  from: string;
  cc: string;
  message: string;
  file: string;
  to: string;
  action: string;
  status: string;
}
export const CardSubmission: FC<PropsSubmission> = (props) => {
  const { title, type, from, cc, message, file, to, action, status } = props;

  return (
    <div className="overflow-x-auto w-full p-6 mt-2">
      <div className="mt-10">
        <div className="flex justify-between">
          <h3 className="font-bold text-3xl text-black">{title}</h3>
          <h3 className="font-bold text-xl text-@Green">{type}</h3>
        </div>
        <div className="mt-2">
          <h3 className="capitalize font-semibold text-2xl text-black">
            {from}
          </h3>
          <h5 className="text-@Gray">{cc}</h5>
          <p className="mt-5 text-xl">{message} </p>
          <div className="mt-20 ">
            <a className="text-9xl text-@Red">
              <BsFileEarmarkPdfFill />
            </a>
            <h3 className="capitalize font-semibold text-2xl text-black">
              {file} lampiran
            </h3>
            <h4 className="text-@Gray font-semibold">{to}</h4>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <h3 className="capitalize font-semibold text-2xl text-black">
              {action}
            </h3>
            <div>
              <h3 className="capitalize font-bold text-xl text-@Orange">
                {status}
              </h3>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="w-40">
                <RedButton label="Edit" id="button-sub-edit" type="submit" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
