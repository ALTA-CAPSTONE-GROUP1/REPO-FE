import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { useLocation } from "react-router-dom";
import {
  LayerRenderStatus,
  Plugin,
  PluginOnCanvasLayerRender,
  Viewer,
  Worker,
} from "@react-pdf-viewer/core";
import { FC } from "react";

const DrawCanvasExample: FC = () => {
  const location = useLocation();
  const approver = new URLSearchParams(location.search).get("approver");
  const urlnya = new URLSearchParams(location.search).get("url");

  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const message = approver;

  const customCanvasPlugin = (): Plugin => {
    const onCanvasLayerRender = (e: PluginOnCanvasLayerRender) => {
      // Return if the canvas isn't rendered completely
      if (e.status !== LayerRenderStatus.DidRender) {
        return;
      }

      // `e.ele` is the canvas element
      const canvas = e.ele;

      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      const centerX = e.scale * canvas.width * 0.2;
      const centerY = e.scale * canvas.height * 0.03;

      const fonts = ctx.font.split(" ");
      const fontSize = parseInt(fonts[0], 5);

      ctx.textAlign = "center";
      ctx.font = `${fontSize * e.scale * 4}px ${fonts[1]}`;

      ctx.fillStyle = "#CCC";
      // ctx.fillText(message, centerX, 100);
      // let count = 1;
      // message.map((data, index) => {
      // count++;
      if (message) {
        return ctx.fillText(message, centerX, centerY, 1000);
      }
      // });
    };

    return {
      onCanvasLayerRender,
    };
  };

  const customCanvasPluginInstance = customCanvasPlugin();

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.6.172/build/pdf.worker.min.js">
      {urlnya !== null ? (
        <Viewer
          fileUrl={urlnya}
          plugins={[customCanvasPluginInstance, defaultLayoutPluginInstance]}
        />
      ) : (
        <Viewer
          fileUrl=""
          plugins={[customCanvasPluginInstance, defaultLayoutPluginInstance]}
        />
      )}
    </Worker>
  );
};

export default DrawCanvasExample;
