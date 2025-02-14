import { Navigate, Route, Routes } from "react-router-dom";
import {
  ConfigurationPage,
  CustomersPage,
  HomePage,
  InvoicesPage,
  ProductsPage,
  SellersPage,
} from "../pages";
import { ProjectLayout } from "../layout";
export const ProjectRouter = () => {
  return (
    <ProjectLayout>
      <div className="container">
        <Routes>
          <Route path="home" element={<HomePage />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/*" element={<Navigate to="/home" />} />
          <Route path="configuration" element={<ConfigurationPage />} />
          <Route path="clientes" element={<CustomersPage />} />
          <Route path="vendedores" element={<SellersPage />} />
          <Route path="productos" element={<ProductsPage />} />
          <Route path="facturas" element={<InvoicesPage />} />
        </Routes>
      </div>
    </ProjectLayout>
  );
};
