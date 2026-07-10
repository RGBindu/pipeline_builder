// toolbar.js

import { DraggableNode } from "./draggableNode";
import { useStore } from "./store";
import { FaUndo, FaRedo } from "react-icons/fa";

export const PipelineToolbar = () => {
  const { undo, redo, past, future } = useStore((state) => ({
    undo: state.undo,
    redo: state.redo,
    past: state.past,
    future: state.future,
  }));

  return (
    <div
      style={{
        padding: "16px",
        background: "#ffffff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      {/* Undo / Redo Buttons */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "16px",
        }}
      >
        <button
          onClick={undo}
          disabled={past.length === 0}
          style={{
            padding: "8px 16px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            background: past.length === 0 ? "#f3f4f6" : "#4f46e5",
            color: past.length === 0 ? "#9ca3af" : "#ffffff",
            cursor: past.length === 0 ? "not-allowed" : "pointer",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <FaUndo size={18} />
          Undo
        </button>

        <button
          onClick={redo}
          disabled={future.length === 0}
          style={{
            padding: "8px 16px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            background: future.length === 0 ? "#f3f4f6" : "#4f46e5",
            color: future.length === 0 ? "#9ca3af" : "#ffffff",
            cursor: future.length === 0 ? "not-allowed" : "pointer",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <FaRedo size={18} />
          Redo
        </button>
      </div>

      {/* Existing Node Toolbar */}
      <div
        style={{
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
