// toolbar.js

import { DraggableNode } from "./draggableNode";
import { useStore } from "./store";
import { FaUndo, FaRedo } from "react-icons/fa";
import { useRef } from "react";

export const PipelineToolbar = () => {
  const { undo, redo, past, future, getPipeline, setPipeline } = useStore(
    (state) => ({
      undo: state.undo,
      redo: state.redo,
      past: state.past,
      future: state.future,
      getPipeline: state.getPipeline,
      setPipeline: state.setPipeline,
    }),
  );
  const fileInputRef = useRef(null);

  const handleExport = () => {
    const pipeline = getPipeline();

    if (pipeline.nodes.length === 0 && pipeline.edges.length === 0) {
      alert("There is no pipeline to export.");
      return;
    }

    const blob = new Blob([JSON.stringify(pipeline, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "pipeline.json";

    link.click();

    URL.revokeObjectURL(url);
  };

  const handleImport = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const pipeline = JSON.parse(e.target.result);

        if (!Array.isArray(pipeline.nodes) || !Array.isArray(pipeline.edges)) {
          alert("Invalid pipeline JSON.");
          return;
        }

        setPipeline(pipeline.nodes, pipeline.edges);

        alert("Pipeline imported successfully.");
      } catch {
        alert("Malformed JSON file.");
      }
    };

    reader.readAsText(file);
  };

  const handleSaveToServer = async () => {
    const pipeline = getPipeline();

    if (pipeline.nodes.length === 0 && pipeline.edges.length === 0) {
      alert("There is no pipeline to save.");
      return;
    }
    const name = prompt("Enter a pipeline name:");

    if (!name) return;

    const response = await fetch("http://127.0.0.1:8000/pipelines/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        nodes: pipeline.nodes,
        edges: pipeline.edges,
      }),
    });

    if (response.ok) {
      alert("Pipeline saved successfully.");
    } else {
      alert("Failed to save pipeline.");
    }
  };

  const handleLoadFromServer = async () => {
    const name = prompt("Enter pipeline name:");

    if (!name) return;

    const response = await fetch(
      `http://127.0.0.1:8000/pipelines/load/${name}`,
    );

    if (!response.ok) {
      alert("Pipeline not found.");
      return;
    }

    const pipeline = await response.json();

    setPipeline(pipeline.nodes, pipeline.edges);

    alert("Pipeline loaded successfully.");
  };
  const toolbarButtonStyle = {
    padding: "8px 14px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    minHeight: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
  };

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
            ...toolbarButtonStyle,
            background: past.length === 0 ? "#f3f4f6" : "#4f46e5",
            color: past.length === 0 ? "#9ca3af" : "#ffffff",
            cursor: past.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          <FaUndo size={16} />
          Undo
        </button>

        <button
          onClick={redo}
          disabled={future.length === 0}
          style={{
            ...toolbarButtonStyle,
            background: future.length === 0 ? "#f3f4f6" : "#4f46e5",
            color: future.length === 0 ? "#9ca3af" : "#ffffff",
            cursor: future.length === 0 ? "not-allowed" : "pointer",
          }}
        >
          <FaRedo size={16} />
          Redo
        </button>
        <button
          onClick={handleExport}
          style={{
            ...toolbarButtonStyle,
            background: "#10b981",
          }}
        >
          Export
        </button>

        <button
          onClick={() => fileInputRef.current.click()}
          style={{
            ...toolbarButtonStyle,
            background: "#f59e0b",
          }}
        >
          Import
        </button>

        <button
          onClick={handleSaveToServer}
          style={{
            ...toolbarButtonStyle,
            background: "#2563eb",
          }}
        >
          Save
        </button>

        <button
          onClick={handleLoadFromServer}
          style={{
            ...toolbarButtonStyle,
            background: "#7c3aed",
          }}
        >
          Load
        </button>
        <input
          type="file"
          accept=".json"
          ref={fileInputRef}
          onChange={handleImport}
          style={{ display: "none" }}
        />
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
