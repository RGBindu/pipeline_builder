export const SubmitButton = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <button
        type="submit"
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
