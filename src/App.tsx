
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import SalesPage from "./pages/SalesPage";
import CustomersPage from "./pages/CustomersPage";
import InventoryPage from "./pages/InventoryPage";
import InvoicesPage from "./pages/InvoicesPage";
import AlertsPage from "./pages/AlertsPage";
import UsersPage from "./pages/UsersPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
