import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { FC, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import axios from "axios";
import * as z from "zod";

import { ApprovingData } from "@/utils/types/Admin";
import { LayoutAdmin } from "@/components/Layout";
import { CardApproving } from "@/components/Card";
import { BlueButton, Red2Button, RedButton } from "@/components/Button";
import { Input } from "@/components/Input";
import Loading from "@/components/Loading";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  submission_id: z.string().min(1, { message: "Submission ID is Failed" }),
  token: z
    .string()
    .min(16, { message: "Submission ID Minimum 16 Character" })
    .refine((value) => value === "ss#561618sadadadsw", {
      message: "Invalid token",
    }),
});
type Schema = z.infer<typeof schema>;

export const Approving: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [clicked, setClicked] = useState(false);
  const [action, setAction] = useState<string>("");
  const [cookies, setCookie] = useCookies([
    "submissionData",
    "applicantData",
    "approverData",
  ]);
  const navigate = useNavigate();
  const submissionData = cookies.submissionData;
  const applicantData = cookies.applicantData;
  const approverData = cookies.approverData;

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Schema> = (data) => {
    axios
      .post(`hyper-approval`, data)
      .then((res) => {
        const { message, data } = res.data;
        setCookie(
          "submissionData",
          {
            title: data["submission-title"],
            attachment: data.attachment,
            messageBody: data.message_body,
          },
          { path: "/" }
        );
        setCookie(
          "applicantData",
          {
            name: data.applicant_name,
            position: data.applicant_position,
          },
          { path: "/" }
        );
        setCookie("approverData", data.approver_action, { path: "/" });
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onUpdate: SubmitHandler<Schema> = (data) => {
    setLoading(true);
    const newData = { ...data, action: action };
    alert(JSON.stringify(newData));
    axios
      .put(`hyper-approval`, newData)
      .then((res) => {
        const { message, data } = res.data;
        if (data) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: message + " with " + action + " this submission",
            showCancelButton: false,
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/approvong");
            }
          });
        }
      })
      .catch((error) => {
        const { message } = error.response.data;
        Swal.fire({
          title: "Failed",
          text: message,
          showCancelButton: false,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <LayoutAdmin>
      <div
        className="max-w-[85rem] w-full mx-auto bg-white"
        aria-label="Global"
      >
        <form
          className="flex flex-col p-4 bg-white rounded-md "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mt-3">
            <h3 className="font-bold text-2xl text-black">
              Approve Submission
            </h3>
            <h3 className="text-sm">
              To approve submission, an admin must have a token.{" "}
            </h3>
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              <div className="mt-5 w-full">
                <label className="font-semibold text-md text-black">
                  ID Submission
                </label>
                <Input
                  register={register}
                  name="submission_id"
                  placeholder="Enter ID Submission"
                  id="input-id-submission"
                  error={errors.submission_id?.message}
                />
              </div>
              <div className="mt-5 w-full">
                <label className="font-semibold text-md text-black">
                  Token
                </label>
                <Input
                  register={register}
                  name="token"
                  placeholder="Enter Token"
                  id="input-token"
                  error={errors.token?.message}
                />
              </div>
              <div className="mt-5 md:mt-10 w-full md:w-80">
                <RedButton
                  label="Search"
                  id="button-search-id-submission"
                  type="submit"
                  onClick={() => {
                    if (watch("token") === "ss#561618sadadadsw") {
                      setClicked(true);
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: "Invalid Token",
                        text: "Please enter a valid token.",
                        showCancelButton: false,
                      });
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </form>
        {loading ? (
          <Loading />
        ) : (
          <div>
            {clicked && (
              <div className="overflow-x-auto w-full p-6 mt-2">
                <h3 className="font-bold text-2xl text-black">Submission</h3>
                <div className="mt-5">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-3xl text-black">
                      {submissionData?.title}
                    </h3>
                    <h3 className="font-bold text-xl text-@Green">
                      {/* {cookies.submission_type} */}
                    </h3>
                  </div>
                  <div className="mt-2">
                    <h3 className="capitalize font-semibold text-2xl text-black">
                      {applicantData?.position} {applicantData?.name}
                    </h3>
                    {/* <h4 className="capitalize font-semibold text-2xl text-black">
                To: {cookies.a}
              </h4>
              <h5 className="text-@Gray">
                Cc:{" "}
                {cc?.map((data) => {
                  return data.position + " " + data.name + ",";
                })}
              </h5> */}
                    <p className="mt-5 text-xl">
                      {submissionData?.messageBody}
                    </p>
                    <div className="mt-20 ">
                      <a className="text-5xl text-@Red">
                        <BsFileEarmarkPdfFill />
                      </a>
                      {approverData &&
                        approverData.map((approver: any, index: number) => (
                          <div key={index} className="flex flex-row gap-2">
                            <h3 className="capitalize font-semibold text-xl text-black gap-2">
                              {approver.approver_position}{" "}
                              {approver.approver_name}
                            </h3>
                            <h3
                              className={`capitalize font-semibold text-xl ${
                                approver.action === "approve"
                                  ? "text-@Green"
                                  : approver.action === "reject"
                                  ? "text-@Red"
                                  : "text-@Orange"
                              }`}
                            >
                              {approver.action}
                            </h3>
                          </div>
                        ))}
                    </div>
                    <form onSubmit={handleSubmit(onUpdate)}>
                      <div className="flex justify-end mb-5 pr-4">
                        <div className="flex flex-col md:flex-row gap-2">
                          <div className="w-40">
                            <Red2Button
                              label="Revise"
                              id="button-approve-revise"
                              type="submit"
                              onClick={() => setAction("revise")}
                            />
                          </div>
                          <div className="w-40">
                            <RedButton
                              label="Reject"
                              id="button-approve-eject"
                              type="submit"
                              onClick={() => setAction("reject")}
                            />
                          </div>
                          <div className="w-40">
                            <BlueButton
                              label="Approve"
                              id="button-approve-approve"
                              type="submit"
                              onClick={(e) => setAction("approve")}
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </LayoutAdmin>
  );
};
