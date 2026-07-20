import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          textAlign: "center",
        }}>
          <div style={{ maxWidth: "480px", width: "100%" }}>
            <div style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #fee2e2, #fecaca)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: "36px",
            }}>
              !
            </div>
            <h2 style={{
              fontSize: "24px",
              fontWeight: "800",
              color: "#6b0f0f",
              margin: "0 0 12px",
              fontFamily: "Georgia, serif",
            }}>
              Something went wrong
            </h2>
            <p style={{
              fontSize: "14px",
              color: "#888",
              margin: "0 0 24px",
              lineHeight: 1.7,
            }}>
              An unexpected error occurred. Please try refreshing the page.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              style={{
                padding: "14px 32px",
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(135deg, #6b0f0f, #8b1a1a)",
                color: "#f7c66b",
                fontWeight: "800",
                fontSize: "14px",
                cursor: "pointer",
                letterSpacing: "0.5px",
                boxShadow: "0 8px 24px rgba(107,15,15,0.3)",
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
