// extraNodes.js — 5 new node types using BaseNode
import { BaseNode } from "./BaseNode";

export const ApiCallerNode = ({ id }) => (
  <BaseNode
    id={id}
    title="API Caller"
    color="#2196F3"
    inputs={[{ id: "input", label: "Input" }]}
    outputs={[{ id: "response", label: "Response" }]}
  >
    <span style={{ color: "#888" }}>Calls an external API</span>
  </BaseNode>
);

export const ConditionalNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Condition"
    color="#9C27B0"
    inputs={[{ id: "input", label: "Input" }]}
    outputs={[
      { id: "true", label: "True" },
      { id: "false", label: "False" },
    ]}
  >
    <span style={{ color: "#888" }}>Branch: true / false</span>
  </BaseNode>
);

export const DataTransformNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Data Transform"
    color="#00BCD4"
    inputs={[{ id: "input", label: "Input" }]}
    outputs={[{ id: "output", label: "Output" }]}
  >
    <span style={{ color: "#888" }}>Transforms data format</span>
  </BaseNode>
);

export const FileUploadNode = ({ id }) => (
  <BaseNode
    id={id}
    title="File Upload"
    color="#795548"
    outputs={[{ id: "file", label: "File" }]}
  >
    <input
      type="file"
      style={{
        width: "100%",
        fontSize: "12px",
        padding: "6px",
        border: "1px solid #cbd5e1",
        borderRadius: "8px",
        background: "#f8fafc",
      }}
    />
  </BaseNode>
);

export const WebhookTriggerNode = ({ id }) => (
  <BaseNode
    id={id}
    title="Webhook Trigger"
    color="#607D8B"
    outputs={[{ id: "payload", label: "Payload" }]}
  >
    <span style={{ color: "#888" }}>Triggered by webhook</span>
  </BaseNode>
);
