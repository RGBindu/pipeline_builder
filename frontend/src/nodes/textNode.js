// textNode.js
import { useState, useEffect, useRef } from "react";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";

const MIN_WIDTH = 200;
const MIN_HEIGHT = 80;
const MAX_WIDTH = 400;

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  // Find {{ variableName }} tokens — only valid JS identifiers
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const found = [];
    let match;
    while ((match = regex.exec(currText)) !== null) {
      if (!found.includes(match[1])) found.push(match[1]);
    }
    setVariables(found);
    updateNodeInternals(id);
  }, [currText, id, updateNodeInternals]);

  // Auto-resize height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const newHeight = Math.max(MIN_HEIGHT - 50, textareaRef.current.scrollHeight);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  }, [currText]);

  // Re-notify React Flow whenever the variables array changes (handles moved/added/removed)
  useEffect(() => {
    updateNodeInternals(id);
  }, [variables, id, updateNodeInternals]);

  const headerHeight = 50;
  const rowGap = 22;

  return (
    <div
      style={{
        minWidth: MIN_WIDTH,
        maxWidth: MAX_WIDTH,
        minHeight: MIN_HEIGHT,
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        background: "#ffffff",
        boxShadow: "0 10px 25px rgba(0,0,0,0.10)",
        overflow: "visible",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#FF9800",
          padding: "12px 16px",
          color: "#fff",
          fontWeight: "600",
          fontSize: "14px",
          letterSpacing: "0.4px",
          borderRadius: "16px 16px 0 0",
        }}
      >
        Text
      </div>

      {/* Body */}
      <div style={{ padding: "14px", fontSize: "13px", color: "#334155" }}>
        <label style={{ display: "block" }}>
          Text:
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={(e) => setCurrText(e.target.value)}
            rows={1}
            style={{
              width: "100%",
              marginTop: "4px",
              padding: "8px",
              borderRadius: "8px",
              border: "1px solid #cbd5e1",
              outline: "none",
              resize: "none",
              overflow: "hidden",
              overflowWrap: "break-word",
              wordWrap: "break-word",
              fontFamily: "inherit",
              fontSize: "13px",
              boxSizing: "border-box",
            }}
          />
        </label>
      </div>

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          top: headerHeight / 2,
          width: 12,
          height: 12,
          background: "#4f46e5",
          border: "3px solid white",
          boxShadow: "0 0 0 1px #cbd5e1",
        }}
      />

      {/* Variable handles — stable id, stacked below header */}
      {variables.map((variable, i) => (
        <Handle
          key={variable}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{
            top: headerHeight + i * rowGap + 10,
            width: 12,
            height: 12,
            background: "#16a34a",
            border: "3px solid white",
            boxShadow: "0 0 0 1px #cbd5e1",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: "16px",
              top: "-7px",
              fontSize: "10px",
              fontWeight: "500",
              color: "#16a34a",
              whiteSpace: "nowrap",
              pointerEvents: "none",
              background: "#fff",
              padding: "0 3px",
              borderRadius: "4px",
            }}
          >
            {variable}
          </span>
        </Handle>
      ))}
    </div>
  );
};