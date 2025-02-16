import { useEffect } from "react";
import {
  useLazyGetCustomersQuery,
  useLazyGetInvoicesQuery,
  useLazyGetProductsQuery,
  useLazyGetSellersQuery,
} from "../../services";
import {
  useCustomerStore,
  useInvoiceStore,
  useProductStore,
  useSellerStore,
} from "../../shared";
import { BasePage } from "../template";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Datos ficticios de ejemplo
const salesData = [
  { month: "Jan", sales: 120 },
  { month: "Feb", sales: 150 },
  { month: "Mar", sales: 170 },
  { month: "Apr", sales: 140 },
  { month: "May", sales: 160 },
  { month: "Jun", sales: 180 },
  { month: "Jul", sales: 130 },
  { month: "Aug", sales: 190 },
  { month: "Sep", sales: 220 },
  { month: "Oct", sales: 210 },
  { month: "Nov", sales: 230 },
  { month: "Dec", sales: 250 },
];

const latestSales = [
  {
    invoiceNumber: "INV001",
    customer: "Customer A",
    date: "2025-02-01",
    total: 150.0,
  },
  {
    invoiceNumber: "INV002",
    customer: "Customer B",
    date: "2025-02-02",
    total: 200.0,
  },
  {
    invoiceNumber: "INV003",
    customer: "Customer C",
    date: "2025-02-03",
    total: 180.0,
  },
  {
    invoiceNumber: "INV004",
    customer: "Customer D",
    date: "2025-02-04",
    total: 210.0,
  },
  // Agrega más ventas recientes aquí
];

const topProducts = [
  { product: "Product A", sales: 300 },
  { product: "Product B", sales: 250 },
  { product: "Product C", sales: 200 },
  { product: "Product D", sales: 150 },
  // Agrega más productos aquí
];

export const HomePage = () => {
  const [fetchGetInvoices] = useLazyGetInvoicesQuery();
  const [fetchGetSellers] = useLazyGetSellersQuery();
  const [fetchGetProducts] = useLazyGetProductsQuery();
  const [fetchGetCustomers] = useLazyGetCustomersQuery();
  const { onSetCustomers } = useCustomerStore();
  const { onSetInvoices } = useInvoiceStore();
  const { onSetProducts } = useProductStore();
  const { onSetSellers } = useSellerStore();

  useEffect(() => {
    Promise.all([
      fetchGetCustomers().unwrap().then(onSetCustomers),
      fetchGetSellers().unwrap().then(onSetSellers),
      fetchGetProducts().unwrap().then(onSetProducts),
      fetchGetInvoices().unwrap().then(onSetInvoices),
    ]);
  }, []);

  return (
    <BasePage>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard de Ventas 2025
        </Typography>

        {/* Gráfico de Ventas */}
        <Paper sx={{ padding: 2, marginBottom: 3 }}>
          <Typography variant="h6" gutterBottom>
            Ventas Mensuales
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>

        {/* Tablas */}
        <Grid container spacing={3}>
          {/* Últimas Ventas */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Últimas Ventas
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Número Factura</TableCell>
                      <TableCell>Cliente</TableCell>
                      <TableCell>Fecha</TableCell>
                      <TableCell>Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {latestSales.map((sale, index) => (
                      <TableRow key={index}>
                        <TableCell>{sale.invoiceNumber}</TableCell>
                        <TableCell>{sale.customer}</TableCell>
                        <TableCell>{sale.date}</TableCell>
                        <TableCell>{sale.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>

          {/* Productos Más Vendidos */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ padding: 2 }}>
              <Typography variant="h6" gutterBottom>
                Productos Más Vendidos
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Producto</TableCell>
                      <TableCell>N° de Ventas</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topProducts.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>{product.product}</TableCell>
                        <TableCell>{product.sales}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </BasePage>
  );
};
