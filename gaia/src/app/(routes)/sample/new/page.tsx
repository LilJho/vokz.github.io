import AlertSample from "@/components/views/samples/AlertSample";
import ProgressSample from "@/components/views/samples/ProgressSample";
import TabsSample from "@/components/views/samples/TabsSample";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col gap-10">
      <AlertSample />
      <ProgressSample />
      <TabsSample />
    </div>
  );
};

export default page;
