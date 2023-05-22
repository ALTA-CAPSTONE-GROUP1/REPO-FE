import { FC } from "react";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BlueButton, Red2Button, RedButton } from "@/components/Button";
import { RiDeleteBin6Line, RiPencilLine } from "react-icons/ri";
import SubDetailType from "@/utils/types/SubDetail";
import ApproveDetailType from "@/utils/types/ApproveDetail";

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

export const CardApproving: FC<ApproveDetailType> = (props) => {
  const {
    title,
    from,
    cc,
    to,
    submission_type,
    status_by,
    message_body,
    attacment,
  } = props;

  return (
    <div className="overflow-x-auto w-full p-6 mt-2">
      <h3 className="font-bold text-2xl text-black">Submission</h3>
      <div className="mt-5">
        <div className="flex justify-between">
          <h3 className="font-bold text-3xl text-black">{title}</h3>
          <h3 className="font-bold text-xl text-@Green">{submission_type}</h3>
        </div>
        <div className="mt-2">
          <h3 className="capitalize font-semibold text-2xl text-black">
            From: {from?.position + " " + from?.name}
          </h3>
          <h4 className="capitalize font-semibold text-2xl text-black">
            To:{" "}
            {to?.map((data) => {
              return data.position + " " + data.name + ",";
            })}
          </h4>
          <h5 className="text-@Gray">
            Cc:{" "}
            {cc?.map((data) => {
              return data.position + " " + data.name + ",";
            })}
          </h5>
          <p className="mt-5 text-xl">{message_body} </p>
          <div className="mt-20 ">
            <a className="text-5xl text-@Red">
              <BsFileEarmarkPdfFill />
            </a>
            <h3 className="capitalize font-semibold text-2xl text-black">
              {attacment}
            </h3>
            <h4 className="text-@Gray font-semibold">
              {status_by?.map((data) => {
                return data.status + " " + data.by + ",";
              })}
            </h4>
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
interface PropsSubmission extends SubDetailType {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onClickPdf: React.MouseEventHandler<HTMLButtonElement>;
  onClickDelete: React.MouseEventHandler<HTMLButtonElement>;
  status: string | null;
}
export const CardSubmission: FC<PropsSubmission> = (props) => {
  const {
    status,
    action_message,
    to,
    cc,
    submission_type,
    title,
    message,
    approver_action,
    onClick,
    onClickPdf,
    onClickDelete,
  } = props;

  return (
    <div className="overflow-x-auto w-full px-6">
      <div className="mt-10">
        <div className="flex justify-between">
          <h3 className="font-bold text-3xl text-black">{title}</h3>
          <h3 className="font-bold text-xl text-@Green">{submission_type}</h3>
        </div>
        <div className="mt-2">
          <h3 className="capitalize font-semibold text-2xl text-black">
            To:{" "}
            {to?.map((data) => {
              return data.approver_position + " " + data.approver_name + ",";
            })}
          </h3>
          <h5 className="text-@Gray">
            Cc:{" "}
            {cc?.map((data) => {
              return data.cc_position + " " + data.cc_name + ",";
            })}
          </h5>
          <p className="mt-5 text-base min-h-[10rem]">{message} </p>
          <div className="mt-20 ">
            <button onClick={onClickPdf} className="text-5xl text-@Red">
              <BsFileEarmarkPdfFill />
            </button>
            <h3 className="capitalize font-semibold text-2xl text-black">
              {/* {attachment} */}
            </h3>
            <p></p>
            <h4 className="text-@Gray font-semibold max-w-[60%]">
              {approver_action?.map((data) => {
                return (
                  <div
                    className="tooltip"
                    data-tip={
                      data.action === "approve" ? `${action_message}` : ""
                    }
                  >
                    <p>
                      {data.action +
                        " by " +
                        data.approver_position +
                        " " +
                        data.approver_name +
                        ","}
                    </p>
                  </div>
                );
              })}
            </h4>
          </div>
          {/* <div className="flex flex-row gap-2 items-center">
            <h3 className="capitalize font-semibold text-2xl text-black">
              {action}
            </h3>
            <div>
              <h3 className="capitalize font-bold text-xl text-@Orange">
                {status}
              </h3>
            </div>
          </div> */}
          <div className="flex justify-end">
            <div className="flex flex-col md:flex-row gap-2">
              {status === "Sent" || status === "sent" ? (
                <div className="flex w-full justify-between">
                  <div className="w-40 px-2">
                    <Red2Button
                      label="Delete"
                      id="button-approve-revise"
                      type="submit"
                      onClick={onClickDelete}
                    />
                  </div>
                  <div className="w-40 px-2">
                    <RedButton
                      label="Edit"
                      id="button-sub-edit"
                      type="submit"
                      onClick={onClick}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
              {status === "revised" ? (
                <div className="w-40">
                  <RedButton
                    label="Edit"
                    id="button-sub-edit"
                    type="submit"
                    onClick={onClick}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CardApprove: FC<ApproveDetailType> = (props) => {
  const {
    title,
    from,
    cc,
    to,
    submission_type,
    status_by,
    message_body,
    attacment,
  } = props;

  function handlePdf() {
    const url = "/images/test2.pdf";
    const approver = status_by?.map((data) => {
      return data.status !== "" &&
        data.status !== null &&
        data.status !== undefined
        ? data.status + " by " + data.by + ","
        : "";
    });
    window.open(`/app2?url=${url}&approver=${approver}`);
  }
  return (
    <div className="overflow-x-auto w-full p-6 mt-2">
      <div className="mt-5">
        <div className="flex justify-between">
          <h3 className="font-bold text-3xl text-black">{title}</h3>
          <h3 className="font-bold text-xl text-@Green">{submission_type}</h3>
        </div>
        <div className="mt-2">
          <p className="capitalize font-semibold text-xl text-black">
            From: {from?.position + " " + from?.name}
          </p>
          <p className="capitalize font-semibold text-lg text-black">
            To:{" "}
            {to?.map((data) => {
              return data.position + " " + data.name + ",";
            })}
          </p>
          <h5 className="text-@Gray">
            Cc:{" "}
            {cc?.map((data) => {
              return data.position + " " + data.name + ",";
            })}
          </h5>
          <p className="mt-5 text-lg">{message_body} </p>
          <div className="mt-20 flex flex-col h-full justify-end w-4/12">
            <button onClick={handlePdf} className="text-5xl text-@Red">
              <BsFileEarmarkPdfFill />
            </button>
            <p className="capitalize font-semibold text-2xl text-black">
              {attacment}
            </p>
            <h4 className="text-@Gray font-semibold">
              {status_by?.map((data) => {
                return data.status + " " + data.by + ",";
              })}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
