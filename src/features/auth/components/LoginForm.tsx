"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { NoteIcon } from "@/components/common/icons/NoteIcon";
import { GoogleIcon } from "@/components/common/icons/GoogleIcon";

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const errorType = params.get("error");

      if (errorType) {
        switch (errorType) {
          case "OAuthSignin":
            setErrorMessage("Could not initialize Google sign-in. Please check your server-side Google provider configuration.");
            break;
          case "OAuthCallback":
            setErrorMessage("An error occurred during the Google callback. Please verify your Authorized Redirect URIs.");
            break;
          case "OAuthCreateAccount":
            setErrorMessage("Failed to create user account. Please check your database connection.");
            break;
          case "EmailSignin":
            setErrorMessage("Failed to send the email verification link.");
            break;
          case "CredentialsSignin":
            setErrorMessage("Sign-in failed. Please check your credentials and try again.");
            break;
          default:
            setErrorMessage("An unexpected authentication error occurred. Please try again.");
            break;
        }
      }
    }
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    }}>
      <div style={{
        background: "var(--surface)",
        border: "0.5px solid var(--border-card)",
        borderRadius: "20px",
        padding: "2.75rem 2rem 2rem",
        width: "100%",
        maxWidth: "340px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>

        {/* Icon */}
        <div style={{
          width: "56px",
          height: "56px",
          borderRadius: "14px",
          background: "var(--ghost-hover)",
          border: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1.25rem",
        }}>
          <NoteIcon
            width={30}
            height={30}
            stroke="var(--primary)"
          />
        </div>

        {/* Brand */}
        <p style={{
          fontSize: "17px",
          fontWeight: 500,
          color: "var(--text-primary)",
          marginBottom: "0.35rem",
        }}>
          DashNote
        </p>
        <p style={{
          fontSize: "13px",
          color: "var(--text-secondary)",
          marginBottom: "1.75rem",
          textAlign: "center",
        }}>
          Your notes, always within reach.
        </p>

        {/* Error */}
        {errorMessage && (
          <div style={{
            width: "100%",
            background: "#FEF2F2",
            border: "0.5px solid #FECACA",
            borderRadius: "var(--radius)",
            padding: "9px 12px",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "7px",
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "1px" }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span style={{ fontSize: "12px", color: "#991B1B", lineHeight: 1.5 }}>
              {errorMessage}
            </span>
          </div>
        )}

        {/* Google sign-in button */}
        <button
          onClick={handleSignIn}
          disabled={loading}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "9px",
            padding: "10px 16px",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            background: "var(--surface)",
            color: loading ? "var(--text-muted)" : "var(--text-primary)",
            fontSize: "14px",
            fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
            transition: "var(--transition)",
          }}
          onMouseEnter={e => {
            if (!loading) {
              (e.currentTarget as HTMLButtonElement).style.background = "var(--ghost-hover)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--secondary-hover)";
            }
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--surface)";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
          }}
          onMouseDown={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--secondary)";
          }}
          onMouseUp={e => {
            (e.currentTarget as HTMLButtonElement).style.background = "var(--ghost-hover)";
          }}
        >
          {loading ? (
            <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>Signing in…</span>
          ) : (
            <>
              <GoogleIcon width={15} height={15} />
              Continue with Google
            </>
          )}
        </button>

        {/* Footer note */}
        <p style={{
          marginTop: "1.5rem",
          fontSize: "12px",
          color: "var(--text-muted)",
          textAlign: "center",
          lineHeight: 1.6,
        }}>
          Only approved accounts can access DashNote.
        </p>
      </div>
    </div>
  );
}
