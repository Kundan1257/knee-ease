export default function Help() {
  const box = {
    background: "#f8f9ff",
    borderRadius: "12px",
    padding: "18px",
    marginBottom: "16px",
    border: "1px solid #dcdcff"
  };

  return (
    <div style={{ padding: "20px", maxWidth: "420px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Help & Guidance ❓
      </h2>

      <div style={box}>
        <strong>About Knee-Lace</strong>
        <p style={{ marginTop: "6px" }}>
          Knee-Lace is designed to help people protect their knees while
          starting or maintaining physical training.
        </p>
      </div>

      <div style={box}>
        <strong>Exercise Section</strong>
        <p style={{ marginTop: "6px" }}>
          Use this area for strengthening exercises that support knee
          stability and mobility.
        </p>
      </div>

      <div style={box}>
        <strong>Diet Section</strong>
        <p style={{ marginTop: "6px" }}>
          Nutrition and herbal drinks that may support joint health and
          recovery.
        </p>
      </div>

      <div style={box}>
        <strong>Relaxation Section</strong>
        <p style={{ marginTop: "6px" }}>
          Relaxation techniques help muscles recover after training and reduce
          stress on the knees.
        </p>
      </div>
    </div>
  );
}