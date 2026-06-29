import { useStore } from "./store";

export const SubmitButton = () => {
  const { nodes, edges } = useStore();

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nodes: nodes.map((node) => ({
            id: node.id,
          })),
          edges: edges.map((edge) => ({
            source: edge.source,
            target: edge.target,
          })),
        }),
      });

      if (!response.ok) {
        alert(
          `Server Error (${response.status}): Unable to parse the pipeline. Please check your request and try again.`,
        );
        return;
      }

      const result = await response.json();

      alert(
        `Pipeline contains ${result.num_nodes} nodes and ${result.num_edges} edges.\n\n` +
          `This pipeline ${result.is_dag ? "IS" : "IS NOT"} a valid DAG.`,
      );
    } catch (error) {
      alert(
        "Network Error: Unable to connect to the backend. Please make sure the FastAPI server is running and try again.",
      );
      console.error(error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <button
        type="button"
        onClick={handleSubmit}
        style={{
          background: "#4f46e5",
          color: "white",
          border: "none",
          borderRadius: "12px",
          padding: "12px 28px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(79,70,229,0.3)",
        }}
      >
        Submit
      </button>
    </div>
  );
};
