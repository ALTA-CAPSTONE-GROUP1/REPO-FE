import {
  Plugin,
  PluginOnCanvasLayerRender,
  Viewer,
  Worker,
} from "@react-pdf-viewer/core";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

//open
import { openPlugin } from "@react-pdf-viewer/open";
import "@react-pdf-viewer/open/lib/styles/index.css";

function App() {
  const fileUrl = "/images/test2.pdf";
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <div
        style={{
          border: "1px solid rgba(0, 0, 0, 0.3)",
          height: "750px",
        }}
      >
        <Viewer
          fileUrl={fileUrl}
          plugins={[
            // Register plugins
            defaultLayoutPluginInstance,
          ]}
        />
      </div>
    </Worker>
  );
}

export default App;
