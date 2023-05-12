import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Viewer, Worker } from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
interface ModalExampleProps {
  fileUrl: string;
}

const ModalExample: React.FC<ModalExampleProps> = ({ fileUrl }) => {
  const [shown, setShown] = useState(false);
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const modalBody = () => (
    <div
      style={{
        backgroundColor: "#fff",
        flexDirection: "column",
        overflow: "auto",

        /* Fixed position */
        left: "center",
        position: "fixed",
        top: "center",

        /* Take full size */
        height: "100%",
        width: "80%",

        /* Displayed on top of other elements */
        zIndex: 9999,
      }}
    >
      <div
        style={{
          alignItems: "center",
          backgroundColor: "#000",
          color: "#fff",
          display: "flex",
          padding: ".5rem",
        }}
      >
        <div style={{ marginRight: "auto" }}>sample-file-name.pdf</div>
        <button
          style={{
            backgroundColor: "#357edd",
            border: "none",
            borderRadius: "4px",
            color: "#ffffff",
            cursor: "pointer",
            padding: "8px",
          }}
          onClick={() => setShown(false)}
        >
          Close
        </button>
      </div>
      <div
        style={{
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      </div>
    </div>
  );

  return (
    <>
      <button
        style={{
          backgroundColor: "#00449e",
          border: "none",
          borderRadius: ".25rem",
          color: "#fff",
          cursor: "pointer",
          padding: ".5rem",
        }}
        onClick={() => setShown(true)}
      >
        Open modal
      </button>
      {shown && ReactDOM.createPortal(modalBody(), document.body)}
    </>
  );
};

export default ModalExample;
