import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { Input } from "@/components/Input";
import { RedButton } from "@/components/Button";
import { FC } from "react";
import { LayoutAdmin } from "@/components/Layout";
import { CardApproving } from "@/components/Card";

export const Approving: FC = () => {
  return (
    <LayoutAdmin>
      <div
        className="max-w-[85rem] w-full mx-auto bg-white"
        aria-label="Global"
      >
        <form className="flex flex-col p-4 bg-white rounded-md ">
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
                  placeholder="Enter ID Submission"
                  id="input-id-submission"
                />
              </div>
              <div className="mt-5 w-full">
                <label className="font-semibold text-md text-black">
                  Token
                </label>
                <Input placeholder="Enter Token" id="input-token" />
              </div>
              <div className="mt-5 md:mt-10 w-full md:w-80">
                <RedButton
                  label=" Search"
                  id="button-search-id-submission"
                  type="submit"
                />
              </div>
            </div>
          </div>
        </form>
        <CardApproving
          title="Courier Recruitment"
          type="Recruitment"
          from="Product Design : Azhari Aziz"
          cc="Regional Manager Olivia, Product Design Baker, Product Manager Andi, UI Design Natali, Frontend Developer Lana, Backend Developer Demi"
          message="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
          file="1"
          to="Approve by : Regional Zakaria"
        />
      </div>
    </LayoutAdmin>
  );
};
