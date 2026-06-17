// textNode.js
import { useState } from "react";
import { BaseNode } from "./BaseNode";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");

  return (
    <BaseNode
      id={id}
      title="Text"
      color="#FF9800"
      outputs={[{ id: "output", label: "Output" }]}
    >
      <label style={{ display: "block" }}>
        Text:
        <input
          type="text"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
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
    </BaseNode>
  );
};
