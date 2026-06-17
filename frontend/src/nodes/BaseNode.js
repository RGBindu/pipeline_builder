import { Handle, Position } from "reactflow";

export const BaseNode = ({
  id,
  title,
  color = "#6865A5",
  inputs = [],
  outputs = [],
  children,
}) => {
  return (
    <div
      style={{
        minWidth: 240,
        minHeight: 90,
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        background: "#ffffff",
        boxShadow: "0 10px 25px rgba(0,0,0,0.10)",
        overflow: "hidden",
        transition: "all 0.2s ease",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: color,
          padding: "12px 16px",
          color: "#fff",
          fontWeight: "600",
          fontSize: "14px",
          letterSpacing: "0.4px",
        }}
      >
        {title}
      </div>

      {/* Body */}
      <div
        style={{
          padding: "14px",
          fontSize: "13px",
          color: "#334155",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {children}
      </div>

      {/* Input Handles */}
      {inputs.map((input, i) => (
        <Handle
          key={input.id}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{
            top: `${((i + 1) / (inputs.length + 1)) * 100}%`,
            width: 12,
            height: 12,
            background: "#4f46e5",
            border: "3px solid white",
            boxShadow: "0 0 0 1px #cbd5e1",
          }}
        />
      ))}

      {/* Output Handles */}
      {outputs.map((output, i) => (
        <Handle
          key={output.id}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{
            top: `${((i + 1) / (inputs.length + 1)) * 100}%`,
            width: 12,
            height: 12,
            background: "#4f46e5",
            border: "3px solid white",
            boxShadow: "0 0 0 1px #cbd5e1",
          }}
        />
      ))}
    </div>
  );
};
