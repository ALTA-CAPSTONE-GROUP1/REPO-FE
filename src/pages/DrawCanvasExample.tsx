import * as React from "react";
import {
  LayerRenderStatus,
  Plugin,
  PluginOnCanvasLayerRender,
  Viewer,
  Worker,
} from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

interface DrawCanvasExampleProps {
  fileUrl: string;
}

const DrawCanvasExample: React.FC<DrawCanvasExampleProps> = ({ fileUrl }) => {
  const message = ["Approved By Reginal Manager", "test 2"];
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const customCanvasPlugin = (): Plugin => {
    const onCanvasLayerRender = (e: PluginOnCanvasLayerRender) => {
      // Return if the canvas isn't rendered completely
      if (e.status !== LayerRenderStatus.DidRender) {
        return;
      }

      // `e.ele` is the canvas element
      const canvas = e.ele;

      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 3;

      const fonts = ctx.font.split(" ");
      const fontSize = parseInt(fonts[0], 5);

      ctx.textAlign = "center";
      ctx.font = `${fontSize * e.scale * 4}px ${fonts[1]}`;

      ctx.fillStyle = "#CCC";
      // ctx.fillText(message, centerX, 100);
      // let count = 1;
      // message.map((data, index) => {
      // count++;
      return ctx.fillText(message[0], centerX, 100);
      // });
    };

    return {
      onCanvasLayerRender,
    };
  };

  const customCanvasPluginInstance = customCanvasPlugin();

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Viewer
        fileUrl={fileUrl}
        plugins={[customCanvasPluginInstance, defaultLayoutPluginInstance]}
      />
      ;
    </Worker>
  );
};

export default DrawCanvasExample;
