import { FC } from "react";
import { LayoutAdmin } from "@/components/Layout";
import { TabSubmisionType } from "@/components/Tab";

export const SubmissionType: FC = () => {
  return (
    <LayoutAdmin>
      <div
        className="max-w-[85rem] w-full mx-auto bg-white"
        aria-label="Global"
      >
        <TabSubmisionType />
      </div>
    </LayoutAdmin>
  );
};
