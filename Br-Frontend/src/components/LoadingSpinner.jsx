export default function LoadingSpinner({ size = 40, color = "#6b0f0f" }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 20px",
    }}>
      <style>{`
        @keyframes royalSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes royalPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `}</style>
      <div style={{ textAlign: "center" }}>
        <div style={{
          width: size,
          height: size,
          border: `4px solid rgba(107,15,15,0.15)`,
          borderTop: `4px solid ${color}`,
          borderRadius: "50%",
          animation: "royalSpin 0.8s linear infinite",
          margin: "0 auto 16px",
        }} />
        <p style={{
          fontSize: "13px",
          color: "#999",
          fontWeight: 600,
          letterSpacing: "1px",
          animation: "royalPulse 1.5s ease-in-out infinite",
        }}>
          Loading...
        </p>
      </div>
    </div>
  );
}
