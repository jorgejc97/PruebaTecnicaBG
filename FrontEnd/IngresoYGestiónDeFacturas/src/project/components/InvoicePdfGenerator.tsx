import { Invoice } from "../interface";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { factura } from "../interface/InvoiceInterface";
import {
  useAuthStore,
  useCustomerStore,
  useProductStore,
  useSellerStore,
} from "../../shared";

export const InvoicePdfGenerator = () => {
  const {
    jwtInfo: { userInfo },
  } = useAuthStore();
  const { customers } = useCustomerStore();
  const { products } = useProductStore();
  const { sellers } = useSellerStore();

  const invoice: Invoice = factura;

  const generatePDF = () => {
    const doc = new jsPDF();

    const img = "/logo.png";
    doc.addImage(img, "PNG", 15, 10, 35, 35);

    doc.setFont("helvetica", "bold").setFontSize(14);
    doc.text("INVOICE SYSTEM", 83, 15);

    doc.setFontSize(10);
    doc.text(
      `${userInfo.address}, ${userInfo.city}, ${userInfo.regionProvince}`,
      80,
      19
    );
    doc.setFontSize(10);
    doc.text(`Teléfono: ${userInfo.phoneNumber}`, 83.5, 23);
    doc.setFontSize(10);
    doc.text(`Email: ${userInfo.email}`, 83.5, 27);

    doc.setFontSize(15);
    doc.text(`Factura N° ${invoice.number}`, 156, 15);

    autoTable(doc, {
      startY: 50,
      head: [["FACTURAR A"]],
      body: [
        [
          `Identificación: ${
            customers.find((customer) => customer.id === invoice.customerId)
              ?.identification || ""
          }`,
        ],
        [
          `${
            customers.find((customer) => customer.id === invoice.customerId)
              ?.name || ""
          } ${
            customers.find((customer) => customer.id === invoice.customerId)
              ?.lastName || ""
          }`,
        ],
        [
          `Teléfono: ${
            customers.find((customer) => customer.id === invoice.customerId)
              ?.phone || ""
          }`,
        ],
        [
          customers.find((customer) => customer.id === invoice.customerId)
            ?.email || "",
        ],
        [
          customers.find((customer) => customer.id === invoice.customerId)
            ?.address || "",
        ],
      ],
      columnStyles: {
        0: { cellWidth: 90 },
      },
      styles: {
        cellPadding: 1,
        fontSize: 10,
      },
    });

    autoTable(doc, {
      startY: 100,
      head: [["VENDEDOR", "FECHA", "Metodo de Pago"]],
      body: [
        [
          `${
            sellers.find((seller) => seller.id === invoice.sellerId)?.name || ""
          } ${
            sellers.find((seller) => seller.id === invoice.sellerId)
              ?.lastName || ""
          }`,
          new Date().toLocaleDateString(),
          invoice.paymentMethod,
        ],
      ],
    });

    // **Usar autoTable para generar la tabla**
    autoTable(doc, {
      startY: 130,
      head: [["Code, Descripción", "Cantidad", "Precio Unitario", "Total"]],
      body: invoice.invoiceDetail.map((detail) => [
        products.find((product) => product.id === detail.productId)?.code || "",
        products.find((product) => product.id === detail.productId)?.name || "",
        detail.quantity,
        detail.unitPrice,
        detail.total,
      ]),
    });

    const finalY = (doc as any).lastAutoTable.finalY || 110;
    /* doc.setFontSize(12);
    doc.text(`SubTotal $${invoice.total}`, 155, finalY + 10);
    doc.text(`IVA (${userInfo.iva})$${invoice.total}`, 155, finalY + 16);
    doc.text(`Total $${invoice.total}`, 155, finalY + 22); */
    autoTable(doc, {
      startY: finalY + 1,
      head: [["", ""]],
      body: [
        ["SubTotal $ ", invoice.subTotal],
        [`IVA (${userInfo.iva}) $ `, invoice.iva],
        ["Total $ ", invoice.total],
      ],
      columnStyles: {
        0: { cellWidth: 25 },
      },
      theme: "plain",
      styles: {
        cellPadding: 0.5,
        fontSize: 12,
        halign: "right",
      },
      margin: { left: 150 },
    });

    doc.text("Gracias por su compra!", 80, finalY + 30);

    return doc;
  };

  // Función para ver el PDF en una nueva ventana
  const viewPDF = () => {
    const doc = generatePDF();
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank"); // Abrir el PDF en una nueva pestaña
  };

  // Función para descargar el PDF
  const downloadPDF = () => {
    const doc = generatePDF();
    doc.save("factura.pdf"); // Descargar el archivo PDF
  };

  return { viewPDF, downloadPDF };
};
