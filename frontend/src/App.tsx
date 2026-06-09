import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import { WeddingProvider } from "./context/Wedding/wedding.provider";
import { AdminProvider } from "./context/Admin/admin.provider";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";

import HomePage from "./pages/HomePage";
import StoryPage from "./pages/StoryPage";
import GiftsPage from "./pages/GiftsPage";
import ConfirmPresencePage from "./pages/ConfirmPresencePage";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/admin/LoginPage";
import GiftsCrudPage from "./pages/admin/GiftsCrudPage";
import GuestsPage from "./pages/admin/GuestsPage";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AdminProvider>
          <WeddingProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/nossa-historia" element={<StoryPage />} />
              <Route path="/presentes" element={<GiftsPage />} />
              <Route path="/confirmar-presenca" element={<ConfirmPresencePage />} />

              {/* Admin routes */}
              <Route path="/admin/login" element={<LoginPage />} />
              <Route
                path="/admin/presentes"
                element={
                  <ProtectedRoute>
                    <GiftsCrudPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/convidados"
                element={
                  <ProtectedRoute>
                    <GuestsPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </WeddingProvider>
        </AdminProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
