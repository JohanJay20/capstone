import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout/layout";
import Dashboard from "./pages/Dashboard";
import CameraStream from "./pages/CameraStream";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Welcomepage from "./pages/WelcomePage";
import ProtectedRoute from "../src/components/ProtectedRoute"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/welcomepage" />} />
        <Route path="/welcomepage" element={<Welcomepage />} />
       <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cameraStream" element={<CameraStream />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;