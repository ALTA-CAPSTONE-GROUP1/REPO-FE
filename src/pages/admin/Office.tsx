import { TabOffice, TabSubmisionType } from "@/components/Tab";
import { FC } from "react";
import { LayoutAdmin } from "@/components/Layout";

export const Office: FC = () => {
  return (
    <LayoutAdmin>
      <div
        className="max-w-[85rem] w-full mx-auto bg-white"
        aria-label="Global"
      >
        <TabOffice />
      </div>
    </LayoutAdmin>
  );
};
