import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "~/components/ProtectedRoute";
import WorkspaceLayout from "~/layouts/WorkspaceLayout";
import CollectionPage from "~/pages/Collection";
import GenerationPage from "~/pages/Generation";
import HomePage from "~/pages/Home";
import LoginPage from "~/pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/workspace"
        element={
          <ProtectedRoute>
            <WorkspaceLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/workspace/collection" replace />} />
        <Route path="collection" element={<CollectionPage />} />
        <Route path="generation" element={<GenerationPage />} />
      </Route>
    </Routes>
  );
}

export default App;
