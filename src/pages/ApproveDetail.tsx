import SideBar from "@/components/SideBar";
import { FC, useState } from "react";
import { RedButton, Red2Button, BlueButton } from "@/components/Button";
import { CardApprove } from "@/components/Card";
import { Input } from "@/components/Input";
import { RiCloseCircleFill } from "react-icons/ri";
import { Layout } from "@/components/Layout";
import Loading from "@/components/Loading";

const ApproveDetail: FC = () => {
  const [createSubmission, setCreateSubmission] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Layout>
      <SideBar onClick={() => setCreateSubmission(!createSubmission)}>
        <div className="h-full overflow-auto  min-w-[50rem]">
          {loading ? (
            <Loading />
          ) : (
            <CardApprove
              title="Courier Recruitment"
              type="Recruitment"
              from="Product Design : Azhari Aziz"
              cc="Regional Manager Olivia, Product Design Baker, Product Manager Andi, UI Design Natali, Frontend Developer Lana, Backend Developer Demi"
              message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
              file="1"
              to="Approve by : Regional Zakaria"
            />
          )}
          <div className="flex justify-end mb-5 pr-4 ">
            <textarea
              placeholder="Input Note"
              id="note-acction"
              className="textarea rounded-lg resize-none shadow-md w-1/2 pb-20"
            ></textarea>
          </div>
          <div className="flex justify-end mb-5 pr-4">
            <div className="flex flex-col md:flex-row gap-2">
              <div className="w-40">
                <Red2Button
                  label="Revise"
                  id="button-approve-revise"
                  type="submit"
                />
              </div>
              <div className="w-40">
                <RedButton
                  label="Reject"
                  id="button-approve-eject"
                  type="submit"
                />
              </div>
              <div className="w-40">
                <BlueButton
                  label="Approve"
                  id="button-approve-approve"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="h-10 w-full bg-@Red4 relative transition-all">
          {createSubmission ? (
            <div
              data-theme="cupcake"
              className="absolute right-2 bottom-2 h-[30rem] w-[50rem] shadow-2xl -translate-x-2 translate-y-2 transition-all"
            >
              <div className="flex justify-between px-5 py-2 bg-@Red4 items-center">
                <p className=" text-sm font-bold">New Submission</p>
                <button
                  className=" text-@Red"
                  onClick={() => setCreateSubmission(!createSubmission)}
                >
                  <RiCloseCircleFill />
                </button>
              </div>
              <div data-theme="light" className=" p-5 h-[90%]">
                <form action="">
                  <div className="form-control">
                    <div className="input-group rounded-md justify-between w-[40%]">
                      <select className="select select-bordered">
                        <option disabled selected>
                          Submission Type
                        </option>
                        <option>Program</option>
                        <option>Finance</option>
                      </select>
                      <select className="select select-bordered">
                        <option disabled selected>
                          Value
                        </option>
                        <option>{">60 Juta"}</option>
                        <option>{"<30 Juta"}</option>
                      </select>
                    </div>
                    <Input
                      type="text"
                      placeholder="Title"
                      className=" border-b-2 focus:outline-none focus:border-b-@Red w-full mt-3"
                    />
                    <Input
                      type="text"
                      placeholder="To:"
                      className=" border-b-2 focus:outline-none focus:border-b-@Red w-full mt-3"
                    />
                    <Input
                      type="text"
                      placeholder="CC:"
                      className=" border-b-2 focus:outline-none focus:border-b-@Red w-full mt-3"
                    />
                    <textarea
                      className="textarea pb-20"
                      placeholder="Messages"
                    ></textarea>
                    <div className="flex justify-between items-end mt-5 h-20 max-h-20">
                      <Input type="file" className="w-full " multiple />
                      <button>Send</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </SideBar>
    </Layout>
  );
};

export default ApproveDetail;
