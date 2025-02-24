import {
  useCustomerStore,
  useInvoiceStore,
  useProductStore,
} from "../../shared";
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
import { Invoice } from "../interface";

export const HomePage = () => {
  const { customers } = useCustomerStore();
  const { invoices } = useInvoiceStore();
  const { products } = useProductStore();

  const getMonthlySales = (invoices: Invoice[]) => {
    const monthlySales: { [key: string]: number } = {};
    const allMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    allMonths.forEach((month) => {
      monthlySales[month] = 0;
    });

    invoices.forEach((invoice) => {
      if (invoice.createdAt) {
        const date = new Date(invoice.createdAt);

        if (!isNaN(date.getTime())) {
          const month = date.toLocaleString("en-US", { month: "short" });

          if (allMonths.includes(month)) {
            monthlySales[month] += 1;
          }
        }
      }
    });
    const monthlySalesArray = allMonths.map((month) => ({
      month,
      sales: monthlySales[month],
    }));

    return monthlySalesArray;
  };

  const getLast10Invoices = (invoices: Invoice[]) => {
    const invoicesCopy = [...invoices];
    return invoicesCopy
      .sort((a, b) => {
        const dateA = new Date(a.createdAt ?? 0).getTime();
        const dateB = new Date(b.createdAt ?? 0).getTime();
        return dateB - dateA;
      })
      .slice(0, 10);
  };

  const getTop10MostSoldProducts = (invoices: Invoice[]) => {
    const productSales: Record<string, number> = {};
    invoices.forEach((invoice) => {
      invoice.invoiceDetails.forEach((detail) => {
        if (productSales[detail.productId ?? ""]) {
          productSales[detail.productId ?? ""] += detail.quantity;
        } else {
          productSales[detail.productId ?? ""] = detail.quantity;
        }
      });
    });
    const productSalesArray = Object.entries(productSales)
      .map(([productId, totalSales]) => ({ productId, totalSales }))
      .sort((a, b) => b.totalSales - a.totalSales);
    return productSalesArray.slice(0, 10);
  };

  const monthlySales = getMonthlySales(invoices);
  const last10Invoices = getLast10Invoices(invoices);
  const top10Products = getTop10MostSoldProducts(invoices);

  return (
    <Box sx={{ bgcolor: "secondary.main", padding: 5 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard de Ventas 2025
      </Typography>

      <Paper sx={{ padding: 2, marginBottom: 3 }}>
        <Typography variant="h6" gutterBottom>
          Ventas Mensuales
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlySales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Últimas Ventas
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Factura N</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Fecha</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {last10Invoices.map((invoice, index) => (
                    <TableRow key={index}>
                      <TableCell>{invoice.number}</TableCell>
                      <TableCell>{`${
                        customers.find(
                          (customer) => customer.id == invoice.customerId
                        )?.name || "cliente"
                      } ${
                        customers.find(
                          (customer) => customer.id == invoice.customerId
                        )?.lastName || ""
                      }`}</TableCell>
                      <TableCell>
                        {new Date(invoice.createdAt!).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{invoice.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

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
                  {top10Products.map((TopProduct, index) => (
                    <TableRow key={index}>
                      <TableCell>{`${
                        products.find(
                          (product) => product.id == TopProduct.productId
                        )?.name || "Product"
                      }`}</TableCell>
                      <TableCell>{TopProduct.totalSales}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
