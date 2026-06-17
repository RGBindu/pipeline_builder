// inputNode.js
import { useState } from "react";
import { BaseNode } from "./BaseNode";

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.inputName || id.replace("customInput-", "input_"),
  );
  const [inputType, setInputType] = useState(data?.inputType || "Text");

  return (
    <BaseNode
      id={id}
      title="Input"
      color="#4CAF50"
      outputs={[{ id: "value", label: "Value" }]}
    >
      <label style={{ display: "block", marginBottom: "8px" }}>
        Name:
        <input
          type="text"
          value={currName}
          onChange={(e) => setCurrName(e.target.value)}
          style={{
            width: "100%",
            marginTop: "4px",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            outline: "none",
          }}
        />
      </label>

      <label style={{ display: "block" }}>
        Type:
        <select
          value={inputType}
          onChange={(e) => setInputType(e.target.value)}
          style={{
            width: "100%",
            marginTop: "4px",
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            background: "#fff",
          }}
        >
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </label>
    </BaseNode>
  );
};
