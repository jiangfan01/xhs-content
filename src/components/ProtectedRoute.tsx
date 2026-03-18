import { Navigate } from "react-router-dom";
import { useAuth } from "~/contexts/useAuth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-default)" }}
      >
        <div
          className="w-8 h-8 border-[3px] rounded-full animate-spin"
          style={{
            borderColor: "var(--border-light)",
            borderTopColor: "var(--brand-primary-solid)",
          }}
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
