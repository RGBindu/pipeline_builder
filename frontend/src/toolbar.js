// toolbar.js
import { DraggableNode } from "./draggableNode";

export const PipelineToolbar = () => {
  return (
    <div
      style={{
        padding: "16px",
        background: "#ffffff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <div
        style={{
          marginTop: "8px",
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <DraggableNode type="customInput" label="Input" />
        <DraggableNode type="llm" label="LLM" />
        <DraggableNode type="customOutput" label="Output" />
        <DraggableNode type="text" label="Text" />
        <DraggableNode type="apiCaller" label="API Caller" />
        <DraggableNode type="conditional" label="Condition" />
        <DraggableNode type="dataTransform" label="Transform" />
        <DraggableNode type="fileUpload" label="File Upload" />
        <DraggableNode type="webhookTrigger" label="Webhook" />
      </div>
    </div>
  );
};
