import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="h-screen loading flex justify-center items-center">
      <progress className="progress w-56"></progress>
    </div>
  );
};

export default Loading;
