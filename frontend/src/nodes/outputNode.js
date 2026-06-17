// outputNode.js
import { useState } from "react";
import { BaseNode } from "./BaseNode";

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(
    data?.outputName || id.replace("customOutput-", "output_"),
  );
  const [outputType, setOutputType] = useState(data?.outputType || "Text");

  return (
    <BaseNode
      id={id}
      title="Output"
      color="#F44336"
      inputs={[{ id: "value", label: "Value" }]}
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
          }}
        />
      </label>

      <label style={{ display: "block" }}>
        Type:
        <select
          value={outputType}
          onChange={(e) => setOutputType(e.target.value)}
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
          <option value="Image">Image</option>
        </select>
      </label>
    </BaseNode>
  );
};
